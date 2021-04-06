/**
 * @file Client
 * TODO
 */
import { readFile } from 'fs';
import OpenAPIClient from 'openapi-client-axios';
import { join } from 'path';
import { promisify } from 'util';
import { Client } from '../schema/openapi';
export { Components } from '../schema/openapi';

export type ProjectsApiClient = Client;

export type Credentials = BearerCredentials | BasicCredentials;

export type CredentialType = 'Bearer' | 'Basic' | string;

export interface CredentialsBase {
  type: CredentialType;
}

export interface BearerCredentials extends CredentialsBase {
  type: 'Bearer';
  access_token: string;
}

export interface BasicCredentials extends CredentialsBase {
  type: 'Basic';
  username: string;
  password: string;
}

const readFilePromise = promisify(readFile);

const packageJsonPath = join(__dirname, '../package.json');
const openapiJsonPath = join(__dirname, '../schema/openapi.json');

export interface ApiClientSettings {
  /**
   * OPTIONAL URL to the API base including the version, default to
   * "https://projects.api.abitray.com/v1"
   */
  server?: { url: string; description?: string };
  /**
   * OPTIONAL An identifier of the service using the client. It is added to the
   * user-agent header.
   */
  identifier?: string;
  credentials?: Credentials;
}

export async function createClient(options?: ApiClientSettings): Promise<ProjectsApiClient> {
  const { server, identifier, credentials } = options ?? {};
  // load package.json file and get library version
  const packageJsonContent = await readFilePromise(packageJsonPath);
  const { name, version } = JSON.parse(packageJsonContent.toString('utf8'));
  // load openapi.json and get contents
  const openapiJsonContent = await readFilePromise(openapiJsonPath);
  const schema = JSON.parse(openapiJsonContent.toString('utf8'));
  const api = new OpenAPIClient({ definition: schema, withServer: server ?? 'live' });
  const client = await api.getClient<ProjectsApiClient>();
  client.defaults.headers = {
    'user-agent': `${name}:${version}${!!identifier ? `;${identifier}` : ''}`,
    ...(credentials !== undefined && { ...createAuthHeader(credentials) }),
  };
  return client;
}

export function createAuthHeader(credentials: Credentials): { authorization: string } {
  const { type } = credentials;
  switch (type) {
    case 'Basic':
      const { username, password } = <BasicCredentials>credentials;
      const encoded = Buffer.from(`${username}:${password}`).toString('base64');
      return { authorization: `${credentials.type} ${encoded}` };
    case 'Bearer':
      const { access_token } = <BearerCredentials>credentials;
      return { authorization: `${credentials.type} ${access_token}` };
    default:
      throw new Error(`Unrecognised credential type "${type}".`);
  }
}

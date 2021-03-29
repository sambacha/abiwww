# API ProjectId Management

## `/v1`

```
// TODO
```

### `/oembed`

```
// TODO
```

### projectsRouter

`src/api/routers/projectsRouter`

```ts
/**
@GET
@returns {200}
@paths /projects/:id
@operationId {getProject}
*/

/**
@GET
@returns {200}
@param /user/projects
@execute getUserProjects
*/
```

## `/projects/:id/_claim`

## `/projects/:id`

```ts
/**
@POST
@returns {201}
@param /projects
@execute createProject
*/
```

```ts
/**
@PUT
@returns {201}
@param /projects/:id
*/
```

```ts
/**
* @execute updateProject
*/
export updateProject execute
// updateProject.execute(
req.params.id,
req.body.name,
req.body.description,
req.body.files,
userId,
anonymousToken,
```

```ts
/**
@DELETE
@param /projects/:id
*/
```

### Create ProjectId

> Infura-like `projectId`

```ts
export Interface createProject
req.body.name,
req.body.description,
req.body.files,
userId,
anonymousToken,
```

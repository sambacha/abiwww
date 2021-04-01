/** 
TODO
Abstract `projects` into Accounts 

import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

type AccountType = IAccountsModel & mongoose.Document;
*/
// _id: ObjectId;
/**
export interface IAccountsModel {
    firstname:{
        type: string,
        required: true
    }
    lastname:{
        type: string,
        required: true
    }
    mobile: {
        type: number
    }
    age: {
        type: number,
    }
    pincode: {
        type: number
    }
};
const Accounts = new mongoose.Schema({
   firstname:{
        type: string,
        required: true
    },
    lastname:{
        type: string,
        required: true
    },
    mobile: {
        type: number
    },
    age: {
        type: number,
    },
    pincode: {
        type: number
    },
});
const Accounts: Model<AccountType> = mongoose.model<AccountType>('Accounts', AccountSchema,'Accounts');
export default Accounts;
*/

import * as mongoose from 'mongoose';
export const usersSchema = new mongoose.Schema({
    email: String,
    hash: String,

    firstName: String,
    lastName: String,
});
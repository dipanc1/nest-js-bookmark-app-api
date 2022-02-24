import * as mongoose from 'mongoose';
export const bookmarksSchema = new mongoose.Schema({
    title: String,
    description: String,

    link: String
});
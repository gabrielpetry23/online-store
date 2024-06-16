import mongoose from 'mongoose';
import {Schema, models, model} from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parent: {type:mongoose.Types.ObjectId, ref:'Category'},
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
import mongoose from 'mongoose';
import {Schema, models, model} from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true},
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
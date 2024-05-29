import mongoose from 'mongoose';
import {Schema, models, model} from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
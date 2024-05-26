import mongoose from 'mongoose';
import {Schema} from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
});

export const Product = mongoose.model('Product', ProductSchema);
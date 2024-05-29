import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export default async function handle(req,res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

    if (method === 'POST') {
        const {name} = req.body;
        const categoryJson = await Category.create({
            name, 
            parent:parentCategory,
        });
        res.json(categoryJson);
    }
}
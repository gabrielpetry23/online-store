import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    if (method === 'POST') {
        const {title,description,price} = req.body;
        const productJson = await Product.create({
            title,description,price,
        });
        res.status(201).json(productJson);
        res.json(productJson);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
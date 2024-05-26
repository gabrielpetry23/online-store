import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(request, response) {
    const {method} = request;
    await mongooseConnect();
    if (method === 'POST') {
        const {title,description,price} = request.body;
        const productJson = await Product.create({
            title,description,price,
        })
        response.json(productJson);
    }
}
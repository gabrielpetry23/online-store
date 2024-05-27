import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id:req.query.id}));
        } else {
            res.json(await Product.find());
            res.status(200).json(products);
        }
    }

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
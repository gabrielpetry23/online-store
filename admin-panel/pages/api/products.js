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
        }
    } else if (method === 'POST') {
        const {title,description,price} = req.body;
        const productJson = await Product.create({
            title,description,price,
        });
        res.json(productJson);
    } else if (method === 'PUT') {
        const {title,description,price, _id} = req.body;
        await Product.updateOne({_id: _id}, {title:title,description:description,price:price});
        res.json(true);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
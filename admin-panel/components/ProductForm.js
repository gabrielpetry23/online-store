import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function createProduct(e) {
        e.preventDefault();

        if (_id) {
            //update
        } else {
            //create
        }

        const data = {title,description,price};
        await axios.post('/api/products', data);
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products');
    }

    return (
            <form onSubmit={createProduct}>
                <label>Product name</label>
                <input
                    type="text" 
                    placeholder="p name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>

                <label>Description</label>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>

                <label>Price</label>
                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                ></input>
                <button type="submit" className="btn-add">Add</button>
            </form>
    );
}
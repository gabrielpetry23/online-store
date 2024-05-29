import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [images, setImages] = useState(existingImages || []);
    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();
        const data = {title,description,price,images};

        if (_id) {
            //Update
            await axios.put('/api/products', {...data, _id});

        } else {
            //Create
            await axios.post('/api/products', data);
        }
        
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products');
    }

    async function uploadImg(e) {
        const files = e.target?.files;
        if (files.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
        }
    }

    return (
            <form onSubmit={saveProduct}>
                <label>Product name</label>
                <input
                    type="text" 
                    placeholder="p name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>

                <label>
                    Photos
                </label>
                <div className='mb-2 flex flex-wrap gap-2'>
                    {!!images?.length && images.map(link => (
                        <div key={link} className='inline-block h-24'>
                            <img src={link} alt="" className='rounded-lg' />
                        </div>
                    ))}
                    <label className='inline-block w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload
                        </div>
                        <input type="file" onChange={uploadImg} className='hidden'/>
                    </label>
                    {!images?.length && (
                        <div>This product dont have photos</div>
                    )}
                </div>

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
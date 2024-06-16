import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoadSpinner from './LoadSpinner';
import { ReactSortable } from 'react-sortablejs';

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
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }, []);

    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, description, price, images };

        if (_id) {
            // Atualizar
            await axios.put('/api/products', { ...data, _id });
        } else {
            // Criar
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
            setIsUploading(true);
            const data = new FormData();

            for (const file of files) {
                data.append('file', file);
            }

            try {
                const res = await axios.post('/api/upload', data);
                setImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });
            } catch (error) {
                console.error("Upload image failed!", error);
            } finally {
                setIsUploading(false);
            }
        }
    }

    function imagesOrder(images) {
        setImages(images);
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input
                type="text" 
                placeholder="product name"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <label>Category</label>
            <select>
                <option value="">No category</option>
                {categories.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </select>

            <label>Photos</label>
            <div className='mb-2 flex flex-wrap gap-2'>
                <ReactSortable
                    list={images}
                    className='flex flex-wrap gap-2'
                    setList={imagesOrder}>
                    {!!images?.length && images.map(link => (
                        <div key={link} className='h-24'>
                            <img src={link} alt="" className='rounded-lg' />
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className='h-24 flex items-center'>
                        <LoadSpinner />
                    </div>
                )}
                <label className='w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>Upload</div>
                    <input type="file" onChange={uploadImg} className='hidden' />
                </label>
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
            />
            <button type="submit" className="btn-save">Salvar</button>
        </form>
    );
}

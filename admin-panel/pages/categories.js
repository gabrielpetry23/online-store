import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";

export default function Categories() {
const [name, setName] = useState('');

    async function saveCategory(e) {
        e.preventDefault();
        await axios.post('/api/categories', {name});
        setName('');
    }
    return (
        <Layout>
            <h1>Categories </h1>
            <label>New Category Name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder={'Category name'}
                    onChange={e => setName(e.target.value)}
                    value={name}/>
                <button
                    type="submit" className="btn-save py-1">
                    Save
                </button>
            </form>
        </Layout>
    );
}
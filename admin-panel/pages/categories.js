import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    async function saveCategory(e) {
        e.preventDefault();
        const data = { name, parentCategory: parentCategory || null };

        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }

        setName('');
        setParentCategory('');
        fetchCategories();
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id || '');
    }

    function deleteCategory(category) {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            reverseButtons: true,
            confirmButtonColor: '#d55',
        }).then(async result => {
            if (result.isConfirmed) {
                await axios.delete(`/api/categories?_id=${category._id}`);
                fetchCategories();
            }
        }).catch(error => {
            console.error("Failed to delete category:", error);
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>
                {editedCategory
                    ? `Edit category ${editedCategory.name}`
                    : 'Create new category'}
            </label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder={'Category name'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <select
                    className="mb-0"
                    onChange={e => setParentCategory(e.target.value)}
                    value={parentCategory}
                >
                    <option value="">No parent category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button
                    type="submit" className="btn-save py-1">
                    Save
                </button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button
                                    onClick={() => editCategory(category)}
                                    className="btn-save mr-1">
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCategory(category)}
                                    className="btn-save">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
));

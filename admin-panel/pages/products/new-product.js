import Layout from "@/components/Layout";

export default function NewProduct() {
    const {title, setTitle} = useState('');
    const {description, setDescription} = useState('');
    const {price, setPrice} = useState('');
    function createProduct() {
        
    }
    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>
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
        </Layout>
    );
}
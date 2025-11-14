import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import CreateProductForm from './CreateProductForm';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/v1/products');

            if (data.success) {
                setProducts(data.allProducts);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreateSuccess = () => {
        setIsModalOpen(false);
        fetchProducts();
    };

    // When user clicks the red "Delete" button in the table
    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    // When user closes the delete modal (clicks Cancel or X)
    const closeDeleteModal = () => {
        setProductToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;
        setDeleteLoading(true);
        try {
            await axios.delete(`/api/v1/products/${productToDelete._id}`);
            closeDeleteModal();
            fetchProducts();

        } catch (err) {
            // Handle delete error (optional: show error in modal)
            console.error('Failed to delete product', err);
            alert('Failed to delete product. Please try again.'); // Simple alert for now
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );
    }
    console.log('produvts', products);


    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Products ({products.length})</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create New
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    {products.length === 0 ? (
                        <p className="p-6 text-center text-gray-500">No products found.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{product.category}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Rs. {product.price}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">Edit</button>
                                            <button
                                                onClick={() => openDeleteModal(product)}
                                                className="text-red-600 hover:text-red-900 cursor-pointer"
                                            >
                                                Delete
                                            </button>                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Product"
            >
                <CreateProductForm
                    onSuccess={handleCreateSuccess}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                title="Confirm Deletion"
            >
                <div>
                    <p className="text-gray-700">
                        Are you sure you want to delete the product: <br />
                        <strong className="font-semibold">{productToDelete?.name}</strong>?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={closeDeleteModal}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={deleteLoading}
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                        >
                            {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProductListPage;
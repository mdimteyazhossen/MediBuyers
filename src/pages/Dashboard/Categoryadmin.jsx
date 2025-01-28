import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categoryadmin = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allcategory');
      setCategories(response.data);
    } catch (error) {
      setToastMessage({ type: 'error', message: 'Failed to fetch categories' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or Edit category
  const handleSaveCategory = async () => {
    const categoryData = { category: categoryName, image: categoryImage };  // Match backend field names

    try {
      if (editCategory) {
        // Update existing category
        await axios.put(`http://localhost:5000/allcategory/${editCategory._id}`, categoryData);
        setToastMessage({ type: 'success', message: 'Category updated successfully!' });
      } else {
        // Add new category
        await axios.post('http://localhost:5000/allcategory', categoryData);
        setToastMessage({ type: 'success', message: 'Category added successfully!' });
      }
      setShowModal(false);
      setCategoryName('');
      setCategoryImage('');
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      setToastMessage({ type: 'error', message: 'Failed to save category' });
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/allcategory/${id}`);
        setToastMessage({ type: 'success', message: 'Category deleted successfully!' });
        fetchCategories();
      } catch (error) {
        setToastMessage({ type: 'error', message: 'Failed to delete category' });
      }
    }
  };

  // Open modal for add/edit category
  const openModal = (category = null) => {
    if (category) {
      setCategoryName(category.category);
      setCategoryImage(category.image);
      setEditCategory(category);
    } else {
      setCategoryName('');
      setCategoryImage('');
      setEditCategory(null);
    }
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      {/* Button to trigger modal */}
      <button
        onClick={() => openModal()}
        className="btn bg-gray-600 text-white mb-4"
      >
        Add Category
      </button>

      {/* Toast notification */}
      {toastMessage && (
        <div
          className={`toast ${toastMessage.type === 'success' ? 'toast-success' : 'toast-error'}`}
        >
          <div>{toastMessage.message}</div>
        </div>
      )}

      {/* Categories table */}
      <table className="table table-bordered w-full">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.category}</td>
              <td>
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td>
                <button
                  onClick={() => openModal(category)}
                  className="btn bg-gray-600 text-white mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="btn bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Category */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-semibold mb-4">{editCategory ? 'Edit Category' : 'Add Category'}</h2>
            <div className="mb-4">
              <label className="block text-lg mb-2">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Category Image URL</label>
              <input
                type="url"
                value={categoryImage}
                onChange={(e) => setCategoryImage(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="modal-action">
              <button
                onClick={handleSaveCategory}
                className="btn btn-success"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-error"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categoryadmin;

import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxios from '../../hooks/useAxios';
import DetailsModal from '../../component/DetailsModal';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageMedicine = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();
  const [medicines, setMedicines] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [medicine, setMedicine] = useState({
    drugName: '',
    manufacturer: '',
    image: null,
    description: '',
    consumeType: 'Oral',
    expiryDate: '',
    price: '',
    disclaimer: '',
    category: '',
    countInStock: 0,
    discount: 0,
    email: `${user.email}`,
  });
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/allcategory')
      .then(res => res.json())
      .then(data => {
        const categoryNames = data.map(item => item.category);
        setCategory(categoryNames);
      })
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/medicine/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
      })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({
      ...medicine,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    setMedicine((prevState) => ({
      ...prevState,
      image: fileArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!medicine.image || medicine.image.length === 0) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', medicine.image[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      setMedicine({
        ...medicine,
        image: res.data.display_url,
      });
      if (res.data.success) {
        const item = {
          drugName: medicine.drugName,
          manufacturer: medicine.manufacturer,
          image: res.data.data.display_url,
          description: medicine.description,
          consumeType: 'Oral',
          expiryDate: medicine.expiryDate,
          price: medicine.price,
          disclaimer: medicine.disclaimer,
          category: medicine.category,
          countInStock: 0,
          discount: 0,
          email: `${user.email}`,
        }
        const menures = await axiosSecure.post('/medicine', item)
        if (menures.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Medicine added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
        closeModal()
      }

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setMedicine({
      drugName: '',
      manufacturer: '',
      image: null,
      description: '',
      consumeType: 'Oral',
      expiryDate: '',
      price: '',
      disclaimer: '',
      category: '',
      countInStock: 0,
      discount: 0,
      email: `${user.email}`,
    })
    setModalOpen(false)
  };
  const [isModalOpen, stModalOpen] = useState(false);
  const [medicinei, setDetailsData] = useState([]);
  const opeModal = (e) => {
    stModalOpen(true);
    setDetailsData(e);
  }
  const closModal = () => {
    stModalOpen(false);
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Medicines</h2>

      <button onClick={openModal} className="btn btn-primary mb-4">Add Medicine</button>

      {/* Medicines Table */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Discount</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, index) => (
            <tr key={index}>
              <td>{med.drugName}</td>
              <td>{med.category}</td>
              <td>{med.manufacturer}</td>
              <td>{med.price}</td>
              <td>{med.countInStock}</td>
              <td>{med.discount}%</td>
              <td>{med.email}</td>
              <td>
                <button className="btn bg-gray-600 text-white mr-2"
                  onClick={() => opeModal(med)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailsModal isOpen={isModalOpen} closeModal={closModal} medicine={medicinei} />
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-semibold mb-4">Add New Medicine</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="label">Drug Name</label>
                <input
                  type="text"
                  name="drugName"
                  value={medicine.drugName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={medicine.manufacturer}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="label">Side Effects</label>
                <textarea
                  name="sideEffects"
                  value={medicine.sideEffects}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="label">Description</label>
                <textarea
                  name="description"
                  value={medicine.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Consume Type</label>
                <select
                  name="consumeType"
                  value={medicine.consumeType}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Oral">Oral</option>
                  <option value="Injection">Injection</option>
                  <option value="Topical">Topical</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="label">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={medicine.expiryDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={medicine.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={medicine.discount}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="label">Disclaimer</label>
                <textarea
                  name="disclaimer"
                  value={medicine.disclaimer}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="label">Category</label>
                <select
                  name="category"
                  value='Diuretics'
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="label">Count in Stock</label>
                <input
                  type="number"
                  name="countInStock"
                  value={medicine.countInStock}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  defaultValue={user.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                  disabled
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicine;

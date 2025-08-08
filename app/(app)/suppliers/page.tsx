"use client";

import { useState } from 'react';

interface Supplier {
  id: number;
  name: string;
  description: string;
  image: string;
}

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    description: "Leading technology equipment supplier with over 20 years of experience",
    image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Green Energy Co",
    description: "Sustainable energy solutions and renewable technology provider",
    image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Office Supplies Plus",
    description: "Complete office supply chain with nationwide delivery service",
    image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
  }
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const openModal = (supplier?: Supplier) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        description: supplier.description,
        image: supplier.image
      });
    } else {
      setEditingSupplier(null);
      setFormData({ name: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
    setFormData({ name: '', description: '', image: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier => 
        supplier.id === editingSupplier.id 
          ? { ...supplier, ...formData }
          : supplier
      ));
    } else {
      // Add new supplier
      const newSupplier: Supplier = {
        id: Math.max(...suppliers.map(s => s.id), 0) + 1,
        ...formData
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    
    closeModal();
  };

  const deleteSupplier = (id: number) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
            <p className="text-gray-600 mt-1">Manage supplier information and relationships</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Supplier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={supplier.image}
                alt={supplier.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{supplier.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{supplier.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(supplier)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSupplier(supplier.id)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {suppliers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first supplier.</p>
            <button
              onClick={() => openModal()}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Supplier
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter supplier name"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter supplier description"
                  />
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    {editingSupplier ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DokterList = () => {
    const [dokters, setDokters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingDokterId, setEditingDokterId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nama: '',
        spesialis: '',
        no_telepon: '',
        email: ''
    });

    useEffect(() => {
        fetchDokters();
    }, []);

    const fetchDokters = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dokter');
            setDokters(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await axios.delete(`http://localhost:5000/dokter/${id}`);
                setDokters(dokters.filter(dokter => dokter.id !== id)); // Update state locally
            } catch (err) {
                console.error('Error deleting doctor:', err);
                setError(`Error deleting doctor: ${err.message}`);
            }
        }
    };

    const handleEdit = (dokter) => {
        setEditingDokterId(dokter.id);
        setEditFormData({
            nama: dokter.nama,
            spesialis: dokter.spesialis,
            no_telepon: dokter.no_telepon,
            email: dokter.email
        });
    };

    const handleEditFormChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/dokter/${editingDokterId}`, editFormData);
            setDokters(dokters.map(dokter => 
                dokter.id === editingDokterId ? response.data : dokter
            ));
            setEditingDokterId(null);
        } catch (err) {
            console.error('Error updating doctor:', err);
            setError(`Error updating doctor: ${err.message}`);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold leading-tight">Daftar Dokter</h2>
                    <Link to="/dokter/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Dokter
                    </Link>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Spesialis
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        No. Telepon
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dokters.map((dokter) => (
                                    <tr key={dokter.id}>
                                        {editingDokterId === dokter.id ? (
                                            <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <form onSubmit={handleEditSubmit} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        name="nama"
                                                        value={editFormData.nama}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="spesialis"
                                                        value={editFormData.spesialis}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="no_telepon"
                                                        value={editFormData.no_telepon}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editFormData.email}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                                    <button onClick={() => setEditingDokterId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{dokter.nama}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{dokter.spesialis}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{dokter.no_telepon}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{dokter.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <button onClick={() => handleEdit(dokter)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(dokter.id)} className="text-red-600 hover:text-red-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DokterList;

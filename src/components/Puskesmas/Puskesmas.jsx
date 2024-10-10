import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Puskesmas = () => {
    const [puskesmas, setPuskesmas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPuskesmasId, setEditingPuskesmasId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nama: '',
        alamat: '',
        no_telepon: ''
    });

    useEffect(() => {
        fetchPuskesmas();
    }, []);

    const fetchPuskesmas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/puskesmas');
            setPuskesmas(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this puskesmas?')) {
            try {
                await axios.delete(`http://localhost:5000/puskesmas/${id}`);
                setPuskesmas(puskesmas.filter(p => p.id !== id));
            } catch (err) {
                console.error('Error deleting puskesmas:', err);
                setError(`Error deleting puskesmas: ${err.message}`);
            }
        }
    };

    const handleEdit = (puskesmas) => {
        setEditingPuskesmasId(puskesmas.id);
        setEditFormData({
            nama: puskesmas.nama,
            alamat: puskesmas.alamat,
            no_telepon: puskesmas.no_telepon
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
            const response = await axios.put(`http://localhost:5000/puskesmas/${editingPuskesmasId}`, editFormData);
            setPuskesmas(puskesmas.map(p => 
                p.id === editingPuskesmasId ? response.data : p
            ));
            setEditingPuskesmasId(null);
        } catch (err) {
            console.error('Error updating puskesmas:', err);
            setError(`Error updating puskesmas: ${err.message}`);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold leading-tight">Daftar Puskesmas</h2>
                    <Link to="/puskesmas/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Puskesmas
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
                                        Alamat
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        No Telepon
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {puskesmas.map((p) => (
                                    <tr key={p.id}>
                                        {editingPuskesmasId === p.id ? (
                                            <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
                                                        name="alamat"
                                                        value={editFormData.alamat}
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
                                                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                                    <button onClick={() => setEditingPuskesmasId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{p.nama}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{p.alamat}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{p.no_telepon}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900">
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

export default Puskesmas;

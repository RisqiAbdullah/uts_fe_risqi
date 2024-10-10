import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendaftaranList = () => {
    const [pendaftarans, setPendaftarans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPendaftaranId, setEditingPendaftaranId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        tanggal_daftar: '',
        keluhan: '',
        status: ''
    });

    useEffect(() => {
        fetchPendaftarans();
    }, []);

    const fetchPendaftarans = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pendaftaran');
            setPendaftarans(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this registration?')) {
            try {
                await axios.delete(`http://localhost:5000/pendaftaran/${id}`);
                setPendaftarans(pendaftarans.filter(pendaftaran => pendaftaran.id !== id));
            } catch (err) {
                console.error('Error deleting registration:', err);
                setError(`Error deleting registration: ${err.message}`);
            }
        }
    };

    const handleEdit = (pendaftaran) => {
        setEditingPendaftaranId(pendaftaran.id);
        setEditFormData({
            tanggal_daftar: pendaftaran.tanggal_daftar,
            keluhan: pendaftaran.keluhan,
            status: pendaftaran.status
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
            const response = await axios.put(`http://localhost:5000/pendaftaran/${editingPendaftaranId}`, editFormData);
            setPendaftarans(pendaftarans.map(pendaftaran => 
                pendaftaran.id === editingPendaftaranId ? response.data : pendaftaran
            ));
            setEditingPendaftaranId(null);
        } catch (err) {
            console.error('Error updating registration:', err);
            setError(`Error updating registration: ${err.message}`);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold leading-tight">Daftar Pendaftaran</h2>
                    <Link to="/pendaftaran/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Pendaftaran
                    </Link>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tanggal Daftar
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Keluhan
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendaftarans.map((pendaftaran) => (
                                    <tr key={pendaftaran.id}>
                                        {editingPendaftaranId === pendaftaran.id ? (
                                            <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <form onSubmit={handleEditSubmit} className="flex items-center space-x-2">
                                                    <input
                                                        type="date"
                                                        name="tanggal_daftar"
                                                        value={editFormData.tanggal_daftar}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="keluhan"
                                                        value={editFormData.keluhan}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="status"
                                                        value={editFormData.status}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                                    <button onClick={() => setEditingPendaftaranId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pendaftaran.tanggal_daftar}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pendaftaran.keluhan}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pendaftaran.status}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <button onClick={() => handleEdit(pendaftaran)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(pendaftaran.id)} className="text-red-600 hover:text-red-900">
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

export default PendaftaranList;

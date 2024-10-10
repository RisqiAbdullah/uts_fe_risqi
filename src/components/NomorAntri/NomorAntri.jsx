import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NomorAntriList = () => {
    const [nomorAntris, setNomorAntris] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingNomorAntriId, setEditingNomorAntriId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nomor_antri: '',
        tanggal_antri: ''
    });

    useEffect(() => {
        fetchNomorAntris();
    }, []);

    const fetchNomorAntris = async () => {
        try {
            const response = await axios.get('http://localhost:5000/antri');
            setNomorAntris(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this queue number?')) {
            try {
                await axios.delete(`http://localhost:5000/antri/${id}`);
                setNomorAntris(nomorAntris.filter(nomorAntri => nomorAntri.id !== id));
            } catch (err) {
                console.error('Error deleting queue number:', err);
                setError(`Error deleting queue number: ${err.message}`);
            }
        }
    };

    const handleEdit = (nomorAntri) => {
        setEditingNomorAntriId(nomorAntri.id);
        setEditFormData({
            nomor_antri: nomorAntri.nomor_antri,
            tanggal_antri: nomorAntri.tanggal_antri
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
            const response = await axios.put(`http://localhost:5000/antri/${editingNomorAntriId}`, editFormData);
            setNomorAntris(nomorAntris.map(nomorAntri => 
                nomorAntri.id === editingNomorAntriId ? response.data : nomorAntri
            ));
            setEditingNomorAntriId(null);
        } catch (err) {
            console.error('Error updating queue number:', err);
            setError(`Error updating queue number: ${err.message}`);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold leading-tight">Daftar Nomor Antri</h2>
                    <Link to="/nomor-antri/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Nomor Antri
                    </Link>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Nomor Antri
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tanggal Antri
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {nomorAntris.map((nomorAntri) => (
                                    <tr key={nomorAntri.id}>
                                        {editingNomorAntriId === nomorAntri.id ? (
                                            <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <form onSubmit={handleEditSubmit} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        name="nomor_antri"
                                                        value={editFormData.nomor_antri}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="date"
                                                        name="tanggal_antri"
                                                        value={editFormData.tanggal_antri}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                                    <button onClick={() => setEditingNomorAntriId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{nomorAntri.nomor_antri}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{nomorAntri.tanggal_antri}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <button onClick={() => handleEdit(nomorAntri)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(nomorAntri.id)} className="text-red-600 hover:text-red-900">
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

export default NomorAntriList;

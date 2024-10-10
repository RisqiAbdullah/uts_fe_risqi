import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasienList = () => {
    const [pasiens, setPasiens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPasienId, setEditingPasienId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nama: '',
        tanggal_lahir: '',
        alamat: '',
        no_telepon: '',
        jenis_kelamin: '',
        email: ''
    });

    useEffect(() => {
        fetchPasiens();
    }, []);

    const fetchPasiens = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pasien');
            setPasiens(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(`http://localhost:5000/pasien/${id}`);
                setPasiens(pasiens.filter(pasien => pasien.id !== id));
            } catch (err) {
                console.error('Error deleting patient:', err);
                setError(`Error deleting patient: ${err.message}`);
            }
        }
    };

    const handleEdit = (pasien) => {
        setEditingPasienId(pasien.id);
        setEditFormData({
            nama: pasien.nama,
            tanggal_lahir: pasien.tanggal_lahir,
            alamat: pasien.alamat,
            no_telepon: pasien.no_telepon,
            jenis_kelamin: pasien.jenis_kelamin,
            email: pasien.email
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
            const response = await axios.put(`http://localhost:5000/pasien/${editingPasienId}`, editFormData);
            setPasiens(pasiens.map(pasien => 
                pasien.id === editingPasienId ? response.data : pasien
            ));
            setEditingPasienId(null);
        } catch (err) {
            console.error('Error updating patient:', err);
            setError(`Error updating patient: ${err.message}`);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold leading-tight">Daftar Pasien</h2>
                    <Link to="/pasien/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Pasien
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
                                        Tanggal Lahir
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Alamat
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        No Telepon
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Jenis Kelamin
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
                                {pasiens.map((pasien) => (
                                    <tr key={pasien.id}>
                                        {editingPasienId === pasien.id ? (
                                            <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <form onSubmit={handleEditSubmit} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        name="nama"
                                                        value={editFormData.nama}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <input
                                                        type="date"
                                                        name="tanggal_lahir"
                                                        value={editFormData.tanggal_lahir}
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
                                                    <select
                                                        name="jenis_kelamin"
                                                        value={editFormData.jenis_kelamin}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        <option value="Laki-laki">Laki-laki</option>
                                                        <option value="Perempuan">Perempuan</option>
                                                    </select>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editFormData.email}
                                                        onChange={handleEditFormChange}
                                                        className="border rounded px-2 py-1"
                                                    />
                                                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                                    <button onClick={() => setEditingPasienId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                                                </form>
                                            </td>
                                        ) : (
                                            <>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pasien.nama}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pasien.tanggal_lahir}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pasien.alamat}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pasien.no_telepon}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pasien.jenis_kelamin}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{pasien.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <button onClick={() => handleEdit(pasien)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(pasien.id)} className="text-red-600 hover:text-red-900">
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

export default PasienList;

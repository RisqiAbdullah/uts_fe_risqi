import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="bg-blue-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <span className="text-white font-bold text-xl">Puskesmas</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <Link to="/dokter" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Dokter</Link>
                                <Link to="/nomor-antri" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Nomor Antri</Link>
                                <Link to="/pasien" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Pasien</Link>
                                <Link to="/pendaftaran" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Pendaftaran</Link>
                                <Link to="/puskesmas" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Puskesmas</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import DokterList from "./components/Dokter/Dokterlist";
import NomorAntriList from "./components/NomorAntri/NomorAntri";
import PasienList from "./components/Pasien/Pasien";
import Pendaftaran from "./components/Pendaftaran/Pendaftaran";
import PuskesmasList from "./components/Puskesmas/Puskesmas";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<Navbar />}>
                    <Route path="dokter" element={<DokterList />} />
                    <Route path="nomor-antri" element={<NomorAntriList />} />
                    <Route path="pasien" element={<PasienList />} />
                    <Route path="pendaftaran" element={<Pendaftaran />} />
                    <Route path="puskesmas" element={<PuskesmasList />} />
                    {/* Add other routes for components within Navbar here */}
                    <Route index element={<div>Welcome to Puskesmas</div>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

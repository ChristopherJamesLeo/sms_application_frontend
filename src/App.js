import React, { useState } from 'react';
import { BrowserRouter, Routes, Route , Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainContainer';
import Login from './components/authantication/Login';
import Register from "./components/authantication/Register";
import ProtectRoute from './components/authantication/ProtectRoute';

export default function App() {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData'))); // Initialize as null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setData={setUserData} />} />
        <Route path="/register" element={<Register setData={setUserData} />} />
        <Route
          path="/*"
          element={
            <ProtectRoute userData={JSON.parse(localStorage.getItem("userData"))}>
              <MainLayout />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
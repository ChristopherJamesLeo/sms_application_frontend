import React from 'react';
import { BrowserRouter , Routes , Route , Link } from 'react-router-dom';
import MainLayout from "./components/layout/MainContainer";

export default function App(){
  return (
    <>
      <BrowserRouter>
        <div className='main_container'>
          <MainLayout/>
        </div>
      </BrowserRouter>
      
    </>
  )
};
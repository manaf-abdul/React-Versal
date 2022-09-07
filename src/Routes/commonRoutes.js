import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/Common/Home.js'


const commonRoute = () => {
  return (
    <>
      <main style={{ minHeight: '90vh' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </main>
    </>
  )
}

export default commonRoute
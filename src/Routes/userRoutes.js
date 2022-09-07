import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../Pages/SignIn';
import SignInStep1 from '../Pages/SignInStep1';
import Blogs from '../Pages/Admin/Blogs'
import BlogPost from '../Pages/Admin/BlogPost.js';

const userRoutes = () => {
  return (
    <>
      <main style={{ minHeight: '90vh' }}>
        <Routes>
          {/* <Route path='/signin-1' element={<SignInStep1 />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignIn />} /> */}
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/blogs/:id' element={<BlogPost admin={false}/>} />
        </Routes>
      </main>
    </>
  )
}

export default userRoutes
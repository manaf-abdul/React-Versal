import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CourseList from '../Pages/Admin/InstructorIndex';
import CreateCourse from '../Pages/Admin/CreateCourse';
import EditCourse from '../Pages/Admin/EditCourse';
import ViewCourse from '../Pages/Admin/ViewCourse';
import Header from '../Components/Header';
import SideBar from '../Components/SideBar'
import Footer from '../Components/Footer';

const InstructorRoute = () => {
  return (
    <>

<SideBar/>
      <main style={{ minHeight: '90vh' }}>
        <Routes>
          <Route path='/' element={<CourseList />} />
          <Route path='/:id' element={<EditCourse />} />
          <Route path='/create' element={<CreateCourse />} />
          <Route path='/create/:id' element={<CreateCourse />} />
          <Route path='/course/view/:id' element={<ViewCourse />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default InstructorRoute
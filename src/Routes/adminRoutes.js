import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Components/Header'
import OfferPage from '../Pages/Admin/Offer'
import PostBlog from '../Pages/Admin/PostBlog'
import ViewBlogs from '../Pages/Admin/ViewBlogs'
import DashBoard from '../Pages/Admin/DashBoard'
import Enquiry from '../Pages/Admin/Enquiry'
import BlogPost from '../Pages/Admin/BlogPost'
import SignIn from '../Pages/SignIn'
import Batch from '../Pages/Admin/CreateBatch'
import { CartState } from '../Context'
import Footer from '../Components/Footer'
import SideBar from '../Components/SideBar'
import Webinars from '../Pages/Admin/Webinars'
import Category from '../Pages/Admin/Category'
import AddFaqModal from '../Components/Modals/AddFaqModal'
import { WorkShop } from '../Pages/Admin/WorkShop'
import WorkShopScreen from '../Pages/Admin/WorkShopScreen'

const adminRoute = () => {
  const { cart, setCart } = CartState();
  return (
    <>
    <Header/>
    
    <SideBar/>
      <main style={{ minHeight: '88vh' }}>
        <Routes>
          {/* <Route path='/course-list' element={<CourseList/>} /> */}
          {/* <Route path='/faq' element={< AddFaqModal/>} /> */}
          <Route path='/signin' element={< SignIn/>} />
          <Route path='/category' element={< Category/>} />
          <Route path='/batch' element={<Batch/>} />
          <Route path='/offer' element={<OfferPage/>} />
          <Route path='/view-blog-posts' element={<ViewBlogs/>} />
          <Route path='/view-blog-posts/:id' element={<BlogPost admin={true}/>} />
          <Route path='/post-blog' element={<PostBlog/>} />
          <Route path='/' element={<DashBoard/>} />
          <Route path='/enquiry' element={<Enquiry/>} />
          <Route path='/webinars' element={< Webinars/>} />
          <Route path='/workshop' element={< WorkShopScreen/>} />
          <Route path='/workshop/action' element={< WorkShop/>} />
          <Route path='/workshop/action/:id' element={< WorkShop/>} />
        </Routes>
      </main>
      <Footer></Footer>
    </>
  )
}

export default adminRoute
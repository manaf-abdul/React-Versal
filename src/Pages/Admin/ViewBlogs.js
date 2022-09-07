import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import BlogPost from '../../Components/BlogPost'
import { BASEURL } from '../../constants'
import { CartState } from '../../Context'

const ViewBlogs = () => {
    const redirect=useNavigate()
    const { cart, setCart } = CartState();

    const navigate = useNavigate();
    const [posts, setPosts] = useState([])

    const getBlogData = async () => {
        const { data } = await Axios.get(`${BASEURL}api/blog`)
        setPosts(data.data)
    }

    useEffect(() => {
        if(!cart || !cart.token){
            redirect('/admin/signin')
          }
          
        getBlogData()
    }, [])

    return (
        <>
            
    <ToastContainer/>
            <div className="p-5 mb-auto bg-light rounded-3 ">
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/admin" className="btn btn-light ">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                        <h1 className="jumbotron text-center">Blogs</h1>
                    </Col>
                    <Col lg={3} className='text-center'>
                        <Button className='mr-auto' variant="primary" size="md" onClick={() => navigate('/admin/post-blog')}>Add New Blog</Button>
                    </Col>
                </Row>
            </div>
            <Container>
                <Row>
                    {posts.map(post => (
                        <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                            <BlogPost post={post} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>

    )
}

export default ViewBlogs
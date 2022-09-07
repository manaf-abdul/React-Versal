import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { BASEURL } from '../../constants'
import BlogPost from '../../Components/BlogPost'
import { Col, Container, Row } from 'react-bootstrap'
import {CartState} from '../../Context'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
  
  const redirect=useNavigate()
  const { cart, setCart } = CartState();
  const [posts, setPosts] = useState([])
  const [state,setState]=useState('')
  
  console.log("1 inside 2",cart);

  const getBlogData = async () => {
    const { data } = await Axios.get(`${BASEURL}api/blog`)
    setPosts(data.data)
  }

  useEffect(() => {
    getBlogData()
  }, [])

  return (
    <>
      <h1 className="jumbotron text-center">Blogs</h1>
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

export default Blogs
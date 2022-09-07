import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { BASEURL } from '../../constants'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import htmlToText from 'react-html-parser'
import ConfirmModal from '../../Components/Modals/ConfirmModal'
import { ToastContainer, toast } from 'react-toastify';
import { successToast, errorToast, warningToast } from '../../Constants/Toast'

const BlogPost = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [post, setPosts] = useState({})
  const [blog, setBlogs] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const getBlogData = async () => {
    const { data } = await Axios.get(`${BASEURL}api/blog/${params.id}`)
    setPosts(data.data)
  }
  useEffect(() => {
    getBlogData()
  }, [])

  const deleteHandler = async () => {
    try {
      const { data } = await Axios.delete(`${BASEURL}api/blog/${post._id}`)
      console.log("data delete",data)
      if (data.errorcode === 0){
        navigate('/admin/view-blog-posts')
        toast.success(` ${data.msg}!`, successToast);
      }
      else {
        toast.warn(` ${data.msg}!`, warningToast);
      }
    } catch (error) {
      toast.error(` ${error.response.data.msg}!`, errorToast);
    }
  }

  return (
    <>
    <ToastContainer/>
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        deleteHandler={() => deleteHandler()}
        blog={blog}
      />
      {props.admin ? (
        <>
          <div className="p-5 mb-4 bg-light rounded-3 ">
            <Row>
              <Col lg={3} className='text-center'>
                <Link to="/admin/view-blog-posts" className="btn btn-light my-3">
                  Go Back
                </Link>
              </Col>
              <Col lg={6} >
                <h2 className=" text-center">{post.title}</h2>
              </Col>
              <Col lg={3} >
                <Button variant='danger' className="ml-5" onClick={() => setModalShow(true)}>Delete</Button>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div className="p-5 mb-4 bg-light rounded-3 ">
          <Row>
            <Col lg={3} className='text-center'>
              <Link to="/user/blogs" className="btn btn-light my-3">
                Go Back
              </Link>
            </Col>
            <Col lg={6} >
              <h2 className=" text-center">{post.title}</h2>
            </Col>
          </Row>
        </div>
      )}
      <Container className='text-center fluid' fluid>
        <h3>{post?.title}</h3>
        <Image src={post?.image?.location} fluid></Image>
      </Container>
      <Container className='mt-5 text-center'>
        {htmlToText(post?.text)}
      </Container>
    </>
  )
}

export default BlogPost
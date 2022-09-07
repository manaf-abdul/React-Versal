import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RichTextEditor from '../../Components/TipTap';
import Axios from 'axios';
import { BASEURL } from '../../constants';
import { Form, Button, FormControl } from 'react-bootstrap'
import { Link,useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const successToast = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const errorToast = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const warningToast = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const PostBlog = () => {
    const navigate=useNavigate()

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([])
    const [state,setState]=useState('')
    
    // const getBlogDatas = async () => {
    //     const { data } = await Axios.get(`${BASEURL}api/blog/631031702a164944ace6253a`)
    //     console.log("111111111111111111111111",data.data.text)
    // setState(data.data)
    // }

    // useEffect(() => {
    //     getBlogDatas()
    // }, [])

    const getValue = (value) => {
        setValue(value);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setImages(file)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', images)
        formData.append('text', value)
        formData.append('title', title)
        console.log("images:::", images, "    title:::", title, "    value:::", value);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => console.log(progressEvent.loaded)
            }
            Axios.post(`${BASEURL}api/blog`, formData, config)
                .then(res => {
                    if (res.data.errorcode === 0) {
                        toast.success(`🦄 ${res.data.msg}!`, successToast);
                        navigate('/admin/view-blog-posts')
                    } else {
                        toast.warn(`🦄 ${res.data.msg}!`, warningToast);
                    }
                })
        } catch (error) {
            toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
        }
    }

    return (
        <>
        <ToastContainer />
            <div className="p-5 mb-4 bg-light rounded-3 ">
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/admin/view-blog-posts" className="btn btn-light my-3">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                    <h1 className=" text-center">POST A NEW BLOG</h1>
                    </Col>
                </Row>
            </div>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>

                        <FormControl
                            type="file"
                            name="imageOne"
                            onChange={(e) => uploadFileHandler(e)}
                            accept=".jpg,.jpeg,.png,"
                        />
                    </Form.Group>

                    <RichTextEditor initialValue={state.text? state.text  :`<b>type your story HERE!!!!</b>`} getValue={getValue} />
                    <div className='text-center'>
                        <Button type='submit' variant='primary' className='mt-2'>
                            Post Blog
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default PostBlog
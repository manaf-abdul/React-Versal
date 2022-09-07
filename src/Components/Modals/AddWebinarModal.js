import Axios from 'axios';
// import e from 'express';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Image, FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast, warningToast } from '../../Constants/Toast';

const ConfirmModal = (props) => {
    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [topic, setTopic] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('')

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setImage(file)
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result)
            }
        };
        console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        setTitle('');
        // setLessonSummary('');
    }, [props])

    const createLesson = async (e) => {

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('date', date)
        formData.append('title', title)

        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            const { data } = await Axios.post(`${BASEURL}api/webinar`, formData, config)
            console.log("data", data);
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                // navigate(`/admin/webinars`)
                // props.setRender(true)
                // props.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
                // props.setRender(true)
            }
        } catch (error) {
            toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
        }
    }

    return (
        <>
            <ToastContainer />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Webinar
                    </Modal.Title>
                </Modal.Header>

                <Form >
                    <Modal.Body>

                        <Row>
                            <Col>
                                <Form.Group controlId='name' className='pt-3'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                {/* <input type="datetime-local" id="birthdaytime" name="birthdaytime"> */}
                                <Form.Group controlId='name' className='pt-3'>
                                    <Form.Label>Date & time</Form.Label>
                                    <Form.Control
                                        type='datetime-local'
                                        placeholder='Enter name'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='name' className='pt-3'>
                                    <Form.Label>Mentor Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter mentor name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='name' className='pt-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image' className='pt-3'>
                                    <Form.Label>Image</Form.Label>
                                    <FormControl
                                        type="file"
                                        className='file-input-box'
                                        size='md'
                                        width="50px"
                                        name="imageOne"
                                        onChange={(e) => uploadFileHandler(e)}
                                        accept=".jpg,.jpeg,.png,"
                                    />
                                    <Col className='pt-1' style={{ paddingLeft: '2rem' }}>
                                        <Image src={imagePreview} width="250 px" height="180px" className='fluid' />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='name' className='pt-3' style={{height:'100px'}}>
                                    <Form.Label>Topics</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder='Enter Topics'
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className='align-items-center'>
                        <Button onClick={(e) => createLesson(e)} type='submit' variant="success" size="md">Create</Button>
                        <Button onClick={props.onHide} variant='primary' size="md">Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ConfirmModal
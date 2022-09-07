import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, Image, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { BASEURL } from '../../constants';
import { errorToast, successToast, warningToast } from '../../Constants/Toast';

const CtaegoryModal = (props) => {
    const navigate=useNavigate()
    // console.log("props 1111111",props)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [state, setState] = useState('')
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

    const submitHandler = async (e) => {
        e.preventDefault()
        if(!props.category){
            try {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('description', description)
                formData.append('status', state)
                formData.append('image', image)
    
                const config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
    
                const { data } = await Axios.post(`${BASEURL}api/category`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    props.onHide()
                    props.setRender(true)
                } else {
                    toast.warn(`🦄 ${data.msg}!`, warningToast);
                    // props.setRender(true)
                }
            } catch (error) {
                toast.error(`🦄 ${error.response.data}!`, errorToast);
            }
        }else{
            try {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('description', description)
                formData.append('status', state)
                formData.append('image', image)

                const config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
    
                const { data } = await Axios.post(`${BASEURL}api/category/${props?.category?._id}`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    props.onHide()
                    props.setRender(true)
                } else {
                    toast.warn(`🦄 ${data.msg}!`, warningToast);
                    // props.setRender(true)
                }
            } catch (error) {
                toast.error(`🦄 ${error.response.data}!`, errorToast);
            }
        }
    }

    useEffect(() => {
        if(props.category && props.category.name){
            setName(props.category.name)
            setDescription(props.category.description)
            setState(props.category.status)
            setImage(props.category?.image?.location)
            setImagePreview(props.category?.image?.location)
        }
        return()=>{
            setName('')
            setDescription('')
            setState('')
            setImage('')
            setImagePreview('')
        }
    }, [props])
    
    return (
        <>
            <ToastContainer />
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Category
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='name' className='pt-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter mentor name'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='name' className='pt-3'>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as='select'
                                        placeholder='Enter Description'
                                        value={state}
                                        onChange={(e) => {
                                            setState(e.target.value)
                                        }
                                        }>
                                        <option key={"1"} value={"active"}>
                                            Active
                                        </option>
                                        <option key={"2"} value={"pending"}>
                                            Pending
                                        </option>
                                        <option key={"3"} value={"inactive"}>
                                            Inactive
                                        </option>
                                    </Form.Control>
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
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className='align-items-center'>
                    { props.category ?
                        <Button onClick={(e) => submitHandler(e)} type='submit' variant="success" size="md">Edit</Button>
                    :
                    <Button onClick={(e) => submitHandler(e)} type='submit' variant="success" size="md">Create</Button>             
                    }
                        <Button onClick={props.onHide} variant='primary' size="md">Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default CtaegoryModal
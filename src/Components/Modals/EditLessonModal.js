import Axios from 'axios';
// import e from 'express';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../../constants';
import { warningToast, errorToast, successToast } from '../../Constants/Toast';
import { ToastContainer, toast } from 'react-toastify';

const ConfirmModal = (props) => {

    const [title, setTitle] = useState('')
    const [lessonSummary, setLessonSummary] = useState([])
    
    const [data, setdata] = useState('')

    const submitHandler = async (e) => {
        // e.preventDefault()
        // const { data } = await Axios.post(`${BASEURL}api/course/lesson/${props.lesson._id}`, { title, lessonSummary, lesson: props.lesson._id })
        // console.log("data", data)
        // props.onHide()
    }

    useEffect(() => {
        if (props && props.lesson) {
            setTitle(props?.lesson.title)
            setLessonSummary(props?.lesson.lessonSummary)
        }
    }, [props])

    const handler=(e)=>{
        console.log("e.target",e.target.value)
    setdata(e.target.value)
    }

    const updateLesson = async (e) => {
        e.preventDefault()
        lessonSummary.push(data)
        console.log("lessonSummary", lessonSummary);
        try {
            const { data } = await Axios.post(`${BASEURL}api/course/lesson/${props.lesson._id}`, { title, lessonSummary, lesson: props.lesson._id })
            // console.log("data", data);
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
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
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit the course
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={submitHandler}>
                    <Modal.Body>
                        <Form.Group controlId='name'>
                            <Form.Label>Title</Form.Label>

                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {
                            props && props.lesson && props.lesson.lessonSummary &&
                            <Form.Group controlId='name'>
                                <Form.Label>Lesson Summary</Form.Label>

                                <Form.Control
                                    // defaultValue={lessonSummary}
                                    type='name'
                                    placeholder='Enter name'
                                    value={lessonSummary||data} 
                                    onChange={(e) => handler(e)}
                                ></Form.Control>
                            </Form.Group>
                        }
                    </Modal.Body>
                    <Modal.Footer className='align-items-center'>
                        <Button onClick={(e) => updateLesson(e)} type='submit' variant="success" size="md">Update</Button>
                        <Button onClick={props.onHide} variant='primary' size="md">Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ConfirmModal
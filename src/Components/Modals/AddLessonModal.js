import Axios from 'axios';
// import e from 'express';
import React, { useEffect, useState } from 'react'
import { Button, Col,Row, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../../constants';
import { warningToast, errorToast, successToast } from '../../Constants/Toast';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = (props) => {
    console.log(props)
    const navigate=useNavigate()

    const [title, setTitle] = useState()
    const [lessonSummary, setLessonSummary] = useState()
    const [serviceList, setServiceList] = useState([]);

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };
    
    useEffect(() => {
        setTitle('');
        setLessonSummary('');
        setServiceList([{ service: "" }])
    }, [props])

    const createLesson = async (e) => {
        e.preventDefault()
        try {
            const { data } = await Axios.post(`${BASEURL}api/course/lesson`, { title, lessonSummary:serviceList, course_id: props.course })
            // console.log("data", data);
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                navigate(`/instructor/course/view/${props.course}`)
                console.log("props.course",props.course)
                props.setRender(true)
                props.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
                props.setRender(true)
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
                        Add New Lesson
                    </Modal.Title>
                </Modal.Header>

                <Form >
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

                        <Form.Group>
                            <Form.Label>Lesson Content</Form.Label>
                            {serviceList.map((singleService, index) => (
                                <Col key={index} className="services">
                                    <Row className="first-division">
                                        <Col xl={9}>
                                       
                                        <Form.Control
                                            type='text'
                                            name="service"
                                            id="service"
                                            placeholder='Enter name'
                                            value={singleService.service}
                                            onChange={(e) => handleServiceChange(e, index)}
                                        ></Form.Control>
                                        
                                        <div className="pb-3">
                                        {serviceList.length !== 1 && (
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => handleServiceRemove(index)}
                                                size="sm"
                                            >
                                                <span>Remove</span>
                                            </Button>
                                        )}
                                    </div>
                                        </Col>
                                        <Col>
                                        {serviceList.length - 1 === index && (
                                            <div className='d-flex justify-content-end'>
                                            <Button
                                                onClick={handleServiceAdd}
                                                variant="outline-success"
                                                size="sm"
                                            >
                                                
                                                <span>Add a content</span>
                                                
                                            </Button>
                                            </div>
                                        )}
                                        </Col>
                                        
                                    </Row>
                                    
                                </Col>
                            ))}
                        </Form.Group>

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
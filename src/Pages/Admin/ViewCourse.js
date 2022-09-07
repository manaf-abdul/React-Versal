import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import ReactPlayer from 'react-player'
import { BASEURL } from '../../constants'
import { Col, Container, Row, Button, Image, ListGroup, ListGroupItem, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Modal, Select } from 'antd';
import EditLessonModal from '../../Components/Modals/EditLessonModal'
import AddLessonModal from '../../Components/Modals/AddLessonModal'
import ConfirmModal from '../../Components/Modals/ConfirmModal'
import { warningToast, errorToast, successToast } from '../../Constants/Toast';
import { ToastContainer, toast } from 'react-toastify';
import { CartState } from '../../Context'
import AddFaqModal from '../../Components/Modals/AddFaqModal'

const ViewCourse = () => {
    const navigate = useNavigate()
    const { cart, setCart } = CartState();
    const params = useParams()
    const [course, setCourse] = useState()
    const [lessonData, setLessonData] = useState()
    const [modalShow, setModalShow] = React.useState(false);
    const [confrimModalShow, setConfrimModalShow] = React.useState(false);
    const [addModalShow, setAddModalShow] = React.useState(false);
    const [faqModalShow, setFaqModalShow] = React.useState(false);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [lesson_id, setLesson_id] = React.useState('');
    const [course_id, setCourse_id] = React.useState('');
    const [render, setRender] = React.useState(false);

    console.log("course", course)

    const deleteLessonHandler = async () => {
        try {
            const { data } = await Axios.post(`${BASEURL}api/course/lesson-delete`, { course: course_id, lesson: lesson_id })
            if (data.errorcode === 0) {
                setRender(true)
                toast.success(`🦄 ${data.msg}!`, successToast);
                setConfrimModalShow(false)
            } else {
                setRender(true)
                toast.warn(`🦄 ${data.msg}!`, warningToast);
                setConfrimModalShow(false)
            }
        } catch (error) {
            toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
            setConfrimModalShow(false)
        }
    }

    const fetchCourseDetail = async (id) => {
        const { data } = await Axios.get(`${BASEURL}api/course/${id}`)
        // console.log(data)
        setCourse(data.data)
    }

    const showModal = (data) => {
        setLessonData(data)
        setModalShow(true)
    }

    const showConfirmModal = (lesson, course) => {
        setLesson_id(lesson)
        setCourse_id(course)
        setConfrimModalShow(true)
    }

    useEffect(() => {
        if (params.id) {
            fetchCourseDetail(params.id)
        }
        if (render) {
            setRender(false)
        }
    }, [render, cart])

    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3 ">
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/instructor" className="btn btn-light ">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                        <h1 className="m-0 p-0 text-center square ">{course?.name}</h1>
                    </Col>
                    <Col lg={3} className='text-center'>
                        <Row>
                            <Button className='mb-3 mr-auto'
                                style={{ height: '3rem', paddingTop: '0', paddingBottom: '0', paddingLeft: '0', paddingRight: '0', marginTop: '0rem' }} variant="warning" size="md"
                                onClick={() => navigate(`/instructor/create/${course._id}`)}>
                                Edit Course
                            </Button>
                        </Row>
                        <Row>
                            <Button className='mr-auto' variant="primary" size="md" onClick={() => {
                                setAddModalShow(true)
                                setCourse_id(course._id)
                            }}>Add New Lesson</Button>
                             <Button className='mr-auto' variant="primary" size="md" onClick={() => {
                                setFaqModalShow(true)
                                setCourse_id(course._id)
                            }}>Add FAQ</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
            <AddLessonModal
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                course={course_id}
                setRender={() => setRender(true)}
            />
            <ConfirmModal
                show={confrimModalShow}
                onHide={() => setConfrimModalShow(false)}
                deleteHandler={() => deleteLessonHandler()}
                lesson={true}
            />
            <EditLessonModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                lesson={lessonData}
                course={course}
            />
            <AddFaqModal
             show={faqModalShow}
             onHide={() => setFaqModalShow(false)}
             lesson={lessonData}
             course={course_id}
            />

            <Container>
                {course &&
                    <Row>
                        <Row>
                            <Col md={{ order: 1, span: 6 }} lg={{ order: 1, span: 6 }}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h3>{course.name}</h3>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col className='text-center'>
                                                <Image height="250px" width="300px" fluid className='fluid' src={course.image ? course.image.location : ""}></Image>
                                            </Col>
                                        </Row>
                                        Description:<br />
                                        {course.description}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h6>Lessons</h6>
                                        <Accordion defaultActiveKey="0">
                                            {course.lessons && course.lessons.map((lesson, index) => (
                                                <Accordion.Item key={lesson._id} eventKey={index}>
                                                    <Accordion.Header>{lesson.title}</Accordion.Header>

                                                    <Accordion.Body>
                                                        <Row>
                                                            <Col>
                                                                {lesson?.lessonSummary && lesson.lessonSummary.map((x, index) => (
                                                                    <div key={index}>
                                                                        <li key={index}>{x}</li>
                                                                    </div >
                                                                ))}
                                                            </Col>
                                                            <Col>
                                                                {/* <Button variant="warning" size="sm" onClick={() => showModal(lesson)}>Edit</Button> */}
                                                                <Button variant="danger" size="sm" onClick={() => showConfirmModal(lesson._id, course._id)}>Delete</Button>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col md={{ order: 2, span: 6 }} lg={{ order: 2, span: 6 }}>
                                <Row className='pt-3'>
                                    <Col xs={12} lg={10}>
                                        <ListGroup>
                                            <Row>
                                                <Col className='p-0'>
                                                    <ListGroup.Item style={{ marginLeft: '12px' }}>
                                                        Price:₹<strong>{course.price}
                                                        </strong>
                                                    </ListGroup.Item>
                                                </Col>
                                                <Col className='p-0'>
                                                    <ListGroupItem style={{ marginRight: '12px' }}>
                                                        Paid : {course.paid ? "Yes" : "Free"}
                                                    </ListGroupItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className='p-0'>
                                                    <ListGroup.Item style={{ marginLeft: '12px' }}>
                                                        Status : {course.published ? "Published" : "Not Published"}
                                                    </ListGroup.Item>
                                                </Col>
                                                <Col className='p-0'>
                                                    <ListGroup.Item style={{ marginRight: '12px' }}>
                                                        Duration :
                                                        {course.duration}
                                                    </ListGroup.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className='p-0'>
                                                    <ListGroupItem style={{ marginLeft: '12px' }}>
                                                        Language :
                                                        {course.language && course.language.map(element => (
                                                            <span key={element._id}> {element.name} |</span>
                                                        ))}
                                                    </ListGroupItem>
                                                </Col>
                                                <Col className='p-0'>
                                                    <ListGroupItem style={{ marginRight: '12px' }}>
                                                        Category : {course.category?.name}
                                                    </ListGroupItem>
                                                </Col>

                                            </Row>
                                            <Row className='pt-5'>
                                                <ReactPlayer
                                                    className="react-player-div fluid"
                                                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                                    url={course?.introVideo?.location}
                                                    onContextMenu={(e) => e.preventDefault()}
                                                    width="100%"
                                                    height="100%"
                                                    controls
                                                />
                                            </Row>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                }

            </Container>
        </>
    )
}

export default ViewCourse
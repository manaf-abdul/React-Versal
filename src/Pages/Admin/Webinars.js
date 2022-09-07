import Axios from 'axios'
import './webinar.css'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BlogPost from '../../Components/BlogPost'
import AddWebinarModal from '../../Components/Modals/AddWebinarModal'
import { BASEURL } from '../../constants'

const Webinars = () => {
    const [webinarModalShow, setWebinarModalShow] = useState(false)
    const [webinars, setWebinars] = useState([])

    const getDatas = async () => {
        const { data } = await Axios.get(`${BASEURL}api/webinar`)
        setWebinars(data.data)
    }

    useEffect(() => {
        getDatas()
    }, [])

    return (
        <>
            <AddWebinarModal
                show={webinarModalShow}
                onHide={() => setWebinarModalShow(false)}
            // course={course_id}
            // setRender={() => setRender(true)}
            />
            <div className="p-5 mb-4 bg-light rounded-3 ">
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/admin" className="btn btn-light my-3">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                        <h1 className="m-0 p-0 text-center square ">Webinar</h1>
                    </Col>
                    <Col lg={3} className='text-center'>
                        <Button variant='primary' size='md' onClick={() => {
                            // setSelected()
                            setWebinarModalShow(true)
                        }}>Add New Weinar</Button>
                    </Col>
                </Row>
            </div>
            <Container>
                <h3>Upcoming Webinars</h3>
                <div className='me'>
                    {webinars && webinars.map((webinar) => (
                        <div key={webinar._id}
                            className="mycard">
                            <Link to={`${webinar._id}`}>
                                <Card className="rounded my-3 p-3 productCard mb-3">
                                    <Card.Text as='h4' className='productText' style={{ color: 'green' }}>
                                    </Card.Text>
                                    <Card.Body>
                                        <Card.Title as='div'><strong>{webinar.title}</strong></Card.Title>
                                        <Card.Text as='h5'>
                                            {webinar.description}
                                        </Card.Text>
                                        <Card.Text as='h5'>
                                            {webinar.date}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
                <section className='pt-5'>
                    <h3>Previous Webinars</h3>
                    <div className='me'>
                        {webinars.map((webinar) => (
                            <div key={webinar._id}
                                className="mycard">
                                <Link to={`${webinar._id}`}>
                                    <Card className="rounded my-3 p-3 productCard mb-3">
                                        <Card.Text as='h4' className='productText' style={{ color: 'green' }}>
                                        </Card.Text>
                                        <Card.Body>
                                            <Card.Title as='div'><strong>{webinar.title}</strong></Card.Title>
                                            <Card.Text as='h5'>
                                                {webinar.description}
                                            </Card.Text>
                                            <Card.Text as='h5'>
                                                {webinar.date}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </Container>
        </>
    )
}

export default Webinars
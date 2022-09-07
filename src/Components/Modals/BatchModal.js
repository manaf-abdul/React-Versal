import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../../constants';
import { warningToast, errorToast, successToast } from '../../Constants/Toast';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BatchModal = (props) => {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [price, setPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [languageList, setLanguageList] = useState()
    // const [language, setLanguage] = useState('')
    const [courseList, setCourseList] = useState([])
    const [course, setCourse] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [limit, setLimit] = useState()

    
    console.log("courseList",courseList)

    const getDatas = async () => {
        const { data } = await Axios.get(`${BASEURL}api/course`)
        setCourseList(data.data)
        const langdata = await Axios.get(`${BASEURL}api/language`)
        setLanguageList(langdata.data.data)
    }

    // const changeHandler = (e) => {
    //     console.log(e.target.value)
    //     if (language.includes(e.target.value)) {
    //         console.log("already selected")
    //         setLanguage(language.filter(x => x !== e.target.value))
    //     } else {
    //         console.log("Not selected")
    //         setLanguage([...language, e.target.value])
    //     }
    // }

    useEffect(() => {
        getDatas()
        if(props?.batch){
            setName(props?.batch?.name)
            setPrice(props?.batch?.price)
            setDiscountPrice(props?.batch?.discountPrice)
            setCourse(props?.batch?.course?._id)
            setStartDate(props?.batch?.startDate)
            setEndDate(props?.batch?.endDate)
            setLimit(props?.batch?.totalStudentsLimit)
        }else{
            setName('')
            setPrice(0)
            setDiscountPrice('')
            setCourse('')
            setStartDate('')
            setEndDate('')
            setLimit(0)
          }
          return ()=>{
            setName('')
            setPrice()
            setDiscountPrice('')
            setCourse('')
            setStartDate('')
            setEndDate('')
            setLimit()
          }
    }, [props])

    const createLesson = async (e) => {
        console.log(name, startDate, endDate, course, price, discountPrice,limit)
        console.log("course",course);
        e.preventDefault()
        if (!course || !startDate || !endDate || !name) {
            toast.error('ⓓ Please fill the required fields!', errorToast);
        } else {
            try {
                const { data } = await Axios.post(`${BASEURL}api/batch`, { name, startDate, endDate, course, price, discountPrice,limit })
                // console.log("data", data);
                if (data.errorcode === 0) {
                    toast.success(`ⓓ ${data.msg}!`, successToast);
                    navigate(`/admin/batch`)
                    console.log("props.course", props.course)
                    props.setRender(true)
                    props.onHide()
                } else {
                    toast.warn(`ⓓ ${data.msg}!`, warningToast);
                    props.setRender(true)
                }
            } catch (error) {
                toast.error(`ⓓ ${error.response.data.msg}!`, errorToast);
            }
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
                        Add New Batch
                    </Modal.Title>
                </Modal.Header>

                <Form >
                    <Modal.Body>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>

                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Course</Form.Label>

                            <Form.Control
                                as='select'
                                placeholder='Enter the course'
                                // value={course}
                                onChange={(e) =>setCourse(e.target.value)}
                            >
                                {courseList.map((cour) => (
                                    <>
                                    {console.log("inside map",course)}
                                    <option key={cour._id} value={cour._id}>{cour.name}</option>
                                    
                                    </>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='name'>
                            <Form.Label>Total Student Limit</Form.Label>

                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Price</Form.Label>

                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Discount Price</Form.Label>

                            <Form.Control
                                type='number'
                                placeholder='Enter discount Price'
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId='name'>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type='date'
                                        placeholder=''
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='name'>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type='date'
                                        placeholder=''
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* <Form.Group controlId="name">
                            <Form.Label>Languages</Form.Label>
                            <Row>
                                {languageList?.map(lang => (
                                    <Col key={lang._id} xs={6} sm={6} lg={3} xl={3}>
                                        <Form.Check
                                            type='checkbox'
                                            label={lang.name}
                                            value={lang._id}
                                            onChange={(e) => {
                                                changeHandler(e)
                                            }
                                            }
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group> */}
                    </Modal.Body>
                    <Modal.Footer className='align-items-center'>
                        {props?.batch ? <Button onClick={(e) => createLesson(e)} type='submit' variant="success" size="md">Edit</Button>
                        :<Button onClick={(e) => createLesson(e)} type='submit' variant="success" size="md">Create</Button>
                        }
                        <Button onClick={props.onHide} variant='primary' size="md">Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default BatchModal
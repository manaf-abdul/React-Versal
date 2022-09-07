import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, Image, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { produce } from "immer";
import { generate } from "shortid";
import ReactPlayer from 'react-player'
import Axios from 'axios';
import { BASEURL } from '../../constants';

export const WorkShop = () => {

    const navigate = useNavigate()
    const params = useParams();

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [discountPrice, setDiscountPrice] = useState(0)
    const [image, setImage] = useState('')
    const [mentorImage, setMentorImage] = useState('')
    const [introVideo, setIntroVideo] = useState('')
    const [duration, setDuration] = useState('')
    const [videoPreview, setVideoPreview] = useState('/images/videoplayback.webm')
    const [description, setDescription] = useState('')
    const [mentor, setMentor] = useState('')
    const [imagePreview, setImagePreview] = useState('/images/uploadyourown.png')
    const [imageMentorPreview, setImageMentorPreview] = useState('/images/uploadyourown.png')
    const [totalBonus, setTotalBonus] = useState([]);
    const [bonus, setBonus] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [category_id, setCategory_id] = useState('')

    const fetchDatas=async()=>{
        const {data}=await Axios.get(`${BASEURL}api/category`)
        setCategoriesList(data.data)
    }

    useEffect(() => {
        fetchDatas()
    }, [])
    

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('title', title)
            formData.append('video', introVideo)
            formData.append('price', price)
            formData.append('discountPrice', discountPrice)
            formData.append('duration', duration)
            formData.append('description', description)
            formData.append('startDate', startDate)
            formData.append('endDate', endDate)
            formData.append('bonus', bonus)
            formData.append('totalBonus', totalBonus)
            formData.append('mentor', mentor)
            formData.append('mentorimage', mentorImage)
            formData.append('category', category_id)
            const { data } = await Axios.post(`${BASEURL}api/workshop`, formData)
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }

    const uploadFileHandler = async (e) => {
        console.log('file')
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

    const uploadVideoHandler = (e) => {
        const file = e.target.files[0]
        console.log("video file", file)
        setIntroVideo(file)
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setVideoPreview(reader.result);
            }
        };
        console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }

    const uploadFileHandler2 = async (e) => {
        console.log("33333333333333");
        const file = e.target.files[0]
        setMentorImage(file)
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageMentorPreview(reader.result)
            }
        };
        console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3 ">
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/admin" className="btn btn-light my-3">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                        <h1 className="m-0 p-0 text-center square ">WORKSHOP</h1>
                    </Col>
                    <Col lg={3} className='text-center'>
                        <Button
                            variant='primary'
                            size='md'
                            onClick={() => {
                                console.log("hereeeeeeeeeeeeeeeeee");
                                navigate('/workshop/:id')}}>
                            Add New Category
                        </Button>
                    </Col>
                </Row>
            </div>
            <div>

                <Container className='fluid'>

                    <Form onSubmit={submitHandler}>
                        <Row>
                            <h3 className="m-0 p-0 pb-3 text-center square ">CREATE NEW WORKSHOP</h3>
                            <Col>
                                <Form.Group controlId='name' className='pb-4'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category' className='pb-4'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={category_id}
                                        onChange={(e) => setCategory_id(e.target.value)}
                                    >
                                        {categoriesList && categoriesList.map((Categories) => (
                                            <option key={Categories._id} value={Categories._id}>
                                                {Categories.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description' className='pb-4'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='brand' className='pb-4'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter brand'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='brand' className='pb-4'>
                                    <Form.Label>Discout Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter brand'
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image' className='pb-4'>
                                    <Form.Label>Title Image</Form.Label>
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
                                        <Image src={imagePreview} width="300 px" height="200px" className='fluid' />
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId='image' className='pb-4'>
                                    <Form.Label>IntroVideo</Form.Label>
                                    <FormControl
                                        type="file"
                                        name="imageOne"
                                        className='file-input-box'
                                        onChange={(e) => uploadVideoHandler(e)}
                                        accept=".mp4"
                                    />
                                    <Col xs={3} style={{ paddingLeft: '2rem' }} className='fluid'>

                                        <ReactPlayer
                                            className="react-player-div fluid"
                                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                            url={videoPreview}
                                            onContextMenu={(e) => e.preventDefault()}
                                            width="300px"
                                            height="200px"
                                            controls
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col style={{ paddingLeft: '2.5rem' }}>
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
                                <Form.Group controlId='brand' className='pb-4 pt-4'>
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter brand'
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Label className='pt-4'>MENTOR DETAILS</Form.Label>
                                <Form.Group controlId='brand' className='pt-3'>
                                    <Form.Label>Mentor Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter brand'
                                        value={mentor}
                                        onChange={(e) => setMentor(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                {/* </Form.Group> */}
                                <Form.Group controlId='image' className='pb-4'>
                                    <Form.Label>Mentor Image</Form.Label>
                                    <FormControl
                                        type="file"
                                        className='file-input-box'
                                        size='md'
                                        width="50px"
                                        name="imageOne"
                                        onChange={(e) => uploadFileHandler2(e)}
                                        accept=".jpg,.jpeg,.png,"
                                    />
                                    <Col className='pt-1' style={{ paddingLeft: '2rem' }}>
                                        <Image src={imageMentorPreview} width="300 px" height="200px" className='fluid' />
                                    </Col>
                                </Form.Group>

                                <Form.Label>Bonuses</Form.Label>
                                <Form.Group controlId='brand' className='pt-1'>
                                    <Form.Label>Total Bonus</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter brand'
                                        value={totalBonus}
                                        onChange={(e) => setTotalBonus(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                {bonus.map((p, index) => {
                                    return (
                                        <div key={p._id}>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId='name' className='pt-3'>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            onChange={e => {
                                                                const title = e.target.value;
                                                                setBonus(currentPeople =>
                                                                    produce(currentPeople, v => {
                                                                        v[index].title = title;
                                                                    })
                                                                );
                                                            }}
                                                            value={p.title}
                                                            placeholder="Title"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>

                                                    <Form.Group controlId='name' className='pt-3'>
                                                        <Form.Label>Description</Form.Label>
                                                        <Form.Control
                                                            type='number'
                                                            onChange={e => {
                                                                const price = e.target.value;
                                                                setBonus(currentPeople =>
                                                                    produce(currentPeople, v => {
                                                                        v[index].price = price;
                                                                    })
                                                                );
                                                            }}
                                                            value={p.price}
                                                            placeholder="Bonus"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button className='mt-5'
                                                        onClick={() => {
                                                            setBonus(currentPeople =>
                                                                currentPeople.filter(x => x._id !== p._id)
                                                            );
                                                        }}
                                                    >
                                                        x
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })}
                                <Button
                                    onClick={() => {
                                        setBonus(currentPeople => [
                                            ...currentPeople,
                                            {
                                                _id: generate(),
                                                title: "",
                                                price: ""
                                            }
                                        ]);
                                    }}
                                >
                                    Add Bonus
                                </Button>
                            </Col>
                        </Row>
                        <Row className='text-center pt-3'>
                            <Col className="d-grid gap-2 mb-5">
                                {params.id ?
                                    <Button type='submit' variant='success' >
                                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                            Update Course
                                        </span>
                                    </Button> :
                                    <Button type='submit' variant='primary'> Create </Button>
                                }
                            </Col>
                        </Row>
                    </Form>
                </Container>

            </div>
        </>
    )
}

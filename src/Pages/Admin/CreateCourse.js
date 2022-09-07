import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Form, Button, FormControl, Row, Col, Container, Image } from 'react-bootstrap'
import FormContainer from '../../Components/Forms/FormContainer'
import Axios from 'axios'
import { BASEURL } from '../../constants'
import { warningToast, errorToast, successToast } from '../../Constants/Toast';
import { ToastContainer, toast } from 'react-toastify';
import ReactPlayer from 'react-player'
import { produce } from "immer";
import { generate } from "shortid";

const CreateCourseScreen = () => {

  const navigate = useNavigate()
  const params = useParams();


  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [mentorImage, setMentorImage] = useState('')
  const [whyImage, setWhyImage] = useState('')
  const [duration, setDuration] = useState('')
  const [introVideo, setIntroVideo] = useState('')
  const [videoPreview, setVideoPreview] = useState('/images/videoplayback.webm')
  const [description, setDescription] = useState('')
  const [category_id, setCategory_id] = useState('')
  const [categoriesList, setCategoriesList] = useState([])
  const [languageList, setLanguageList] = useState([])
  const [mentor, setMentor] = useState('')
  const [language_id, setLanguage_id] = useState([])
  const [courseTitle, setCourseTitle] = useState('')
  const [whyDescription, setWhyDescription] = useState('')
  const [imagePreview, setImagePreview] = useState('/images/uploadyourown.png')
  const [imageMentorPreview, setImageMentorPreview] = useState('/images/uploadyourown.png')
  const [whyImagePreview, setWhyImagePreview] = useState('/images/uploadyourown.png')
  const [course, setfirst] = useState("")
  const [people, setPeople] = useState([]);
  const [who, setWho] = useState([]);
  const [career, setCareer] = useState([]);
  const [totalBonus, setTotalBonus] = useState([]);
  const [bonus, setBonus] = useState([])

  const fetchCourse = async (id) => {
    const { data } = await Axios.get(`${BASEURL}api/course/${id}`)
    console.log("data", data);
    setDescription(data.data.description)
    setIntroVideo(data.data.image.location)
    setName(data.data.name)
    setImagePreview(data.data.image.location)
    setDuration(data.data.duration)
    setCategory_id(data.data.category._id)
    setPrice(data.data.price)
    setLanguage_id([data.data.language._id])
    // setInstructor_id(data.data.instructor && data.data.instructor)
    setVideoPreview(data.data.introVideo.location)
    setPeople(data.data.faq)
    setWho(data.data.fieldWho)
    setCareer(data.data.carrierOpps)
    setTotalBonus(data.data.totalBonus)
    setBonus(data.data.bonuses)
  }

  const fetchDatas = async () => {
    const catdata = await Axios.get(`${BASEURL}api/category`)
    setCategoriesList(catdata.data.data)
    const langdata = await Axios.get(`${BASEURL}api/language`)
    setLanguageList(langdata.data.data)
    console.log(langdata.data.data)
  }

  useEffect(() => {
    if (params.id) {
      fetchCourse(params.id)
    }
    fetchDatas()
  }, [])

  const uploadFileHandler = async (e, f, g) => {
    console.log('1111111111')
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

  const uploadFileHandler2 = async (e) => {
    console.log("22222222222")
    const file = e.target.files[0]
    setWhyImage(file)
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setWhyImagePreview(reader.result)
      }
    };
    console.log(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  }

  const uploadFileHandler3 = async (e) => {
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

  const uploadVideoHandler = (e) => {
    const file = e.target.files[0]
    console.log("file", file)
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


  const submitHandler = async (e) => {
    console.log("people", people);
    e.preventDefault()
    if (language_id.length === 0) {
      toast.warn(`🦄 ${"Please select atleast one Language"}!`, warningToast);
    }
    else if (!category_id) {
      toast.warn(`🦄 ${"Please select one Category"}!`, warningToast)
    }
    else {
      if (params.id) {
        try {

          console.log("111111111111", who);
          const formData = new FormData()
          formData.append('image', image)
          formData.append('name', name)
          formData.append('video', introVideo)
          formData.append('price', price)
          formData.append('duration', duration)
          formData.append('description', description)
          formData.append('category_id', category_id)
          formData.append('whyDescription', whyDescription)
          formData.append('whyTitile', courseTitle)
          formData.append('whyimage', whyImage)
          formData.append('mentor', mentor)
          formData.append('mentorimage', mentorImage)
          // formData.append('instructor_id', instructor_id)
          formData.append('language_id', language_id)
          formData.append('totalBonus', totalBonus)
          formData.append('people', JSON.stringify(people))
          formData.append('who', JSON.stringify(who))
          formData.append('career', JSON.stringify(career))
          formData.append('bonus', JSON.stringify(bonus))
          try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: progressEvent => console.log(progressEvent.loaded)
            }
            Axios.post(`${BASEURL}api/course/${params.id}`, formData, config, {
              onUploadProgress: ProgressEvent => {
                console.log("Progress:", (ProgressEvent.loaded / ProgressEvent.total) * 100)
              }
            })
              .then(res => {
                if (res.data.errorcode === 0) {
                  navigate(`/instructor/course/view/${params.id}`)
                  toast.success(`🦄 ${res.data.msg}!`, successToast);
                } else {
                  toast.warn(`🦄 ${res.data.msg}!`, warningToast);
                }
              })
          } catch (error) {
            console.log(error)
            toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
          }
        } catch (error) {
          toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
        }
      } else {
        console.log("111111111111", who);
        const formData = new FormData()
        formData.append('image', image)
        formData.append('video', introVideo)
        formData.append('price', price)
        formData.append('duration', duration)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('category_id', category_id)
        formData.append('whyDescription', whyDescription)
        formData.append('whyTitile', courseTitle)
        formData.append('whyimage', whyImage)
        formData.append('mentor', mentor)
        formData.append('mentorimage', mentorImage)
        formData.append('totalBonus', totalBonus)
        // formData.append('instructor_id', instructor_id)
        formData.append('language_id', language_id)
        formData.append('people', JSON.stringify(people))
        formData.append('who', JSON.stringify(who))
        formData.append('career', JSON.stringify(career))
        formData.append('bonus', JSON.stringify(bonus))
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => console.log(progressEvent.loaded)
          }
          Axios.post(`${BASEURL}api/course`, formData, config, {
            onUploadProgress: ProgressEvent => {
              console.log("Progress:", (ProgressEvent.loaded / ProgressEvent.total) * 100)
            }
          })
            .then(res => {
              if (res.data.errorcode === 0) {
                navigate('/instructor')
                toast.success(`🦄 ${res.data.msg}!`, successToast);
              } else {
                toast.warn(`🦄 ${res.data.msg}!`, warningToast);
              }
            })
        } catch (error) {
          console.log(error)
          toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
        }
      }
    }
  }

  const changeHandler = (e) => {
    console.log(e.target.value)
    // if()
    if (language_id.includes(e.target.value)) {
      console.log("already selected")
      setLanguage_id(language_id.filter(x => x !== e.target.value))
    } else {
      console.log("Not selected")
      setLanguage_id([...language_id, e.target.value])
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="p-5 mb-4 bg-light rounded-3 ">
        <Col lg={3} className='text-center'>
          <Link to="/instructor" className="btn btn-light ">
            Go Back
          </Link>
        </Col>
        <Col>
          <h1 className="text-center square ">{params.id ? "Edit Course" : "Add Course"}</h1>
        </Col>
      </div>

      <Container className='fluid'>

        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group controlId='name' className='pb-4'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
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

              <Form.Group controlId="name">
                <Form.Label>Languages</Form.Label>
                <Row>
                  {languageList.map(lang => (
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
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Duration'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId='brand' className='pb-4'>
                <Form.Label>Instructor</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={instructor_id}
                  onChange={(e) => setInstructor_id(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

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
                            placeholder="Offer Price"
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
              <Row>
                <Col>
                  <Form.Label className='pt-4'>CAREER OPPORTUNITIES</Form.Label>
                  {career.map((p, index) => {
                    return (
                      <div key={p._id}>
                        <Row>
                          <Col>
                            <Form.Group controlId='name' className='pt-1'>
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                onChange={e => {
                                  const question = e.target.value;
                                  setCareer(currentPeople =>
                                    produce(currentPeople, v => {
                                      v[index].question = question;
                                    })
                                  );
                                }}
                                value={p.question}
                                placeholder="Question"
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col>

                            <Form.Group controlId='name' className='pt-1'>
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                onChange={e => {
                                  const answer = e.target.value;
                                  setCareer(currentPeople =>
                                    produce(currentPeople, v => {
                                      v[index].answer = answer;
                                    })
                                  );
                                }}
                                value={p.answer}
                                placeholder="Answer"
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col lg={1}>
                            <Button className='mt-5'
                              onClick={() => {
                                setCareer(currentPeople =>
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
                      setCareer(currentPeople => [
                        ...currentPeople,
                        {
                          _id: generate(),
                          question: "",
                          answer: ""
                        }
                      ]);
                    }}
                  >
                    Add Career
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col style={{ paddingLeft: '2.5rem' }}>

              <Form.Label>WHY THIS COURSE</Form.Label>
              <Form.Group controlId='brand' className='pb-4'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='brand' className='pb-4'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={whyDescription}
                  onChange={(e) => setWhyDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='image' className='pb-4'>
                <Form.Label>Image</Form.Label>
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
                  <Image src={whyImagePreview} width="300 px" height="200px" className='fluid' />
                </Col>
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
                  onChange={(e) => uploadFileHandler3(e)}
                  accept=".jpg,.jpeg,.png,"
                />
                <Col className='pt-1' style={{ paddingLeft: '2rem' }}>
                  <Image src={imageMentorPreview} width="300 px" height="200px" className='fluid' />
                </Col>
              </Form.Group>
              <Form.Label>FAQ</Form.Label>
              <Col>
                {people.map((p, index) => {
                  return (
                    <div key={p._id}>
                      <Row>
                        <Col>
                          <Form.Group controlId='name' className='pt-1'>
                            <Form.Label>Questions</Form.Label>
                            <Form.Control
                              onChange={e => {
                                const question = e.target.value;
                                setPeople(currentPeople =>
                                  produce(currentPeople, v => {
                                    v[index].question = question;
                                  })
                                );
                              }}
                              value={p.question}
                              placeholder="Question"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId='name' className='pt-3'>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                              onChange={e => {
                                const answer = e.target.value;
                                setPeople(currentPeople =>
                                  produce(currentPeople, v => {
                                    v[index].answer = answer;
                                  })
                                );
                              }}
                              value={p.answer}
                              placeholder="Answer"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col lg={1}>
                          <Button className='mt-5'
                            onClick={() => {
                              setPeople(currentPeople =>
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
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    setPeople(currentPeople => [
                      ...currentPeople,
                      {
                        _id: generate(),
                        question: "",
                      }
                    ]);
                  }}
                >
                  Add new FAQ
                </Button>
                <div className='pt-5'>
                  <Form.Label>WHO IS THIS COURSE FOR</Form.Label>
                  {who && who.map((p, index) => {
                    return (
                      <div key={p._id}>
                        <Row>
                          <Col>
                            <Form.Group controlId='name' className='pt-1'>
                              <Form.Label>Points</Form.Label>
                              <Form.Control
                                onChange={e => {
                                  const description = e.target.value;
                                  setWho(currentPeople =>
                                    produce(currentPeople, v => {
                                      v[index].description = description;
                                    })
                                  );
                                }}
                                value={p.description}
                                placeholder="Question"
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col lg={1}>
                            <Button className='mt-4'
                              onClick={() => {
                                setWho(currentPeople =>
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
                </div>
              </Col>
              <Button
                className='mt-3'
                onClick={() => {
                  setWho(currentPeople => [
                    ...currentPeople,
                    {
                      _id: generate(),
                      question: "",
                    }
                  ]);
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
          <Row className='text-center pt-3'>
            <Col className="d-grid gap-2 mb-5">
              {params.id ?
                <Button type='warning' variant='success' >
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
    </>
  )
}

export default CreateCourseScreen
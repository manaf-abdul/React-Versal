import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Container, Row, Col, Table, Tab, Nav } from 'react-bootstrap'
import { BASEURL } from '../../constants'
import { CartState } from '../../Context';

const CreateOffer = () => {
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

  const navigate = useNavigate()
  const { cart, setCart } = CartState();
  if(!cart || !cart.token){
    navigate('/admin/signin')
  }

  const [name, setName] = useState('')
  const [discount, setDiscount] = useState(0)
  const [category, setCategory] = useState('')
  const [offerslist, setOfferslist] = useState([])
  const [categorieslist, setCategorieslist] = useState([])

  console.log("offerslist", offerslist);

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      const { data } = await Axios.post(`${BASEURL}api/offer`, { name, discount, batch_id: category })
      if (data.errorcode === 0)
        toast.success(`🦄 ${data.msg}!`, successToast);
      else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
      }
      navigate('/admin/offer')
    } catch (error) {
      toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
    }
  }

  const deleteHandler = async (offer, batch) => {
    // console.log("offerId:::",offerId,"        batchId:::",batchId);
    try {
      const { data } = await Axios.post(`${BASEURL}api/offer/${offer}`, { batch })
      if (data.errorcode === 0)
        toast.success(`🦄 ${data.msg}!`, successToast);
      else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
      }
      navigate('/admin/offer')
    } catch (error) {
      toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
    }
  }

  const getDatas = async () => {
    const productData = await Axios.get(`${BASEURL}api/batch`)
    setCategorieslist(productData.data.data)

    const offerData = await Axios.get(`${BASEURL}api/offer`)
    setOfferslist(offerData.data.data)
  }

  useEffect(() => {
    getDatas()
  }, [])



  { console.log("offers1234", offerslist) }
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
            <h1 className="m-0 p-0 text-center square ">Offers</h1>
          </Col>
        </Row>
      </div>
      <Container>
        <ToastContainer />

        {/* <Link to="/admin/dashboard" className="btn btn-light my-3">
          Go Back
        </Link> */}
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column" style={{ cursor: 'pointer' }}>
                <Nav.Item>
                  <Nav.Link eventKey="first" className='font-weight-bold'>Offers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className='font-weight-bold'>Add new offer</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col md={9} className='m-auto'>
                      <h1>Offers</h1>
                      <Table striped bordered hover responsive className='table-sm tableColor'>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Offers</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offerslist.map((x) => (
                            <tr key={x._id}>
                              <td>{x.name}</td>
                              <td>{x.discount}</td>
                              {/* <td>{x.batch?.name ? x.batch.name : x.batch}</td> */}
                              <td>
                                <Button size='sm' className='sm' onClick={() => deleteHandler(x._id, x.batch)}>
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      {/* )} */}
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    <Col md={9} className='m-auto'>
                      <h1>Add new Offer</h1>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                          <Form.Label>Name of the offer</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='discountPercentage'>
                          <Form.Label>Discount</Form.Label>
                          <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                          <Form.Label>Batch</Form.Label>
                          <Form.Control
                            as='select'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categorieslist && categorieslist.map((Categories) => (
                              <option key={Categories._id} value={Categories._id}>
                                {Categories.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                        <Row className='pt-2 ml-auto text-center'>
                          <Button type='submit' variant='primary' className='btn-block test' >
                            Create
                          </Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {/* <Row className='m-auto'>
        <Col md={4} className='m-auto'>
          </Col>
          <Col md={4} className='m-auto'>
            
          </Col>
        </Row> */}
      </Container>
    </>
  )
}

export default CreateOffer
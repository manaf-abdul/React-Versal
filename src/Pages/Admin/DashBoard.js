import React, { useEffect } from 'react'
import { Button, Form, Container, Row, Col, Table, Tab, Nav, Card, Tabs } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { CartState } from '../../Context'

const DashBoard = () => {
  const {cart,setCart}=CartState()
  const redirect=useNavigate()

  useEffect(() => {
    if(!cart || !cart.token){
      redirect('/admin/signin')
    }
  }, [])
  
  return (
    <>
      <div className="p-5 bg-light rounded-3 ">
        <Row>
          <Col lg={3} className='text-center'>
            <Link to="/admin" className="btn btn-light my-3">
              Admin
            </Link>
          </Col>
          <Col lg={6} >
            <h1 className="m-0 p-0 text-center square ">DashBoard</h1>
          </Col>
        </Row>
      </div>

      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title="Sales">
          <Container>
            <Row className="align-items-center justify-content-center pt-3">
              <h1>Sales Overview</h1>
            </Row>
            <Row className="align-items-center justify-content-center pt-3">
              <Col lg={4} md={6} xs={12} className='m-auto'>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Revenue</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Paid</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-danger text-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Unpaid</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Orders</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Paid Orders</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-danger text-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Unpaid Orders</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* <Container>
              <h3 className="text-center pt-4">Monthly Sales</h3>
              <ResponsiveContainer width="75%" height={400} className="m-auto">
                <BarChart data={sample}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                  <Bar dataKey="unpaid" fill="#82ca9d" />
                  <Bar dataKey="paid" fill="#e63d00" />
                </BarChart>
              </ResponsiveContainer>
            </Container>

            <Container>
              <h3 className="text-center pt-4">Quantity Sold</h3>
              <ResponsiveContainer width="75%" height={400} className="m-auto">
                <BarChart data={sample}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                  <Bar dataKey="unpaid" fill="#82ca9d" />
                  <Bar dataKey="paid" fill="#e63d00" />
                </BarChart>
              </ResponsiveContainer>
            </Container> */}

          </Container>
        </Tab>
        <Tab eventKey="profile" title="Courses">
          <Container>
            <Row className="align-items-center justify-content-center pt-3">
              <h2>Course Overview</h2>
            </Row>
            <Row className="align-items-center justify-content-center pt-3">
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Courses</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-center pt-3">
              <Container><h4>Categorywise Course Overview</h4></Container>
            </Row>
            {/* <Row className="align-items-center justify-content-center pt-3">
            {data.categoryReport && data.categoryReport.map((categoryReports) =>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">{categoryReports.category}</Card.Text>
                      <Card.Text as="div">{categoryReports.qty}</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row> */}
          </Container>
        </Tab>
        <Tab eventKey="longer-tab" title="Users">
          <Container>
            <Row className="align-items-center justify-content-center pt-3">
              <h1>Users Overview</h1>
            </Row>
            <Row className="align-items-center justify-content-center pt-3">
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Total Users</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                  <Card.Body>
                    <Card.Text className='text-center'>
                      <Card.Text as="div">Blocked Users</Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="contact" title="Contact">

        </Tab>
      </Tabs>
    </>
  )
}

export default DashBoard
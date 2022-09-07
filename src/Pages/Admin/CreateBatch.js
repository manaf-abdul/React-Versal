import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BASEURL } from '../../constants'
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { Modal } from '@material-ui/core'
import BatchModal from '../../Components/Modals/BatchModal'
import { CartState } from '../../Context'

const CreateBatch = () => {
    const navigate = useNavigate();
    const { cart, setCart } = CartState();
    if (!cart || !cart.token) {
        navigate('/admin/signin')
    }
    const [batches, setBatches] = useState([])
    const [selected,setSelected]=useState({})
    const [batchModalShow, setBatchModalShow] = React.useState(false);

    console.log("selected",selected)

    const getBatchData = async () => {
        const { data } = await Axios.get(`${BASEURL}api/batch`)
        console.log("data",data);
        setBatches(data.data)
    }
    const editHandler=(data)=>{
        setSelected(data)
        setBatchModalShow(true)
    }

    useEffect(() => {
        getBatchData()
    }, [])

    return (
        <>
            <BatchModal
                show={batchModalShow}
                onHide={() => setBatchModalShow(false)}
                batch={selected}
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
                        <h1 className="m-0 p-0 text-center square ">Batch</h1>
                    </Col>
                    <Col lg={3} className='text-center'>
                       <Button variant='primary' size='md' onClick={()=>{
                        setSelected()
                        setBatchModalShow(true)}}>Add New Batch    </Button>
                    </Col>
                </Row>
            </div>
            <Container>
                <h1 className="m-0 p-0 text-center square pb-4">Batch Details</h1>
                <Table striped bordered hover responsive className='table-sm tableColor'>
                    <thead>
                        <tr className='text-center'>
                            <th>Course</th>
                            <th>Batch Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Capacity</th>
                            <th>Students Enrolled</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches && batches.map(batch => (
                            <tr key={batch?._id} className='text-center'>
                                <td>{batch?.course?.name}</td>
                                <td>{batch?.name}</td>
                                <td>{batch?.startDate}</td>
                                <td>{batch?.endDate}</td>
                                <td>{batch?.totalStudentsLimit}</td>
                                <td>{batch?.studentsEnrolled?.length}</td>
                                <td>{batch?.price}</td>
                                <td>{batch?.discountPrice === 0 ? "No Discount" : batch?.discountPrice}</td>
                                {/* <td><a href={`mailto:${user.email}`}>{user.email}</a></td> */}
                                {/* <td>{user.isAdmin ? (<i className="fas fa-check" style={{ color: 'green' }}></i>) : (<i className="fas fa-times" style={{ color: 'red' }}></i>)}</td> */}
                                <td>
                                    {/* <LinkContainer to={`/admin/users`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer> */}

                                    <Button variant='warning' className='btn-sm' onClick={(e)=>editHandler(batch)}><EditIcon/>Edit</Button>
                                    {/* <Button variant='danger' className='btn-sm' >Block</Button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default CreateBatch
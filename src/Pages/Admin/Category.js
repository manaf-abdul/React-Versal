import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CtaegoryModal from '../../Components/Modals/CtaegoryModal'
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { BASEURL } from '../../constants';
import Axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap';

const Category = () => {
    const [selected, setSelected] = useState()
    const [render, setRender] = useState(false)
    const [categories, setCategories] = useState([])
    const [categoryModalShow, setCategoryModalShow] = useState(false)

    const editHandler = (x) => {
        setCategoryModalShow(true)
        setSelected(x)
    }

    const fetchDatas = async () => {
        const { data } = await Axios.get(`${BASEURL}api/category`)
        setCategories(data.data)
    }

    useEffect(() => {
        if(render)setRender(false)
        fetchDatas()
    }, [render])

    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3 ">
                <CtaegoryModal
                    show={categoryModalShow}
                    onHide={() =>  setCategoryModalShow(false)}
                    category={selected}
                    setRender={() => setRender(true)}
                />
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/admin" className="btn btn-light my-3">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                        <h1 className="m-0 p-0 text-center square ">Category</h1>
                    </Col>
                    <Col lg={3} className='text-center'>
                        <Button variant='primary' size='md' onClick={() => {
                            setSelected()
                            setCategoryModalShow(true)
                        }}>Add New Category</Button>
                    </Col>
                </Row>
            </div>
            <Container>
                <h3 className="m-0 p-0 square pb-4">Category Details</h3>
                <Table striped bordered hover responsive className='table-sm tableColor'>
                    <thead>
                        <tr className='text-center'>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.map(category => (
                            <tr key={category._id} className='text-center'>
                                <td>{category.name}</td>
                                <td>{category.status}</td>
                                <td>
                                    {category?.image?.location ? <img src={category?.image?.location} width="100rem" height="100rem"></img>
                                        : "No Image Found"
                                    }
                                </td>
                                <td>{category.description}</td>
                                <td>
                                    {/* <LinkContainer to={`/admin/users`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer> */}
                                    
                                    <Button variant='warning' className='btn-sm' onClick={(e) => editHandler(category)}><EditIcon />Edit</Button>
                                    {/* <Button variant='danger' className='btn-sm' ></Button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Category
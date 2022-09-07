
import React, { forwardRef, useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import MaterialTable from 'material-table'
import { Container, Col, Button, Row, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
// import { Button, Form } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import EnquiryModal from "../../Components/Modals/EnquiryModal"
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from '@material-ui/icons'
import { BASEURL } from '../../constants'
import { CartState } from '../../Context'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const UserList = () => {

    const navigate = useNavigate();
    const { cart, setCart } = CartState();
    if (!cart || !cart.token) {
        navigate('/admin/signin')
    }

    const [users, setUsers] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [selected, setSelected] = useState('')
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (render) setRender(false)
        getData()
    }, [render])

    const getData = async () => {
        const data = await axios.get(`${BASEURL}api/enquiry`)
        console.log(data.data.data)
        setUsers(data.data.data)
    }

    const handleEdit = (e, f) => {
        setSelected(f)
        setModalShow(true)
    }

    const columns = [
        { title: "Name", field: "name", },
        { title: "Mobile", field: "mobile", },
        { title: "Time of Enquiry", field: "createdAt" },
        { title: "Batch Name", field: "batch.name" },
        { title: "Batch Starting", field: "batch.startDate" },
        { title: "Status", field: "status" }
        // { title: "Image", field: "image.url", render: rowData => <a href={`${rowData.image.url}`} target='blank'>Image</a> }
    ]
    return (
        <>
            <EnquiryModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                selected={selected}
                setRender={() => setRender(true)}
            />
            <div className="p-5 mb-4 bg-light rounded-3 ">
                <Row>
                    <Col lg={3} className='text-center'>
                        <Link to="/admin" className="btn btn-light my-3">
                            Go Back
                        </Link>
                    </Col>
                    <Col lg={6} >
                        <h1 className="m-0 p-0 text-center square ">ENQUIRY</h1>
                    </Col>
                </Row>
            </div>
            <Container className='pt-5' style={{zIndex:-1}}>
                {/* <Row>
                    <Col>
                        <h2>Enquiry List</h2>
                    </Col>
                </Row> */}
                <MaterialTable title={'Enquiries'}
                    data={users}
                    columns={columns}
                    icons={tableIcons}
                    options={
                        {
                            actionsColumnIndex: -1,
                            addRowPosition: "first",
                            rowStyle: (rowData) => {
                                return {
                                    // fontFamily: "Mulish-Regular",
                                    fontColor: "white",
                                    backgroundColor: rowData.status === "enquired" ? "#f5d0d0" : rowData.status === "onProcessing" ? "#d0def5" : "#d0f5d7",
                                }
                            },
                        }
                    }
                    // editable={{
                    //   onRowDelete: (oldData) => new Promise((resolve, reject) => {
                    //     console.log(oldData)
                    //     //Backend call
                    //     axios.delete(`/api/users/${oldData._id}`)
                    //       .then(resp => {
                    //         getData()
                    //         resolve()
                    //       })
                    //   })
                    // }}
                    actions={
                        [
                            {
                                icon: EditIcon,
                                tooltip: 'Edit User',
                                onClick: (event, rowData) => {

                                    // Do save operation
                                    handleEdit(event, rowData)
                                }
                            },
                        ]}
                />
            </Container>
        </>
    )
}

export default UserList
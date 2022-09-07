import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MaterialTable from 'material-table'
import Axios from "axios";
import { BASEURL } from '../../constants';
import InfoIcon from '@mui/icons-material/Info';
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

const WorkShopScreen = () => {
    const navigate=useNavigate()

    const getDatas = async () => {
        const { data } = await Axios.get(`${BASEURL}api/workshop`)
        console.log("data", data);
        setData(data.data)
    }
    const [data, setData] = useState([])
    const columns = [
        { title: "Title", field: "title", },
        { title: "Percentage", field: "discountPercentage" },
        // { title: "Published", field: "published" },
        // { title: "Image", field: "image.location", render: rowData => <a href={`${rowData.image.location}`} target='blank'>Image</a> }
    ]
    useEffect(() => {
        getDatas()
    }, [])

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
                            onClick={() =>
                                navigate('/admin/workshop/action')
                            }>
                            Add New Category
                        </Button>
                    </Col>
                </Row>
            </div>
            <Container>
                <div className="align-items-center ml-5">
                    <Row>
                        <Container>
                            <Container className='pt-5'>
                                <MaterialTable title={'Courses'}
                                    data={data}
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
                                                    // backgroundColor: rowData.published ? "#d0f5d7" : "#f5d0d0",
                                                }
                                            },
                                        }
                                    }
                                    editable={{
                                        onRowDelete: (oldData) =>
                                            new Promise((resolve, reject) => {
                                                console.log("oldData", oldData)
                                                //Backend call
                                                Axios.delete(`${BASEURL}api/course/${oldData._id}`)
                                                    .then(resp => {
                                                        // getData(resp)
                                                        resolve()
                                                    })
                                            })
                                    }}
                                    actions={
                                        [
                                            {
                                                icon: InfoIcon,
                                                tooltip: 'Course Details',
                                                onClick: (event, rowData) => {
                                                    // navigate(`/instructor/course/view/${rowData._id}`)
                                                }
                                            },
                                        ]}
                                />
                            </Container>
                        </Container>
                    </Row>
                </div>

            </Container>
        </>
    )
}

export default WorkShopScreen
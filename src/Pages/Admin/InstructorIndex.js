import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "antd";
import { BASEURL } from "../../constants";
import MaterialTable from 'material-table'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import UserList from "./Enquiry";

import InfoIcon from '@mui/icons-material/Info';

import { CartState } from "../../Context";
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

const InstructorIndex = () => {
  const navigate = useNavigate()
  const { cart, setCart } = CartState();
  const [courses, setCourses] = useState([]);
  if (!cart || !cart.token) {
    navigate('/admin/signin')
  }
  const [modalShow, setModalShow] = React.useState(false);
  const [publish, setPublish] = React.useState(false);
  const [id, setId] = useState('');
  const [admin, setAdmin] = React.useState(true);
  const [render, setRender] = React.useState(false);

  const loadCourses = async () => {
    const { data } = await axios.get(`${BASEURL}api/course`);
    setCourses(data.data);
  };

  const handleEdit = (e, f) => {
    // setSelected(f)
    // setModalShow(true)
  }

  console.log("courses", courses);

  const showModal = async (id) => {
    setId(id)
    setModalShow(true)
  }

  const getData = (x) => {
    if (x.data.errorcode === 0) {
      toast.success(`🦄 ${x.data.msg}!`, successToast);
      setModalShow(false)
      setRender(true)
    } else {
      toast.warn(`🦄 ${x.data.msg}!`, warningToast);
      setModalShow(false)
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(`${BASEURL}api/course/${id}`);
      if (data.errorcode === 0) {
        toast.success(`🦄 ${data.msg}!`, successToast);
        setModalShow(false)
        setRender(true)
      } else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
        setModalShow(false)
      }
    } catch (error) {
      toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
      setModalShow(false)
    }
  }


  const publishHandler = async () => {
    // try {
    //   const { data } = await axios.delete(`${BASEURL}api/course/${id}`);
    //   if (data.errorcode === 0) {
    //     toast.success(`🦄 ${data.msg}!`, successToast);
    //     setModalShow(false)
    //   } else {
    //     toast.warn(`🦄 ${data.msg}!`, warningToast);
    //     setModalShow(false)
    //   }
    // } catch (error) {
    //   toast.error(`🦄 ${error.response.data.msg}!`, errorToast);
    //   setModalShow(false)
    // }
  }


  useEffect(() => {
    if (render) setRender(false)
    loadCourses();
  }, [render]);

  const columns = [
    { title: "Name", field: "name", },
    { title: "Category", field: "category.name" },
    { title: "Published", field: "published" },
    // { title: "Image", field: "image.location", render: rowData => <a href={`${rowData.image.location}`} target='blank'>Image</a> }
  ]

  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3 ">
        <Row>
          <Col lg={3} className='text-center'>
            {
              admin ? <Link to="/admin" className="btn btn-light my-3">
                Go Back
              </Link>
                :
                ""
            }
          </Col>
          <Col lg={6} >
            <h1 className="m-0 p-0 text-center square ">Instructor Dashboard</h1>
          </Col>
          <Col lg={3} >
            <Button className="ml-5" onClick={() => navigate('/instructor/create')}>Add Course</Button>
          </Col>
        </Row>
      </div>
      <Container>
        <ToastContainer />

        <ConfirmModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          deleteHandler={() => deleteHandler()}
          publishHandler={() => publishHandler()}
          publish={publish}
        />
        <div className="align-items-center ml-5">
          <Row>
            <Container>
              {/* {courses &&
                courses.map((course) => (
                 
                    <Col key={course._id} className="media pt-5 pr-0" sm={12}>
                      <Avatar
                        size={80}
                        src={course.image ? course.image.Location : "/course.png"}
                      />

                      <div className="media-body pl-2">
                        <div className="row">
                          <div className="col">
                            <Link
                              to={`/instructor/course/view/${course._id}`}
                              className="pointer"
                            >
                              <div className="mt-2 text-primary">
                                <h5 className="pt-2">{course.name}</h5>
                              </div>
                              <img src={course.image?.location} height="100px" width="100px" className="fluid"></img>

                            </Link>
                            <p style={{ marginTop: "1px" }}>
                              {course.lessons.length} Lessons
                            </p>

                            {course.lessons.length < 5 ? (
                              <p style={myStyle} className="text-warning">
                                At least 5 lessons are required to publish a course
                              </p>
                            ) : course.published ? (
                              <p style={myStyle} className="text-success">
                                Your course is live in the marketplace
                              </p>
                            ) : (
                              <p style={myStyle} className="text-success">
                                Your course is ready to be published
                              </p>
                            )}
                          </div>
                          <div className="col pt-3">
                            <Button variant="warning" size="sm">Edit</Button>
                            <Button variant="success" size="sm" onClick={() => {
                        showModal(course._id)
                        setPublish(true)
                        }}>Publish</Button>
                            <Button variant="danger" size="sm" onClick={() => showModal(course._id)}>Delete</Button>
                          </div>

                          <div className="col-md-3 mt-3 text-center">
                            {course.published ? (
                      <div>
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </div>
                    ) : ( 
                      <div>
                        <CloseCircleOutlined className="h5 pointer text-warning" />
                      </div>
                    )}
                          </div>
                        </div>
                      </div>
                    </Col>
                ))} */}
              <Container className='pt-5'>
                {/* <Row>
                    <Col>
                        <h2>Enquiry List</h2>
                    </Col>
                </Row> */}
                <MaterialTable title={'Courses'}
                  data={courses}
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
                          backgroundColor: rowData.published ? "#d0f5d7" : "#f5d0d0",
                        }
                      },
                    }
                  }
                  editable={{
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        console.log("oldData", oldData)
                        //Backend call
                        axios.delete(`${BASEURL}api/course/${oldData._id}`)
                          .then(resp => {
                            getData(resp)
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
                          navigate(`/instructor/course/view/${rowData._id}`)
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
  );
};

export default InstructorIndex;

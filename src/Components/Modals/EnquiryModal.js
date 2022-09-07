import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { BASEURL } from '../../constants';
import { errorToast, successToast, warningToast } from '../../Constants/Toast';

const ConfirmModal = (props) => {

    const [state, setState] = useState('')
    const editHandler = async (selected) => {
        if (!state) {
            toast.error('ⓓ Please select the enquiry status!', errorToast);
        } else {
            try {
                const { data } = await axios.post(`${BASEURL}api/enquiry/${selected._id}`, { status: state })
                if (data.errorcode === 0) {
                    toast.success(`ⓓ ${data.msg}!`, successToast);
                    console.log("props.course", props.course)
                    props.setRender(true)
                    props.onHide()
                } else {
                    toast.warn(`ⓓ ${data.msg}!`, warningToast);
                }
            }
            catch (error) {
                toast.error(`ⓓ ${error.response.data.msg}!`, errorToast);
            }
        }
    }
    useEffect(() => {
        // if (props) {
        //     setState(props.selected._id)
        // }
    }, [props.render])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Enquiry
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to update the Enquiry ? </h4>
                <Row>
                    <Col xs={10} lg={10} xl={10}>
                        <Form.Group controlId='name'>

                            <Form.Control
                                as='select'
                                placeholder='Select the Enquiry'
                                // value={state}
                                onChange={(e) => {
                                    setState(e.target.value)
                                }
                                }
                            >
                                <option key='1' value='enquired'>
                                    Enquired
                                </option>
                                <option key='2' value='onProcessing'>
                                    OnProcessing
                                </option>
                                <option key='3' value='completed'>
                                    Completed
                                </option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer className='align-items-center'>
                <Button onClick={() => editHandler(props.selected)} variant="danger" size="md">Yes</Button>
                <Button onClick={props.onHide} variant="success" size="md">No</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal
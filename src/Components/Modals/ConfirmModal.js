import React from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.lesson ? <h4>Are you sure you want to delete the lesson ? </h4> :
                    props.publish ? <h4>Do you want to publish the course ?</h4> :
                        props.blg ? <h4>Are you sure you want to delete the Blog ?</h4> :
                            <h4>Are you sure you want to delete the Blog ?</h4>
                }

            </Modal.Body>
            <Modal.Footer className='align-items-center'>
                {props.publish ?
                    <>
                        <Button onClick={props.publishHandler} variant="success" size="md">Yes</Button>
                        <Button onClick={props.onHide} variant="danger" size="md">No</Button>
                    </>
                    : (<>
                        <Button onClick={props.deleteHandler} variant="danger" size="md">Yes</Button>
                        <Button onClick={props.onHide} variant="success" size="md">No</Button>
                    </>
                    )
                }
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal
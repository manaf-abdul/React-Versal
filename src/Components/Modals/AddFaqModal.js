import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Image, FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { produce } from "immer";
import { generate } from "shortid";
import { BASEURL } from '../../constants';

const ConfirmModal = (props) => {
    console.log("props",props);
    const [people, setPeople] = useState([]);

    const submitHandler=async(e)=>{
        e.preventDefault()
        console.log(people,"people")
        const {data}=await Axios.post(`${BASEURL}api/course/faq/${props.course}`,{people})
        console.log("data",data)
    }

    useEffect(async() => {
        if(props?.course){
            console.log("11111111111");
            const { data } = await Axios.get(`${BASEURL}api/course/${props.course}`)
            console.log("data data.data.faq",data.data.faq)
            setPeople(data.data.faq)
        }
    }, [props])
    

    return (
        <>
            <ToastContainer />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Button
                            onClick={() => {
                                setPeople(currentPeople => [
                                    ...currentPeople,
                                    {
                                        _id: generate(),
                                        question: "",
                                        answer: ""
                                    }
                                ]);
                            }}
                        >
                            Add new FAQ
                        </Button>
                    </Modal.Title>
                </Modal.Header>

                <Form >
                    <Modal.Body>
                        {people && people.length === 0 ? <p>Click on add New Faq to add new faqs</p> : ""}
                        <Row>
                            <Col>
                                {people.map((p, index) => {
                                    return (
                                        <div key={p._id}>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId='name' className='pt-3'>
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
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className='align-items-center'>
                        <Button onClick={(e) => submitHandler(e)} type='submit' variant="success" size="md">Create</Button>
                        <Button onClick={props.onHide} variant='primary' size="md">Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ConfirmModal
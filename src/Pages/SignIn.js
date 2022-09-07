// import { Button, Checkbox, Form, Input } from 'antd';
import { Form, Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import Axios from "axios"
import { BASEURL } from '../constants';
import FormContainer from '../Components/Forms/FormContainer'
import { Card, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { errorToast, successToast, warningToast } from '../Constants/Toast'
import { CartState } from '../Context';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const redirect=useNavigate()
    const { cart, setCart } = CartState();
    if(cart.token){
        redirect('/admin')
    }
    const navigate=useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onChanges = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (user.password.length < 6) {
            toast.error(`ⓓ password should be more than 6 characters long`, errorToast);
        } else {
            try {
                const { data } = await Axios.post(`${BASEURL}api/admin/signin`, { user })
                if (data.errorcode === 0) {
                    toast.success(` ${data.msg}!`, successToast);
                    setCart(data.data)
                    navigate(`/admin`)
                    // console.log("props.course",props.course)

                } else {
                    toast.warn(`ⓓ ${data.msg}!`, warningToast);
                }
            } catch (error) {
                toast.error(`ⓓ ${error.response.data.msg}!`, errorToast);
            }

        }
    }
    // useEffect(() => {
     
    // }, [])
    

    return (
        <FormContainer>
            <Card className='p-5 mt-5'>
                <Card.Header><h3 className='text-center'>Sign In</h3></Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='pb-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                name="email"
                                onChange={onChanges}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='discountPercentage'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='Password'
                                placeholder='Enter Passowrd'
                                name="password"
                                onChange={onChanges}
                            ></Form.Control>
                        </Form.Group>

                        <Row className='pt-2 ml-auto text-center'>
                            <Button type='submit' variant='primary' className='btn-block test' >
                                SignIn
                            </Button>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    );
};

export default SignIn;
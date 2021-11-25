import React, { useState, useReducer } from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import axios from 'axios'


const formReducer = (state, event) => {
    return {
        ...state,
        [event.name] : event.value
    }
}

function SignUp(){
    const [formData, setFormData] = useReducer(formReducer)
    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:3000/users', {
            username: formData.username,
            email: formData.email
        }).catch(err => console.log(err))

        setValidated(true)
        console.log(`The name you entered was: ${formData.username}`)
        console.log(`The email you entered was: ${formData.email}`)
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        })
    }

    return(
        <Container>
            <Form
            noValidate 
            validated={validated}
            onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            name="username"
                            placeholder="Name"
                            onChange={handleChange}
                            required
                            />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please type a username.
                        </Form.Control.Feedback>
                    
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="Enter email" 
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please type an email.
                        </Form.Control.Feedback>
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit"
                    >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default SignUp

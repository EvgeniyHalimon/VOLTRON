import React, { useState, useReducer } from 'react';
import {Form, Button, Container} from 'react-bootstrap'


const formReducer = (state, event) => {
    return {
        ...state,
        [event.name] : event.value
    }
}

function SignIn(){
    const [formData, setFormData] = useReducer(formReducer)
    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setValidated(true)
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

                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Type password" 
                        onChange={handleChange}
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please type a password.
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

export default SignIn

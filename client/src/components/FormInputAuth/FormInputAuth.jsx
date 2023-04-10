import React from "react";
import { Form } from "react-bootstrap";

const FromInputAuth = ({id, text, type, name, placeholder, value, callback}) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label>{text}</Form.Label>
            <Form.Control 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={e => callback(e)}
            />
            <Form.Text style={{display: 'none'}}></Form.Text>
        </Form.Group>
    )
}

export default FromInputAuth;
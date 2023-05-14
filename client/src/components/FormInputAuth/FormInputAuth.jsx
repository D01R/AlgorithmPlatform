import React from "react";
import { Form } from "react-bootstrap";
import './FormInputAuth.scss';

const FromInputAuth = ({id, text, type, name, placeholder, value, callback}) => {
    return (
        <Form.Group controlId={id} className="form-input">
            <Form.Label className="form-input__label">{text}</Form.Label>
            <Form.Control 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={e => callback(e)}
                className="form-input__control"
            />
            <Form.Text style={{display: 'none'}}></Form.Text>
        </Form.Group>
    )
}

export default FromInputAuth;
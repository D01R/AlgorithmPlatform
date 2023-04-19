import React from "react";
import { Dropdown, Form } from "react-bootstrap";


const FormDropdownAuth = ({id, toggleText, text, value, enums, paramChange, callback}) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label>{text}</Form.Label>
            <Dropdown>
                <Dropdown.Toggle>{value == ''? toggleText: enums.filter(i => i.value == value)[0].displayName}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {enums.map(i =>
                        <Dropdown.Item key={i.value} onClick={(e) => callback(paramChange, i.value)}>{i.displayName}</Dropdown.Item>    
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Text style={{display: 'none'}}></Form.Text>
        </Form.Group>
    )
}

export default FormDropdownAuth;
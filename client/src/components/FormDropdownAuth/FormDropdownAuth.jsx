import React from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./FormDropdownAuth.scss";


const FormDropdownAuth = ({id, toggleText, text, value, enums, paramChange, callback}) => {
    return (
        <Form.Group controlId={id} className="form-dropdown">
            <Form.Label className="form-dropdown__title">{text}</Form.Label>
            <Dropdown>
                <Dropdown.Toggle className="form-dropdown__control">{value == ''? toggleText: enums.filter(i => i.value == value)[0].displayName}</Dropdown.Toggle>
                <Dropdown.Menu className="form-dropdown__menu">
                    {enums.map(i =>
                        <Dropdown.Item className="form-dropdown__item" key={i.value} onClick={(e) => callback(paramChange, i.value)}>{i.displayName}</Dropdown.Item>    
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </Form.Group>
    )
}

export default FormDropdownAuth;
import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import FormDropdownAuth from "../../components/FormDropdownAuth/FormDropdownauth";
import { languagesCompiler } from "../../utils/languagesCompiler";
import { useParams } from "react-router-dom";
import { executeScript } from "../../services/compilerAPI";

const CompilerPage = () => {
    const {id} = useParams();
    const [stateForm, setStateForm] = useState({algorithmId: id, language: "", script: ""})

    const onChangeDropDown = (att, value) => {
        setStateForm({...stateForm, [att]: value});
    };
    const onChangeScript = (event) => {
        setStateForm({...stateForm, [event.target.name]: event.target.value});
    };

    const execute = () => {
        try{
            if (stateForm.language === '') {
                alert('Пожалуйста, выберите язык');
                return;
            }

            setStateForm({...stateForm, script: stateForm.script.replace(/\n/g,'\r\n')});

            executeScript(stateForm).then( data => document.getElementById('console-output').value = data.data.output);
        } catch(e){
            alert(e.response.data.message);
        }
    };

    return(
        <Container>
            <h1>Компилятор</h1>
            <Row>
                <Col md={6}>
                    <Form.Control
                        as="textarea"
                        placeholder="Массив хранится в переменной arr"
                        name="script"
                        value={stateForm.script}
                        onChange={e => onChangeScript(e)}
                        style={{height: '400px', resize: 'none'}}
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        id="console-output"
                        as="textarea"
                        placeholder="Результат..."
                        style={{height: '400px', resize: 'none'}}
                        readOnly={false}
                        tabIndex={-1}
                    />
                </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
                <FormDropdownAuth id='languageScript' toggleText='Язык...' text='Язык' value={stateForm.language} enums={languagesCompiler} paramChange='language' callback={onChangeDropDown}/>
                <Button className="ms-3" onClick={() => execute()}>
                    Запустить
                </Button>
                <Button className="ms-3">
                    Сохранить
                </Button>
            </div>
            <h2>Описание алгоритма</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt perferendis cupiditate soluta ducimus quae. Deleniti magnam fuga, ea voluptate nesciunt, blanditiis ipsum voluptates, qui fugiat reiciendis nostrum harum magni molestias. Inventore, recusandae?</p>
        </Container>
    )
}

export default CompilerPage;
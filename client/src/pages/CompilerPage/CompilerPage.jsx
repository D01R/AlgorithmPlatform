import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import FormDropdownAuth from "../../components/FormDropdownAuth/FormDropdownauth";
import { languagesCompiler } from "../../utils/languagesCompiler";
import { useParams } from "react-router-dom";
import { executeScript } from "../../services/compilerAPI";
import algorithms from "../../utils/algorithms";
import "./CompilerPage.scss";

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
        <Container className="compiler">
            <h1 className="compiler__title">Компилятор</h1>
            <Row>
                <Col md={6}>
                    <Form.Control
                        as="textarea"
                        placeholder="Массив хранится в переменной arr"
                        name="script"
                        value={stateForm.script}
                        onChange={e => onChangeScript(e)}
                        style={{height: '400px', resize: 'none'}}
                        className="compiler__script"
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        id="console-output"
                        as="textarea"
                        placeholder="Результат..."
                        style={{height: '400px', resize: 'none'}}
                        readOnly={true}
                        tabIndex={-1}
                        className="compiler__result"
                    />
                </Col>
            </Row>
            <div className="compiler__control">
                <FormDropdownAuth id='languageScript' toggleText='Язык...' text='Язык' value={stateForm.language} enums={languagesCompiler} paramChange='language' callback={onChangeDropDown}/>
                <div>
                    <Button className="ms-3 compiler__btn" onClick={() => execute()}>
                        Запустить
                    </Button>
                    <Button className="ms-3 compiler__btn">
                        Сохранить
                    </Button>
                </div>
            </div>
            <h2 className="compiler__description-title">Описание алгоритма</h2>
            <p  className="compiler__description-content">{algorithms[id].description}</p>
        </Container>
    )
}

export default CompilerPage;
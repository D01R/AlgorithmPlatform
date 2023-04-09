import React, { useContext, useState } from 'react';
import { Button, Card, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../../services/userAPI';
import { roleEnum } from '../../utils/roleEnum';

const AuthPage = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const navigate = useNavigate();

    const [stateForm,setStateForm] = useState({login: '', password: ''});
    const [stateRegForm, setStateRegForm] = useState({mail: '', role: '', name: '', surname: '', universityId: 1,});
    // const [stateRegForm, setStateRegForm] = useState({mail: '', role: '', name: '', surname: '', universityId: '',});

    const onChange = (event) => {
        setStateForm({...stateForm, [event.target.name]: event.target.value});
    }
    const onChangeReg = (event) => {
        setStateRegForm({...stateRegForm, [event.target.name]: event.target.value});
    }
    const onChangeDropDown = (att, value) => {
        setStateRegForm({...stateRegForm, [att]: value});
    };

    const sendForm = async() => {
        try{
            let data;
            if (isLogin) {
                data = await login(stateForm);
            } else {
                data = await registration({...stateForm, ...stateRegForm});
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        } catch(e){
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight}}
        >
            <Card style={{width: 600}} className='5-p'>
                <h2>{isLogin? "Авторизация": "Регистрация"}</h2>
                <Form>
                    <Form.Group controlId='formLogin'>
                        <Form.Label>{isLogin? "Введите login или email": "Введите login"}</Form.Label>
                        <Form.Control 
                            name="login"
                            placeholder="Login..."
                            value={stateForm.login}
                            onChange={e => onChange(e)}
                        />
                        <Form.Text style={{display: 'none'}}></Form.Text>
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Label>Введите пароль</Form.Label>
                        <Form.Control 
                            type='password'
                            name="password"
                            placeholder="Password..."
                            value={stateForm.password}
                            onChange={e => onChange(e)}
                        />
                        <Form.Text style={{display: 'none'}}></Form.Text>
                    </Form.Group>
                    {!isLogin?
                        <>
                            <Form.Group controlId='formMail'>
                                <Form.Label>Введите почту</Form.Label>
                                <Form.Control 
                                    name="mail"
                                    placeholder="Mail..."
                                    value={stateRegForm.mail}
                                    onChange={e => onChangeReg(e)}
                                />
                                <Form.Text style={{display: 'none'}}></Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formRole'>
                                <Form.Label>Введите роль</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle>{stateRegForm.role == ''? 'Роль...': roleEnum.filter(i => i.value == stateRegForm.role)[0].displayName}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {roleEnum.map(role =>
                                            <Dropdown.Item key={role.value} onClick={(e) => onChangeDropDown('role', role.value)}>{role.displayName}</Dropdown.Item>    
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Text style={{display: 'none'}}></Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formName'>
                                <Form.Label>Введите имя</Form.Label>
                                <Form.Control 
                                    name="name"
                                    placeholder="Name..."
                                    value={stateRegForm.name}
                                    onChange={e => onChangeReg(e)}
                                />
                                <Form.Text style={{display: 'none'}}></Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formSurname'>
                                <Form.Label>Введите фамилию</Form.Label>
                                <Form.Control 
                                    name="surname"
                                    placeholder="Surname..."
                                    value={stateRegForm.surname}
                                    onChange={e => onChangeReg(e)}
                                />
                                <Form.Text style={{display: 'none'}}></Form.Text>
                            </Form.Group>
                        </>
                        :
                        <></>
                    }
                    <Row className='d-flex justify-content-between mt-3 p-3'>
                        {isLogin ? 
                            <div style={{width:'fit-content', padding: 0}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                            </div>
                            :
                            <div style={{width:'fit-content', padding: 0}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>    
                        }
                        <Button style={{width:'fit-content'}} variant={'outline-success'} onClick={sendForm}>
                            {isLogin? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default AuthPage;
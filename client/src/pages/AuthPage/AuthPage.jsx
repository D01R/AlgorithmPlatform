import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../../services/userAPI';
import { roleEnum } from '../../utils/roleEnum';
import FormInputAuth from '../../components/FormInputAuth/FormInputAuth';
import FormDropdownAuth from '../../components/FormDropdownAuth/FormDropdownauth';

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
                    <FormInputAuth id='formLogin' text={isLogin? "Введите login или email": "Введите login"} type='text' name="login" placeholder="Login..." value={stateForm.login} callback={onChange}/>
                    <FormInputAuth id='formPassword' text='Введите пароль' type='password' name="password" placeholder="Password..." value={stateForm.password} callback={onChange}/>
                    
                    {!isLogin?
                        <>
                            <FormInputAuth id='formMail' text='Введите почту' type='text' name="mail" placeholder="Mail..." value={stateForm.mail} callback={onChangeReg}/>
                            <FormDropdownAuth id='formRole' toggleText='Роль...' text='Введите роль' value={stateRegForm.role} enums={roleEnum} paramChange='role' callback={onChangeDropDown}/>
                            <FormInputAuth id='formName' text='Введите имя' type='text' name="name" placeholder="Name..." value={stateForm.name} callback={onChangeReg}/>
                            <FormInputAuth id='formSurname' text='Введите фамилию' type='text' name="surname" placeholder="Surname..." value={stateForm.surname} callback={onChangeReg}/>
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
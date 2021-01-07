import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Login } from '../api/auth/AuthService';

const LoginForm = () => {

	const { register, handleSubmit } = useForm<UserForm>();
	const history = useHistory();

	const onSubmit = async (data: LoginFormDTO) => {
		const response = await Login(data);
		if (response.ok) {
			history.push('/dashboard');
		} else {
			alert('아이디/비빌번호가 맞지 않습니다');
		}
	};

	return (
		<div className="container">
			<div className="registration-box">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="username">
						<Form.Label>아이디</Form.Label>
						<Form.Control type="text" placeholder="아이디를 입력하세요" name="username" maxLength={50} ref={register}/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>비밀번호</Form.Label>
						<Form.Control type="password" placeholder="비밀번호를 입력하세요" name="password" maxLength={50} ref={register}/>
					</Form.Group>
					<div className="right-align">
						<Button onClick={() => history.push('/newTeacher')} style={{float: 'left'}}>선생님 등록</Button>
						<Button type="submit" className="submit-button" style={{float: 'right'}}>로그인</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
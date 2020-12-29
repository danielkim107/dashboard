import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../utils/AuthService';

const LoginForm = () => {

	const { register, handleSubmit } = useForm<UserForm>();
	const history = useHistory();
	const authService = new AuthService();

	const onSubmit = (data: UserForm) => {
		fetch(`http://localhost:4000/auth`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => {
				if (response.status === 200) {
					return response.json();
				} else {
					return alert('Incorrect username and/or password.');
				}
			}).then((result) => {
				if (result) {
					authService.login(result.user);
					history.push('/dashboard');
				}
			})
	};

	return (
		<div className="container">
			<div className="registration-box">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="author">
						<Form.Label>아이디</Form.Label>
						<Form.Control type="text" placeholder="아이디를 입력하세요" name="username" maxLength={50} ref={register}/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>비밀번호</Form.Label>
						<Form.Control type="password" placeholder="비밀번호를 입력하세요" name="password" maxLength={50} ref={register}/>
					</Form.Group>
					<div className="right-align">
						<Button type="submit" className="submit-button" style={{float: 'right'}}>Submit</Button>
						<Button onClick={() => history.push('/user/newUser')} style={{float: 'left'}}>신규 유저</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
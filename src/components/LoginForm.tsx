import React from 'react';
import * as Cookies from 'js-cookie';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {

	const { register, handleSubmit } = useForm<UserForm>();
	const history = useHistory();

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
					alert('Incorrect username and/or password.');
				}
			}).then((result) => {
				Cookies.set('user', result.user);
				Cookies.set('loggedIn', 'true');
				history.push('/');
			})
	};
	return (
		<div className="container">
			<div className="login-box">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="author">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Username" name="username" maxLength={50} ref={register}/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="text" placeholder="Password" name="password" maxLength={50} ref={register}/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
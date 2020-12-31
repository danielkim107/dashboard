import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const UserForm = () => {
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm<UserForm>();

	const onSubmit = (data: UserForm) => {
		let method = 'POST';
		let url = 'http://localhost:4000/api/user';
		fetch(url, {
			method: method,
			mode: 'cors',
			cache: 'no-cache',
			headers: {
			  'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data)
		}).then(response => {
			if (response.ok) {
				alert('유저 생성 완료');
			} else {
				alert('실패');
			}
		}).finally(() => {
			history.push('/login');
		});
	};

	return (
		<div className="container">
			<div className="registration-box">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="author">
						<Form.Label>아이디</Form.Label>
						<Form.Control type="text" placeholder="아이디를 입력하세요" name="username" maxLength={50} ref={register({required: true})}/>
						{errors.username && errors.username.type === "required" && (
							<Form.Text className="text-danger">
								You must enter a username.
							</Form.Text>
						)}
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>비밀번호</Form.Label>
						<Form.Control type="password" placeholder="비밀번호를 입력하세요" name="password" maxLength={50} ref={register({required: true})}/>
						{errors.password && errors.password.type === "required" && (
							<Form.Text className="text-danger">
								You must enter a password.
							</Form.Text>
						)}
					</Form.Group>
					<Button variant="primary" type="submit">
						생성
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default UserForm;
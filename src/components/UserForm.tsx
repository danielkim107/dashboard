import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

const UserForm = () => {
	const history = useHistory();
	const params: Param  = useParams();
	const { register, handleSubmit, errors } = useForm<UserForm>();

	const onSubmit = (data: UserForm) => {
		let method = 'POST';
		let url = 'http://localhost:4000/user';
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
			history.push('/dashboard');
		});
	};

	const deleteEntry = (id: string) => {
		fetch(`http://localhost:4000/user/${params.id}`, {
			method: 'DELETE',
			mode: 'cors'
		}).then(response => {
			if (response.ok && response.status === 204) {
				alert('삭제 완료');
				history.push('/dashboard');
			} else {
				alert('삭제 실패');
			}
		});
	}

	return (
		<div className="container">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="author">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Username" name="username" maxLength={50} ref={register({required: true})}/>
					{errors.username && errors.username.type === "required" && (
						<Form.Text className="text-danger">
							You must enter a username.
						</Form.Text>
        			)}
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="text" placeholder="Password" name="password" maxLength={50} ref={register({required: true})}/>
					{errors.password && errors.password.type === "required" && (
						<Form.Text className="text-danger">
							You must enter a password.
						</Form.Text>
        			)}
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
				{params.id && (<Button variant="danger" className="delete-button" onClick={() => deleteEntry(params.id)}>Delete</Button>)}
			</Form>
		</div>
	);
}

export default UserForm;
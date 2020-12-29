import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { AuthService } from '../utils/AuthService';

const EntryForm = () => {
	const history = useHistory();
	const params: Param  = useParams();
	const { register, handleSubmit, errors, reset } = useForm<EntryForm>();
	const [ userId, setUserId ] = useState();
	const authService = new AuthService();

	useEffect(() => {
		if (authService.checkLogin()) {
			if (params && params.id !== 'newEntry') {
				fetch(`http://localhost:4000/entry/${params.id}`, {
					method: 'GET',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
					return response.json();
				}).then(result => {
					if (Object.keys(result).length === 0) {
						alert('존재하지 않아, 접근할 수 없습니다.');
						history.push('/dashboard');
					} else {
						reset(result);
						setUserId(result.userId);
					}
				})
			}
		} else {
			alert('로그인이 되어 있지 않습니다. 로그인 해주세요.');
			history.push('/login');
		}
	}, []);

	const onSubmit = (data: EntryForm) => {
		let body:any = data;
		body.userId = authService.getUser().id;
		let method = 'POST';
		let url = 'http://localhost:4000/entry';
		if (params && params.id !== 'newEntry') {
			method = 'PUT';
			url = url.concat(`/${params.id}`);
		}
		fetch(url, {
			method: method,
			mode: 'cors',
			cache: 'no-cache',
			headers: {
			  'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(body)
		}).then(response => {
			if (response.ok) {
				alert('계시글 생성 완료');
			} else {
				alert('실패');
			}
		}).finally(() => {
			history.push('/dashboard');
		});
	};

	const checkUser = () => {
		if (params.id !== 'newEntry') {
			return authService.getUser().id	!== userId;
		} else {
			return false;
		}
	}

	return (
		<div className="container">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="title">
					<Form.Label>제목</Form.Label>
					<Form.Control type="text" placeholder="제목" name="title" maxLength={50} ref={register({required: true})} readOnly={checkUser()}/>
					{errors.title && errors.title.type === "required" && (
						<Form.Text className="text-danger">
							You must enter the title.
						</Form.Text>
        			)}
				</Form.Group>
				<Form.Group controlId="content">
					<Form.Label>내용</Form.Label>
					<Form.Control type="text" as="textarea" rows={6} placeholder="내용" name="content" maxLength={500} ref={register({required: true})} readOnly={checkUser()}/>
					{errors.content && errors.content.type === "required" && (
						<Form.Text className="text-danger">
							You must enter some content.
						</Form.Text>
        			)}
				</Form.Group>
				{(!checkUser() || params.id === 'newEntry') && (
					<Button variant="primary" type="submit">
						Submit
					</Button>
				)}
			</Form>
		</div>
	);
}

export default EntryForm;
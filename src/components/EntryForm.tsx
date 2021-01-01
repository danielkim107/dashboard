/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { AuthService } from '../api/AuthService';
import { CreateEntry, GetEntryById, UpdateEntry } from '../api/EntryService';

const EntryForm = () => {
	const history = useHistory();
	const params: Param  = useParams();
	const { register, handleSubmit, errors, reset } = useForm<EntryForm>();
	const [ userId, setUserId ] = useState(0);
	const authService = new AuthService();

	useEffect(() => {
		const getEntryById = async () => {
			await reload();
		};
		if (authService.checkLogin()) {
			if (params && params.id !== 'newEntry') {
				getEntryById();
			}
		} else {
			alert('로그인이 되어 있지 않습니다. 로그인 해주세요.');
			history.push('/login');
		}
	}, []);

	const onSubmit = async (data: EntryForm) => {
		let result;
		let userId = authService.getUser().id;
		let body: CreateEntryDTO = {...data, userId: userId};
		if (params && params.id !== 'newEntry') {
			result = await UpdateEntry(body, params.id);
		} else {
			result = await CreateEntry(body);
		}
		if (result) {
			alert('계시물 생성');
		}
		history.push('/dashboard');
	};

	const checkUser = () => {
		if (params.id !== 'newEntry') {
			return authService.getUser().id	!== userId;
		} else {
			return false;
		}
	}

	async function reload() {
		const result = await GetEntryById(params.id);
		reset(result);
		setUserId(result.userId);
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
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

const EntryForm = () => {
	const history = useHistory();
	const params: Param  = useParams();
	const { register, handleSubmit, errors, reset } = useForm<EntryForm>();

	useEffect(() => {
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
					history.push('/');
				} else {
					reset(result);
				}
			})
		}
	}, []);

	const onSubmit = (data: EntryForm) => {
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
			body: JSON.stringify(data)
		}).then(response => {
			if (response.ok) {
				alert('계시글 생성 완료');
			} else {
				alert('실패');
			}
		}).finally(() => {
			history.push('/');
		});
	};

	const deleteEntry = (id: string) => {
		fetch(`http://localhost:4000/entry/${params.id}`, {
			method: 'DELETE',
			mode: 'cors'
		}).then(response => {
			if (response.ok && response.status === 204) {
				alert('삭제 완료');
				history.push('/');
			} else {
				alert('삭제 실패');
			}
		});
	}

	return (
		<div className="container">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="author">
					<Form.Label>Author</Form.Label>
					<Form.Control type="text" placeholder="Author" name="author" maxLength={50} ref={register({required: true})}/>
					{errors.author && errors.author.type === "required" && (
						<Form.Text className="text-danger">
							You must enter the author's name.
						</Form.Text>
        			)}
				</Form.Group>
				<Form.Group controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="Title" name="title" maxLength={50} ref={register({required: true})}/>
					{errors.title && errors.title.type === "required" && (
						<Form.Text className="text-danger">
							You must enter the title.
						</Form.Text>
        			)}
				</Form.Group>
				<Form.Group controlId="content">
					<Form.Label>Content</Form.Label>
					<Form.Control type="text" placeholder="Content" name="content" maxLength={500} ref={register({required: true})}/>
					{errors.content && errors.content.type === "required" && (
						<Form.Text className="text-danger">
							You must enter some content.
						</Form.Text>
        			)}
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			{params.id && (<Button variant="danger" onClick={() => deleteEntry(params.id)}>Delete</Button>)}
		</div>
	);
}

export default EntryForm;
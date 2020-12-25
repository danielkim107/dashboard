import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EntryForm = () => {

	let params: Param  = useParams();

	const handleSubmit = (event: any) => {
		console.log(event);
	}

	return (
		<Form onSubmit={() => handleSubmit}>
			<Form.Group controlId="formTitle">
				<Form.Label>제목</Form.Label>
				<Form.Control type="text" placeholder="제목" maxLength={50}/>
				<Form.Text className="text-muted">
					제목 글자 수 남은거 표시하기
				</Form.Text>
			</Form.Group>
			<Form.Group controlId="formContent">
				<Form.Label>내용</Form.Label>
				<Form.Control type="text" placeholder="내용" maxLength={500}/>
				<Form.Text className="text-muted">
					내용 글자 수 남은거 표시하기
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default EntryForm;
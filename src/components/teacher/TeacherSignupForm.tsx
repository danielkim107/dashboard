import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { SignupTeacher } from '../../api/teacher/TeacherService';

const TeacherSignUpForm = () => {
	const history = useHistory();
	const { register, handleSubmit } = useForm<UserForm>();

	const onSubmit = async (data: TeacherSignupFormDTO) => {
		const response = await SignupTeacher(data);
		if (response.ok) {
			alert('선생님 등록!')!
			history.push('/login');
		} else {
			alert('선생님 등록 실패.');
		}
	};

	return (
		<div className="container">
			<div className="registration-box">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="username">
						<Form.Label>아이디</Form.Label>
						<Form.Control type="text" placeholder="아이디를 입력하세요" name="username" maxLength={50} ref={register({required: true})}/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>비밀번호</Form.Label>
						<Form.Control type="password" placeholder="비밀번호를 입력하세요" name="password" maxLength={50} ref={register({required: true})}/>
					</Form.Group>
					<Form.Group controlId="name">
						<Form.Label>이름</Form.Label>
						<Form.Control type="text" placeholder="아이디를 입력하세요" name="name" maxLength={3} ref={register({required: true})}/>
					</Form.Group>
					<Button variant="primary" type="submit">
						등록
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default TeacherSignUpForm;
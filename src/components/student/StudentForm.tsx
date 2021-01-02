import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { CreateStudent, GetStudent, UpdateStudent } from '../../api/student/StudentService';
import { updateStudentFormData, updateStudentResponseData } from '../../utils/StudentHelper';

const StudentForm = () => {
	const history = useHistory();
	const location = useLocation();
	const params: Param = useParams();
	const { register, handleSubmit, reset } = useForm<StudentForm>();

	useEffect(() => {
		const getData = async () => {
			await loadData(params.id);
		}
		getData();
	}, []);

	const onSubmit = async (data: StudentForm) => {
		const updatedData = updateStudentFormData(data);
		let response: Response;
		if (location.pathname === '/newStudent') {
			response = await CreateStudent(updatedData);
		} else {
			response = await UpdateStudent(updatedData, params.id);
		}
		if (response.ok) {
			alert('학생 업데이트 완료.');
			history.push('/dashboard');
		} else {
			alert('학생 업데이트 실패.');
		}
	};

	const loadData = async (id: String) => {
		const data = await GetStudent(id);
		const updatedData = updateStudentResponseData(data);
		reset(updatedData);
	};

	return (
		<div className="container">
			<div className="registration-box">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="name">
						<Form.Label>이름</Form.Label>
						<Form.Control type="text" placeholder="예시) 김정수" name="name" maxLength={3} ref={register({required: true})}/>
					</Form.Group>
					<Form.Group controlId="defaultHour">
						<Form.Label>평균 과외 시간</Form.Label>
						<Form.Control type="number" step={0.1} placeholder="2" name="defaultHour" ref={register({required: true})}/>
					</Form.Group>
					<Form.Group controlId="price">
						<Form.Label>시간 당 가격</Form.Label>
						<Form.Control type="number" placeholder="50000" name="price" ref={register({required: true})}/>
					</Form.Group>
					<Form.Group controlId="tutorDays">
						<Form.Label>평소 과외 하는 날</Form.Label>
						<Form.Control type="text" placeholder="예시) 월수금 / 화목토 / 월화수목금토일" name="tutorDays" ref={register({required: true})}/>
					</Form.Group>
					<Button variant="primary" type="submit">
						생성
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default StudentForm;
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { CreateStudent, GetStudent, UpdateStudent } from '../../api/student/StudentService';
import { convertDaysToNumberDays, convertNumberDaysToDays } from '../../utils/StudentHelper';

const StudentForm = () => {
	const history = useHistory();
	const location = useLocation();
	const params: Param = useParams();
	const { register, handleSubmit, reset } = useForm<StudentForm>();

	useEffect(() => {
		const getStudentData = async () => {
			await loadStudentData(params.id);
		}
		getStudentData();
	}, []);

	const onSubmit = async (data: StudentForm) => {
		const numberTutorDays = convertDaysToNumberDays(data.tutorDays);
		const updatedData = {...data, tutorDays: numberTutorDays, teacherId: parseInt(Cookies.get('teacherId')!)};
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

	const loadStudentData = async (id: string) => {
		const data = await GetStudent(id);
		const stringTutorDays = convertNumberDaysToDays(data.tutorDays);
		const updatedData = {...data, tutorDays: stringTutorDays};
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
					<Form.Group controlId="defaultTimeStart">
						<Form.Label>평소 시작하는 시간</Form.Label>
						<Form.Control type="time" name="defaultTimeStart" ref={register}/>
					</Form.Group>
					<Form.Group controlId="defaultTimeEnd">
						<Form.Label>평소 끝나는 시간</Form.Label>
						<Form.Control type="time" name="defaultTimeEnd" ref={register}/>
					</Form.Group>
					<Form.Group controlId="tutorDays">
						<Form.Label>평소 과외 하는 날</Form.Label>
						<Form.Control type="text" placeholder="예시) 월수금 / 화목토 / 월화수목금토일" name="tutorDays" ref={register}/>
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
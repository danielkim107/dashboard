import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { GetSlotById, GetSlotByIdResponse, UpdateSlot } from '../api/slot/SlotService';
import { explodeSlotData, implodeSlotData } from '../utils/SlotHelper';

const SlotForm = () => {
	const [ studentInfo, setStudentInfo ] = useState<Array<StudentSlotInfo>>([]);
	const [ studentIdList, setStudentIdList ] = useState<Array<number>>([]);
	const params: Param = useParams();
	const { register, handleSubmit, reset } = useForm();

	useEffect(() => {
		const loadFormData = async () => {
			await getData();
		}
		loadFormData();
	}, []);

	const getData = async () => {
		const data: GetSlotByIdResponse = await GetSlotById(params.id);
		setStudentInfo(data.studentInfo);
		const [formData, studentIdList] = explodeSlotData(data);
		setStudentIdList(studentIdList);
		reset(formData);
	};

	const onSubmit = async (formData: any) => {
		const data = implodeSlotData(formData, studentIdList);
		const response = await UpdateSlot(data, params.id);
		if (response.ok) {
			alert('수정 완료.');
			await getData();
		}
	};

	return (
		<div className="container">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="date">
					<Form.Label>날짜</Form.Label>
					<Form.Control type="text" name="date" maxLength={50} ref={register} readOnly/>
				</Form.Group>
				{studentInfo.map((student, index) => {
					let studentHour = `studentHour${student.studentId}`;
					let studentPrice = `studentPrice${student.studentId}`;
					let studentName = `studentName${student.studentId}`;
					let studentStartTime = `studentStartTime${student.studentId}`;
					let studentEndTime = `studentEndTime${student.studentId}`;
					return (
						<Form.Row className="align-items-center" key={student.studentId}>
							<Col sm={2} className="my-1">
								<Form.Label htmlFor={studentName} srOnly={index !== 0}>
									이름
								</Form.Label>
								<Form.Control id={studentName} name={studentName} ref={register} readOnly/>
							</Col>
							<Col sm={2} className="my-1">
								<Form.Label htmlFor={studentHour} srOnly={index !== 0}>
									시간
								</Form.Label>
								<Form.Control type="number" step={0.1} id={studentHour} name={studentHour} ref={register}/>
							</Col>
							<Col sm={2} className="my-1">
								<Form.Label htmlFor={studentPrice} srOnly={index !== 0}>
									가격
								</Form.Label>
								<Form.Control id={studentPrice} name={studentPrice} ref={register}/>
							</Col>
							<Col sm={2} className="my-1">
								<Form.Label htmlFor={studentStartTime} srOnly={index !== 0}>
									시작
								</Form.Label>
								<Form.Control type="time" id={studentStartTime} name={studentStartTime} ref={register}/>
							</Col>
							<Col sm={2} className="my-1">
								<Form.Label htmlFor={studentEndTime} srOnly={index !== 0}>
									종료
								</Form.Label>
								<Form.Control type="time" id={studentEndTime} name={studentEndTime} ref={register}/>
							</Col>
						</Form.Row>
					)
				})}
				<Form.Group controlId="totalAmount">
					<Form.Label>오늘 금액</Form.Label>
					<Form.Control type="number" name="totalAmount" readOnly ref={register}/>
				</Form.Group>
				<Form.Group controlId="memo">
					<Form.Label>메모장</Form.Label>
					<Form.Control as="textarea" rows={6} name="memo" ref={register}/>
				</Form.Group>
				<Button type="submit" className="submit-button" style={{float: 'right'}}>수정</Button>
			</Form>
		</div>
	)
};

export default SlotForm;
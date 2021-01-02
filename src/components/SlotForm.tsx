import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { GetStudentList } from '../api/StudentService';

const SlotForm = () => {
	const { register, handleSubmit, reset } = useForm<EntryForm>();
	const [ studentList, setStudentList ] = useState<Array<User>>([]);
	useEffect(() => {
		const getData = async () => {
			await reload();
		}
		getData();
	}, []);

	async function reload() {
		const students = await GetStudentList();
		setStudentList(students);
	};

	const onSubmit = async (data: SlotForm) => {
		console.log(data);
	};

	return (
		<div className="container">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group controlId="adminId">
					<Form.Label>선생님</Form.Label>
					<Form.Control as="select" type="number" placeholder="선생님" name="adminId" ref={register({required: true})}>
						{
							studentList.map(student => {
								return (<option key={student.id} value={student.id}>{student.username}</option>)
							})
						}
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="time">
					<Form.Label>과외 시간</Form.Label>
					<Form.Control type="number" placeholder="2" name="time" ref={register({required: true})}/>
				</Form.Group>
				<Form.Group controlId="startAt">
					<Form.Label>시작 날짜/시간</Form.Label>
					<Form.Control type="date" name="startAt"/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
};

export default SlotForm;
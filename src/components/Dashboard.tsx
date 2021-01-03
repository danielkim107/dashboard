/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LogOut } from '../api/auth/AuthService';
import { GetStudentList } from '../api/student/StudentService';
import { normalizeStudentListData } from '../utils/StudentHelper';
import LogoutButton from './auth/LogoutButton';
import StudentFormButton from './student/StudentFormButton';

const Dashboard = () => {
	const history = useHistory();
	const [ studentList, setStudentList ] = useState<Array<StudentList>>([]);

	useEffect(() => {
		const getStudentListData = async () => {
			await loadStudentListData();
		};
		getStudentListData();
	}, []);

	async function loadStudentListData() {
		const data = await GetStudentList();
		const updatedData = normalizeStudentListData(data);
		setStudentList(updatedData);
	};

	return (
		<div className="container">
			<div className="text-center">
				<h1>과외 플래너</h1>
			</div>
			<div className="row">
				<StudentFormButton/>
				<LogoutButton/>
			</div>
			<Table striped bordered hover>
				<caption>학생 목록</caption>
				<thead>
					<tr>
						<th>이름</th>
						<th>과외 날짜</th>
					</tr>
				</thead>
				<tbody>
					{studentList.map((student) => {
						return (
							<tr key={student.id} onClick={() => history.push(`/student/${student.id}`)}>
								<td>{student.name}</td>
								<td>{student.tutorDays}</td>
							</tr>
					)})}
				</tbody>
			</Table>
		</div>
	);
};

export default Dashboard;
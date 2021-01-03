/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { GetStudentList } from '../api/student/StudentService';
import { normalizeStudentListData } from '../utils/StudentHelper';
import LogoutButton from './auth/LogoutButton';
import StudentFormButton from './student/StudentFormButton';
import StudentTable from './student/StudentTable';

const Dashboard = () => {
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
			<StudentTable studentList={studentList}/>
		</div>
	);
};

export default Dashboard;
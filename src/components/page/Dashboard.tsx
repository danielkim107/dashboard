/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getWeeklySlotList } from '../../api/slot/SlotService';
import { GetStudentList } from '../../api/student/StudentService';
import { normalizeStudentListData } from '../../utils/StudentHelper';
import LogoutButton from '../button/LogoutButton';
import SelectDateSlotForm from '../form/SelectDateSlotForm';
import WeeklySlotList from '../list/WeeklySlotList';
import StudentFormButton from '../button/StudentFormButton';
import StudentTable from '../table/StudentTable';

const Dashboard = () => {
	const [ studentList, setStudentList ] = useState<Array<Student>>([]);
	const [ weeklySlotList, setWeeklySlotList ] = useState<Array<Slot>>([]);

	useEffect(() => {
		const getStudentListData = async () => {
			await loadStudentListData();
			await loadWeeklySlotData();
		};
		getStudentListData();
	}, []);

	async function loadStudentListData() {
		const data = await GetStudentList();
		const updatedData = normalizeStudentListData(data);
		setStudentList(updatedData);
	};

	async function loadWeeklySlotData() {
		const data = await getWeeklySlotList(new Date());
		setWeeklySlotList(data);
	};

	return (
		<div className="container">
			<div className="text-center">
				<h1>과외 시간표</h1>
			</div>
			<div className="row">
				<StudentFormButton/>
				<LogoutButton/>
			</div>
			<StudentTable studentList={studentList}/>
			<SelectDateSlotForm/>
			<WeeklySlotList slotList={weeklySlotList}/>
		</div>
	);
};

export default Dashboard;
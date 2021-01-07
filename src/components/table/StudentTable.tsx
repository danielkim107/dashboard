import React from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

interface StudentTableProps {
	studentList: Array<Student>;
};

const StudentTable: React.FC<StudentTableProps> = ({ studentList }) => {
	const history = useHistory();

	return (
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
	);
};

export default StudentTable;
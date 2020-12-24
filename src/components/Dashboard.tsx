import React from 'react';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
	const entryList = [
		{id: 1, title: '첫번째 포스팅', author: '김정수', createdAt: '2020-12-24 21:00:00'},
		{id: 2, title: '두번째 포스팅', author: '김형우', createdAt: '2020-12-24 22:00:00'}
	];
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>ID</th>
					<th>제목</th>
					<th>등록자</th>
					<th>등록날짜</th>
				</tr>
			</thead>
			<tbody>
				{entryList.map((entry) => {
					return (
						<tr key={entry.id} onClick={() => console.log('moving to unique entry')}>
							<td>{entry.id}</td>
							<td>{entry.title}</td>
							<td>{entry.author}</td>
							<td>{entry.createdAt}</td>
						</tr>
				)})}
			</tbody>
		</Table>
	);
}

export default Dashboard;
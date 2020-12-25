import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
	const history = useHistory();
	const entryList: Array<Entry> = [
		{id: 1, title: '첫번째 포스팅', author: '김정수', createdAt: '2020-12-24 21:00:00'},
		{id: 2, title: '두번째 포스팅', author: '김형우', createdAt: '2020-12-24 22:00:00'}
	];

	const handleRowClick = (entry: Entry) => {
		history.push(`/${entry.id}`);
	};

	const createEntry = () => {
		history.push('/newEntry');
	}
	return (
		<div className="container">
			<h1>계시판</h1>
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
							<tr key={entry.id} onClick={() => handleRowClick(entry)}>
								<td>{entry.id}</td>
								<td>{entry.title}</td>
								<td>{entry.author}</td>
								<td>{entry.createdAt}</td>
							</tr>
					)})}
				</tbody>
			</Table>
			<Button onClick={() => createEntry()}>신규 계시물</Button>
		</div>
	);
}

export default Dashboard;
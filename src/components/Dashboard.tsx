import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
	const history = useHistory();
	const [ entryList, setEntryList ] = useState<Array<Entry>>();

	useEffect(() => {
		fetch('http://localhost:4000/entry', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			return response.json();
		}).then(result => {
			setEntryList(result);
		})
	}, []);

	const handleRowClick = (id: number) => {
		history.push(`/${id}`);
	};

	const createEntry = () => {
		history.push('/newEntry');
	}
	return (
		<div className="container">
			<h1>나의 심플한 계시판</h1>
			<div className="row">
				<Button onClick={() => createEntry()}>신규 계시물</Button>
			</div>
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
					{entryList?.map((entry) => {
						return (
							<tr key={entry.id} onClick={() => handleRowClick(entry.id)}>
								<td>{entry.id}</td>
								<td>{entry.title}</td>
								<td>{entry.author}</td>
								<td>{entry.createdAt}</td>
							</tr>
					)})}
				</tbody>
			</Table>
		</div>
	);
}

export default Dashboard;
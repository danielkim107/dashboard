import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../utils/AuthService';

const Dashboard = () => {
	const history = useHistory();
	const [ entryList, setEntryList ] = useState<Array<Entry>>();
	const authService = new AuthService();

	useEffect(() => {
		if (authService.checkLogin()) {
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
		} else {
			alert('로그인이 되어 있지 않습니다. 로그인 해주세요.');
			history.push('/login');
		}
	}, []);

	const handleLogOut = () => {
		authService.logout();
		history.push('/login');
	};

	return (
		<div className="container">
			<h1>나의 심플한 계시판</h1>
			<div className="row">
				<Button onClick={() => history.push('/entry/newEntry')}>신규 계시물</Button>
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
							<tr key={entry.id} onClick={() => history.push(`/entry/${entry.id}`)}>
								<td>{entry.id}</td>
								<td>{entry.title}</td>
								<td>{entry.user.username}</td>
								<td>{entry.createdAt}</td>
							</tr>
					)})}
				</tbody>
			</Table>
			<Button onClick={() => handleLogOut()}>Logout</Button>
		</div>
	);
}

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../utils/AuthService';

const Dashboard = () => {
	const history = useHistory();
	const [ entryList, setEntryList ] = useState<Array<Entry>>();
	const [ limit, setLimit ] = useState(25);
	const [ dataCount, setDataCount ] = useState(0);
	const [ page, setPage ] = useState(1);
	const [ totalPages, setTotalPages ] = useState(1);
	const [ paginationTab, setPaginationTab ] = useState<Array<any>>([]);
	const paginationCount = [10, 25, 50, 100];
	const authService = new AuthService();

	useEffect(() => {
		if (authService.checkLogin()) {
			reload();
		} else {
			alert('로그인이 되어 있지 않습니다. 로그인 해주세요.');
			history.push('/login');
		}
	}, []);

	useEffect(createPagination, [entryList]);

	useEffect(reload, [page]);

	function reload() {
		fetch(`http://localhost:4000/entry?limit=${limit}&page=${page}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
			}).then(response => {
				return response.json();
			}).then(result => {
				let data = result.data.map((result: Entry) => {
					result.createdAt = new Date(result.createdAt).toLocaleDateString();
					return result;
				})
				setTotalPages(result.pages);
				setEntryList(data);
				setDataCount(result.count);
				setPage(parseInt(result.page));
			})
	}

	function handleLogOut() {
		authService.logout();
		history.push('/login');
	};

	function handlePageCountChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setLimit(parseInt(e.target.value));
		setPage(1);
	};

	function createPagination() {
		let pagination = [];
		for (let num = 1; num <= totalPages; num++) {
			pagination.push(
				<Pagination.Item key={num} active={num === page} onClick={() => setPage(num)}>{num}</Pagination.Item>
			)
		}
		setPaginationTab(pagination);
	}

	return (
		<div className="container">
			<h1>나의 심플한 계시판 ({dataCount}개)</h1>
			<div className="row">
				<Button onClick={() => history.push('/entry/newEntry')}>신규 계시물</Button>
				<Button onClick={() => handleLogOut()}>Logout</Button>
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
			<div className="Pagination">
				<Pagination>{paginationTab}</Pagination>
			</div>
			<div className="row">
				<label htmlFor="pageCount">페이지 갯수</label>
				<select id="pageCount" className="page-count" value={limit} onChange={e => handlePageCountChange(e)}>
					{
						paginationCount.map(num => {
							return (<option key={num} value={num}>{num}</option>)
						})
					}
				</select>
			</div>
		</div>
	);
}

export default Dashboard;
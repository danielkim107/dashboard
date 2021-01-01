/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { GetEntryList } from '../api/EntryService';
import { AuthService } from '../api/AuthService';

const Dashboard = () => {
	const history = useHistory();
	const [ entryList, setEntryList ] = useState<Array<Entry>>();
	const [ limit, setLimit ] = useState(25);
	const [ page, setPage ] = useState(1);
	const [ totalPages, setTotalPages ] = useState(1);
	const [ paginationTab, setPaginationTab ] = useState<Array<any>>([]);
	const paginationCount = [5, 10, 25, 50, 100];
	const authService = new AuthService();

	useEffect(() => {
		if (authService.checkLogin()) {
			const asyncFunction = async() => {
				await reload();
			};
			asyncFunction();
		} else {
			alert('로그인이 되어 있지 않습니다. 로그인 해주세요.');
			history.push('/login');
		}
	}, []);

	useEffect(() => {
		const asyncFunction = async() => {
			await buildQuery();
		};
		asyncFunction();
	}, [page, limit]);

	useEffect(createPagination, [entryList]);

	async function buildQuery() {
		const url = `/dashboard?page=${page}&limit=${limit}`;
		history.push(url);
		const entries = await GetEntryList({page, limit});
		setTotalPages(Math.ceil(entries.count / limit));
		setEntryList(entries.data);
	};



	async function reload() {
		const response = await GetEntryList({page, limit});
		console.log(response);
		setTotalPages(Math.ceil(response.count / limit));
		setEntryList(response.data);
	};

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
	};

	return (
		<div className="container">
			<h1>나의 심플한 계시판</h1>
			<div className="row">
				<Button onClick={() => history.push('/user/newUser')} style={{float: 'left'}}>신규 유저</Button>
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
				<label htmlFor="pageCount">계시물 갯수</label>
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
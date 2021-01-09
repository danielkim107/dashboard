import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Home = () => {
	const history = useHistory();
	return (
		<div className="container">
			<h1>Welcome to Daniel's Mini-Blog.</h1>
			<h3>To get to the blog, please create an account and login.</h3>
			<Button onClick={() => history.push('/login')}>로그인</Button>
		</div>
	)
}

export default Home;
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LogOut } from '../../api/auth/AuthService';

const LogoutButton = () => {
	const history = useHistory();

	function handleLogOut() {
		LogOut();
		history.push('/login');
	};

	return (
		<Button onClick={() => handleLogOut()}>Logout</Button>
	);
};

export default LogoutButton;
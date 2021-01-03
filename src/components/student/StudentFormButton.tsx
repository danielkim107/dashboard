import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const StudentFormButton = () => {
	const history = useHistory();
	
	return (
		<Button onClick={() => history.push('/newStudent')}>신규 학생 등록</Button>
	);
};

export default StudentFormButton;
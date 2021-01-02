import { API_URL } from './../constants';

export const SignupTeacher = async (data: TeacherSignupFormDTO): Promise<Response> => {
	const response = await fetch(`${API_URL}/teacher`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	});
	
	return response;
};
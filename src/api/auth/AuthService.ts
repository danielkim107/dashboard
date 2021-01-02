import * as Cookies from 'js-cookie';
import { API_URL } from '../../constants';

export class AuthService {
	
	public checkLogin = () => {
		return Cookies.get('loggedIn') === 'true' && Cookies.get('user') !== undefined;
	}
	public logout = () => {
		Cookies.remove('user');
		Cookies.set('loggedIn', 'false');
	}
	public getUser = () => {
		let user = Cookies.get('user');
		return user !== undefined ? JSON.parse(user) : {};
	}
};

const setLogin = (teacher: User) => {
	Cookies.set('teacherId', teacher.id.toString());
	Cookies.set('teacherName', teacher.username);
	Cookies.set('loggedIn', 'true');
};

export const Login = async (data: LoginFormDTO): Promise<Response> => {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		
	});
	if (response.ok) {
		const teacher: User = await response.json();
		setLogin(teacher);
	}

	return response as Response;
};
import * as Cookies from 'js-cookie';

export class AuthService {
	public login = (user: any) => {
		Cookies.set('user', user);
		Cookies.set('loggedIn', 'true');
	}
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
}

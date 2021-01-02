import { API_URL } from '../../constants';

// GetEntryQuery sends a request to server to fetch list of entries based on query.
export const GetStudentList = async (): Promise<Array<User>> => {
	const response = await fetch(`${API_URL}/student`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
	});
	const result = await response.json();

	return result as Array<User>;
};
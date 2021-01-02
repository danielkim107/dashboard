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

export const GetStudent = async (id: String): Promise<GetStudentResponse> => {
	const response = await fetch(`${API_URL}/student/${id}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	const studentData = await response.json();
	return studentData as GetStudentResponse;
};

export const CreateStudent = async (data: StudentFormDTO): Promise<Response> => {
	const response = await fetch(`${API_URL}/student`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	});

	return response as Response;
};

export const UpdateStudent = async (data: StudentFormDTO, id: string): Promise<Response> => {
	const response = await fetch(`${API_URL}/student/${id}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	});

	return response as Response;
};
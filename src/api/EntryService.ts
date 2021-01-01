import { API_URL } from '../constants';

// GetEntryQuery sends a request to server to fetch list of entries based on query.
export const GetEntryList = async (query: GetEntryListDTO): Promise<GetEntryListResponse> => {
	const response = await fetch(`${API_URL}/entry?limit=${query.limit}&page=${query.page}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
	});
	const result = await response.json();
	result.data = result.data.map((entry:Entry) => {
		entry.createdAt = new Date(entry.createdAt).toLocaleDateString();
		return entry;
	});
	return result as GetEntryListResponse;
};

// GetEntryById sends a request to server to fetch an entry based on PK id.
export const GetEntryById = async (id: string | number): Promise<GetEntryByIdResponse> => {
	const response = await fetch(`${API_URL}/entry/${id}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	const result = await response.json();
	return result as GetEntryByIdResponse;
};

// CreateEntry sends a request to server to create an entry based on the body.
export const CreateEntry = async (body: CreateEntryDTO): Promise<Entry> => {
	const response = await fetch(`${API_URL}/entry/`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	const result = await response.json();
	return result as Entry;
};

// UpdateEntry sends a request to server to update an entry based on PK id.
export const UpdateEntry = async (body: CreateEntryDTO, id: string | number): Promise<number> => {
	const response = await fetch(`${API_URL}/entry/${id}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	const result = await response.json();
	return result as number;
};

// DeleteEntry sends a request to server to delete an entry based on PK id.
export const DeleteEntry = async (id: string | number): Promise<void> => {
	const response = await fetch(`${API_URL}/entry/${id}`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
	});
	await response.json();
};
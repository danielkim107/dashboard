import { API_URL } from '../constants';

export interface GetEntryListDTO {
	page: number;
	limit: number;
};

export interface GetEntryListResponse {
	data: Array<Entry>;
	count: number;
};

// GetEntryQuery sends a request to server to fetch list of entries based on query.
export const GetEntryList = async (query: GetEntryListDTO): Promise<GetEntryListResponse> => {
	const response = await fetch(`${API_URL}/entry?limit=${query.limit}&page=${query.page}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
	});
	const result = await response.json();
	result.data = result.data.map((entry:Entry) => {
		entry.createdAt = new Date(entry.createdAt).toLocaleDateString();
		return entry;
	});
	return result as GetEntryListResponse;
};

// GetEntryById sends a request to server to fetch an entry based on PK id.
export const GetEntryById = async (id: number): Promise<any> => {

}
// CreateEntry sends a request to server to create an entry based on the body.
// UpdateEntry sends a request to server to update an entry based on PK id.
// DeleteEntry sends a request to server to delete an entry based on PK id.
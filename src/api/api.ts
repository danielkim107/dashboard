const url = 'http://localhost:4000';

export interface GetEntryDTO {
	page: number;
	limit: number;
};

export interface GetEntryResponse {
	data: Array<Entry>;
	count: number;
};

// GetEntryQuery sends a request to server to fetch list of entries based on query
export const GetEntryQuery = async (query: GetEntryDTO): Promise<GetEntryResponse> => {
	const response = await fetch(`${url}/api/entry?limit=${query.limit}&page=${query.page}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
	})
	const result = await response.json();
	result.data = result.data.map((entry:Entry) => {
		entry.createdAt = new Date(entry.createdAt).toLocaleDateString();
		return entry;
	})
	return result as GetEntryResponse;
		
		
		// .then(response => {
		// 		return response.json();
		// 	}).then(result => {
		// 		let data = result.data.map((result: Entry) => {
		// 			result.createdAt = new Date(result.createdAt).toLocaleDateString();
		// 			return result;
		// 		})
				
		// 	})
}
type Entry = {
	id: number,
	user: User,
	title: string,
	content: string,
	createdAt: string
};

interface GetEntryListDTO {
	page: number;
	limit: number;
};

interface GetEntryListResponse {
	data: Array<Entry>;
	count: number;
};

interface GetEntryByIdResponse {
	userId: number;
	title: string;
	content: string;
};

interface CreateEntryDTO {
	userId: number;
	title: string;
	content: string;
};

type User = {
	id: number,
	username: string
};
////////// Entry Start //////////
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
/////////// Entry End ///////////

////////// User Start ///////////
type User = {
	id: number,
	username: string
};
////////// User End /////////////

////////// Slot Start ///////////
type SlotDataForm = {
	id: number,
	adminId: number,
	studentId: number,
	time: number,
	startAt: string,
};
////////// Slot End /////////////
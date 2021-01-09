interface GetSlotByDateResponse {
	id: number;
};

interface GetSlotByIdResponse {
	date: string;
	studentInfo: Array<StudentSlotInfo>;
	totalAmount: number;
	memo: string;
};

interface GetStudentListResponse {
	id: number;
	name: string;
	tutorDays: Array<number>;
};

interface GetStudentResponse {
	name: string;
	defaultHour: number;
	price: number;
	tutorDays: Array<number>;
};

interface UpdateSlotDTO {
	studentInfo: Array<StudentSlotInfo>;
	totalAmount: number;
	memo: string;
};
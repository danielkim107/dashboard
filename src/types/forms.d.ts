type SlotForm = {
	adminId: number,
	studentId: number,
	time: number,
	startAt: string,
};

type SlotDataForm = {
	id: number,
	adminId: number,
	studentId: number,
	time: number,
	startAt: string,
};

interface StudentForm {
	name: string;
	defaultHour: number;
	defaultTimeStart: string;
	defaultTimeEnd: string;
	price: number;
	tutorDays: string;
};

type UserForm = {
	username: string,
	password: string
};
type EntryForm = {
	title: string,
	content: string
};

type UserForm = {
	username: string,
	password: string
};

type SlotForm = {
	adminId: number,
	studentId: number,
	time: number,
	startAt: string,
};

interface TeacherSignupFormDTO {
	username: string;
	password: string;
	name: string;
};

interface LoginFormDTO {
	username: string;
	password: string;
};

interface StudentListResponse {
	id: number;
	name: string;
	tutorDays: Array<number>;
};

interface Student {
	id: number;
	name: string;
	tutorDays: string;
};

interface Slot {
	id: number;
	date: string;
	studentInfo: Array<StudentSlotInfo>;
};

interface StudentForm {
	name: string;
	defaultHour: number;
	defaultTimeStart: string;
	defaultTimeEnd: string;
	price: number;
	tutorDays: string;
};

interface StudentFormDTO {
	name: string;
	defaultHour: number;
	price: number;
	tutorDays: Array<number>;
	teacherId: number;
};

interface GetStudentResponse {
	name: string;
	defaultHour: number;
	price: number;
	tutorDays: Array<number>;
};

interface StudentSlotInfo {
	studentId: number;
	hours: number;
	price: number;
	name: string;
	timeRange: Array<string>;
};
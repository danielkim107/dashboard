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

interface StudentList {
	id: number;
	name: string;
	tutorDays: string;
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
}
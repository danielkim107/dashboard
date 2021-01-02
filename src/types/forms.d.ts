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

interface StudentForm {
	name: String;
	defaultHour: Number;
	price: Number;
	tutorDays: String;
};

interface StudentFormDTO {
	name: String;
	defaultHour: Number;
	price: Number;
	tutorDays: Array<Number>;
	teacherId: Number;
};

interface GetStudentResponse {
	name: String;
	defaultHour: Number;
	price: Number;
	tutorDays: Array<Number>;
}
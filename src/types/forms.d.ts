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
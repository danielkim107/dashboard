interface LoginFormDTO {
	username: string;
	password: string;
};

interface StudentFormDTO {
	name: string;
	defaultHour: number;
	price: number;
	tutorDays: Array<number>;
	teacherId: number;
};

interface TeacherSignupFormDTO {
	username: string;
	password: string;
	name: string;
};
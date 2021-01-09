interface Slot {
	id: number;
	date: string;
	studentInfo: Array<StudentSlotInfo>;
};

interface Student {
	id: number;
	name: string;
	tutorDays: string;
};

interface StudentSlotInfo {
	studentId: number;
	hours: number;
	price: number;
	name: string;
	timeRange: Array<string>;
};

type UserSignIn = {
	id: number,
	username: string
};
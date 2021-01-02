export const convertDaysToNumberDays = (tutorDays: string): Array<number> => {
	let formattedTutorDays: Array<number> = tutorDays.split('').map(day => {
		switch(day) {
			case '일':
				return 0;
			case '월':
				return 1;
			case '화':
				return 2;	
			case '수':
				return 3;
			case '목':
				return 4;
			case '금':
				return 5;
			case '토':
				return 6;
			default:
				return 1;
		};
	});

	return formattedTutorDays;
};

export const convertNumberDaysToDays = (tutorDays: Array<number>): string => {
	let formattedTutorDays = '';
	tutorDays.forEach(day => {
		switch(day) {
			case 0:
				formattedTutorDays = formattedTutorDays.concat('일');
				break;
			case 1:
				formattedTutorDays = formattedTutorDays.concat('월');
				break;
			case 2:
				formattedTutorDays = formattedTutorDays.concat('화');
				break;
			case 3:
				formattedTutorDays = formattedTutorDays.concat('수');
				break;
			case 4:
				formattedTutorDays = formattedTutorDays.concat('목');
				break;
			case 5:
				formattedTutorDays = formattedTutorDays.concat('금');
				break;
			case 6:
				formattedTutorDays = formattedTutorDays.concat('토');
				break;
		}
	});
	return formattedTutorDays;
};

export const normalizeStudentListData = (data: Array<StudentListResponse>): Array<StudentList> => {
	let updatedData: Array<StudentList> = data.map(student => {
		let tableTutorDays = convertNumberDaysToDays(student.tutorDays).split('').join('요일 ').concat('요일');
		return {...student, tutorDays: tableTutorDays};
	});
	return updatedData;

};
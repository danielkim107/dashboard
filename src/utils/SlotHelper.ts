import { GetSlotByIdResponse, StudentSlotInfo, UpdateSlotDTO } from './../api/slot/SlotService';

export const explodeSlotData = (data: GetSlotByIdResponse) => {
	let date = data.date;

	let newData: any = {date: data.date, totalAmount: data.totalAmount, memo: data.memo};
	let studentIdList: Array<number> = [];
	
	data.studentInfo.forEach(student => {
		newData[`studentName${student.studentId}`] = student.name;
		newData[`studentHour${student.studentId}`] = student.hours;
		newData[`studentPrice${student.studentId}`] = student.price;
		newData[`studentStartTime${student.studentId}`] = student.timeRange[0];
		newData[`studentEndTime${student.studentId}`] = student.timeRange[1];
		studentIdList.push(student.studentId);
	});
	return [{...newData, date: date}, studentIdList];
};

export const implodeSlotData = (data: any, studentIdList: Array<number>): UpdateSlotDTO => {
	let studentInfo: Array<StudentSlotInfo> = [];
	let totalAmount = 0;
	studentIdList.forEach(id => {
		let hours = parseFloat(data[`studentHour${id}`]);
		let price = parseInt(data[`studentPrice${id}`]);
		studentInfo.push({
			studentId: id,
			hours: hours,
			price: price,
			name: data[`studentName${id}`],
			timeRange: [data[`studentStartTime${id}`], data[`studentEndTime${id}`]],
		});
		totalAmount += hours * price;
	});

	studentInfo.sort((a, b) => Date.parse(data.date.concat(` ${a.timeRange[0]}`)) > Date.parse(data.date.concat(` ${b.timeRange[0]}`)) ? 1 : -1);
	return {studentInfo: studentInfo, totalAmount: totalAmount, memo: data.memo};
};
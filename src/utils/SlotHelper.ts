import { GetSlotByIdResponse, StudentSlotInfo, UpdateSlotDTO } from './../api/slot/SlotService';

export const explodeSlotData = (data: GetSlotByIdResponse) => {
	let date = data.date.toString();
	date = date.split('T')[0];

	let newData: any = data;
	let studentIdList: Array<number> = [];
	
	data.studentInfo.forEach(student => {
		newData[`studentName${student.studentId}`] = student.name;
		newData[`studentHour${student.studentId}`] = student.hours;
		newData[`studentPrice${student.studentId}`] = student.price;
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
		});
		totalAmount += hours * price;
	});

	return {studentInfo: studentInfo, totalAmount: totalAmount};
};
import Cookies  from 'js-cookie';
import { API_URL } from './../../constants';

export interface GetSlotByDateResponse {
	id: number;
};

export interface GetSlotByIdResponse {
	date: Date;
	studentInfo: Array<StudentSlotInfo>;
	totalAmount: number;
};

export interface StudentSlotInfo {
	studentId: number;
	hours: number;
	price: number;
	name: string;
};

export interface UpdateSlotDTO {
	studentInfo: Array<StudentSlotInfo>;
	totalAmount: number;
};

export const GetSlotById = async (id: string): Promise<GetSlotByIdResponse> => {
	const response = await fetch(`${API_URL}/slot/${id}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	const result = await response.json();

	return result as GetSlotByIdResponse;
};

export const GetSlotByDate = async (date: Date): Promise<GetSlotByDateResponse> => {
	let teacherId = Cookies.get('teacherId');
	const response = await fetch(`${API_URL}/slotDate?date=${date}&teacherId=${teacherId}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	
	const id = await response.json();

	return id as GetSlotByDateResponse;
};

export const UpdateSlot = async (body: UpdateSlotDTO, id: string): Promise<Response> => {
	const response = await fetch(`${API_URL}/slot/${id}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	
	return response as Response;
};

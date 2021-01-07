import Cookies  from 'js-cookie';
import { getMondaySundayRange } from '../../utils/SlotHelper';
import { API_URL } from './../../constants';

export interface GetSlotByDateResponse {
	id: number;
};

export interface GetSlotByIdResponse {
	date: string;
	studentInfo: Array<StudentSlotInfo>;
	totalAmount: number;
	memo: string;
};

export interface UpdateSlotDTO {
	studentInfo: Array<StudentSlotInfo>;
	totalAmount: number;
	memo: string;
};

export const getWeeklySlotList = async (date: Date): Promise<Array<Slot>> => {
	const [monday, sunday] = getMondaySundayRange(date);
	const response = await fetch(`${API_URL}/slot?start=${monday}&end=${sunday}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();

	return result as Array<Slot>;
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

export const GetSlotByDate = async (date: string): Promise<GetSlotByDateResponse> => {
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

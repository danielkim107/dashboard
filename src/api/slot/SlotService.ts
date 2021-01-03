import Cookies  from 'js-cookie';
import { API_URL } from './../../constants';

interface GetSlotByDateResponse {
	id: number;
};

export const getSlotByDate = async (date: Date): Promise<GetSlotByDateResponse> => {
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
}
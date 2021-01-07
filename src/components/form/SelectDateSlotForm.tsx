import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GetSlotByDate } from '../../api/slot/SlotService';

interface DateSlotForm {
	datePicker: string;
}

const SelectDateSlotForm = () => {
	const { register, handleSubmit } = useForm<DateSlotForm>();
	const history = useHistory();

	const onSubmit = async (data: DateSlotForm) => {
		const responseData = await GetSlotByDate(data.datePicker);
		history.push(`/slot/${responseData.id}`);
	};
	
	return (
		<div>
			<Form inline onSubmit={handleSubmit(onSubmit)}>
				<Form.Control type="date" id="datePicker" name="datePicker" style={{'marginRight': '10px'}} ref={register}/>
				<Button type="submit" className="submit-button">검색</Button>
			</Form>
		</div>
	);
};

export default SelectDateSlotForm;
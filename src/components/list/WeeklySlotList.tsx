import React from 'react';
import SlotCard from '../card/SlotCard';

interface WeeklySlotListProps {
	slotList: Array<Slot>;
};


const WeeklySlotList: React.FC<WeeklySlotListProps> = ({ slotList }) => {
	return (
		<ul className="weekly-row">
			{slotList.map(slot => {
				return (<SlotCard key={slot.id} slot={slot}/>);
			})}
		</ul>
	)
};

export default WeeklySlotList;
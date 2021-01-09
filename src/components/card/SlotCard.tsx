import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

interface SlotCardProps {
	slot: Slot;
};

const SlotCard: React.FC<SlotCardProps> = ({ slot }) => {

	const history = useHistory();

	return (
		<Card onClick={() => history.push(`/slot/${slot.id}`)}>
			<Card.Body>
				<Card.Title>{slot.date}</Card.Title>
				{slot.studentInfo.map(student => {
					if (student.hours !== 0) {
						return (<Card.Text>{student.name} - {student.timeRange[0]} ~ {student.timeRange[1]}</Card.Text>);
					} else {
						return (<Card.Text>{student.name} - 없음</Card.Text>);
					}
				})}
			</Card.Body>
		</Card>
	);
};

export default SlotCard;
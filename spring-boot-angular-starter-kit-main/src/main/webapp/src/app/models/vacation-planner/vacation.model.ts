
import VacationConfig from './vacation_config.model';
import Prepayment from './prepayment.model';

export default interface Vacation{
	id: number;
	name: string;
	state: string;
	owner: number;
	config: VacationConfig,
	prepayments: Prepayment[],
	funding_comps_credits:{},
	meta:{
		totalFCC: 0,
		monthsRemaining: 0,
		weeksRemaining: 0,
		daysRemaining: 0
	}
}

import VacationConfig from './vacation_config.model';
import Prepayment from './prepayment.model';
import Confirmation from './confirmation.model';

export default interface Vacation{
	id: number;
	name: string;
	state: string;
	owner: number;
	notes: string;
	config: VacationConfig,
	prepayments: Prepayment[],
	funding_comps_credits:{},
	confirmations: Confirmation[],
	meta:{
		totalFCC: 0,
		monthsRemaining: 0,
		weeksRemaining: 0,
		daysRemaining: 0,
		totalPrepayments: 0,
		totalPrepaymentCashback: 0
	}
}
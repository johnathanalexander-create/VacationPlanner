
import VacationConfig from './vacation_config.model';
import Prepayment from './prepayment.model';

export default interface Vacation{
	id: number;
	name: string;
	state: string;
	owner: number;
	config: VacationConfig,
	prepayments: Prepayment[],
	funding_comps_credits:{}
}

import VacationConfig from './vacation_config.model';
import Prepayment from './prepayment.model';
import Confirmation from './confirmation.model';
import Spa from './spa.model';
import BudgetItem from './budget_item.model';
import LuggageSet from './packing/luggage_set.model';

export default interface Vacation{
	id: number;
	name: string;
	state: string;
	owner: number;
	notes: string;
	config: VacationConfig,
	prepayments: Prepayment[],
	budgetItems: BudgetItem[],
	luggageSets: LuggageSet[],
	spas: Spa[],
	funding_comps_credits:{},
	confirmations: Confirmation[],
	meta:{
		tab_disabler: {
			packing: false,
			spa: false,
			calendar: false,
			research: false,
			tripAnalysis: false
		},
		totalFCC: 0,
		monthsRemaining: 0,
		weeksRemaining: 0,
		daysRemaining: 0,
		totalPrepayments: 0,
		totalPrepaymentCashback: 0,
		fo_main_funding:0,
		fo_credit_card_funding: 0,
		fo_estimated_cost: 0,
		tsm_istodaytripday_stylecolor: "red",
		estimated_trip_package_price:0
	}
}
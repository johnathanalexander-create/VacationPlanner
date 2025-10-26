import Vacation from './vacation.model';
export default interface VacationUpdater{
	vacation: Vacation,
	messages: {
		"onError":string,
		"onSuccess":string
	}
}
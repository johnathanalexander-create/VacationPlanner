
import VacationConfig from './vacation_config.model';
export default interface Vacation{
	id: number;
	name: string;
	state: string;
	owner: number;
	config: VacationConfig
}
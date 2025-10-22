import VacationConfigItem from './vacation_config_item.model';
export default interface VacationConfig{
	id: number;
	vacation_id: number;
	configItems: VacationConfigItem[]
}
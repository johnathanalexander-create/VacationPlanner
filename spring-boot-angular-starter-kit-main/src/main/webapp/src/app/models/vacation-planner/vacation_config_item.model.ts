
export default interface VacationConfigItem{
	id: number;
	vacation_config_id: number;
	config_name: string;
	config_value: string;
	config_notes: string;
	primary_config: boolean;
	required: boolean;
}
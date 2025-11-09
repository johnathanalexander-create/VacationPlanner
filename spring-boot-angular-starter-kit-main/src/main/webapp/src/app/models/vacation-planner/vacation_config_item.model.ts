
export default interface VacationConfigItem{
	id: number;
	vacation_config_id: number;
	config_label: string;
	config_key: string;
	config_value: string;
	config_notes: string;
	primary_config: boolean;
	required: boolean;
	order: number;
	is_editing: boolean;
}
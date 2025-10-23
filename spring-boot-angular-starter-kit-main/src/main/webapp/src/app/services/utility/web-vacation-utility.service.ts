import { Injectable } from '@angular/core';
import Vacation from '../../models/vacation-planner/vacation.model';
import VacationConfig from '../../models/vacation-planner/vacation_config.model';
import VacationConfigItem from '../../models/vacation-planner/vacation_config_item.model';
@Injectable({
  providedIn: 'root'
})
export class WebVacationUtilityService {

  constructor() { }
  
  getUserID(): string | null{
	return localStorage.getItem("userID");
  }
  
  getVacationValue(vacation: Vacation, search:string, isConfigItemSearch: boolean): string{
	
	var ret: any = "";
	
	if(vacation && search && !isConfigItemSearch){
		//If we have a valid vacation and search param and we want to do a simple object lookup
		var search_params = search.split("/");
		if(search_params.length > 0){
			search_params.forEach(function(param){
				const g = param as keyof Vacation;
				ret = vacation[g];
			});
			
		}
	}
	
	if(vacation && search && isConfigItemSearch){
		//If we have a valid vacation and search param and we want to do a complex lookup into the VacationConfigItem list
		
		var config_items = vacation.config.configItems;
		
		if(config_items && config_items.length > 0){
			config_items.forEach(function(config_item){
				if(config_item.config_key == search){
					ret = config_item.config_value;
				}
			});
		}
			
	}
	
	return ret;
  }
}

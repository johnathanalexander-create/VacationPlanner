import { Injectable } from '@angular/core';
import Vacation from '../../models/vacation-planner/vacation.model';
import VacationConfig from '../../models/vacation-planner/vacation_config.model';
import VacationConfigItem from '../../models/vacation-planner/vacation_config_item.model';
import Prepayment from '../../models/vacation-planner/prepayment.model';
import {VacationProcessorService} from '../vacation-processor/vacation-processor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrepaymentModalComponent } from '../../components/vacation/dynamic-modal-content/prepayment-modal/prepayment-modal.component';
import { FCCModalComponent } from '../../components/vacation/dynamic-modal-content/fcc-modal/fcc-modal.component';
import {ConfigModalComponent} from '../../components/vacation/dynamic-modal-content/config-modal/config-modal.component';
import {BudgetItemModalComponent} from '../../components/vacation/dynamic-modal-content/budget-item-modal-component/budget-item-modal-component.component';
@Injectable({
  providedIn: 'root'
})
export class WebVacationUtilityService {


  constructor(public dialog: MatDialog,) {

   }
  
  getUserID(): string | null{
	return localStorage.getItem("userID");
  }
  
  getVacationValue(vacation: Vacation, search:string, isConfigItemSearch: boolean, onErrorReturnMessage: string): string{
	
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
	
	if(ret == null || ret == "" && onErrorReturnMessage){
		return onErrorReturnMessage;
	}
	
	return ret;
  }
  
  getMonthDiff(date: Date){
	const average_days_in_month = 365/12;
	const daysAway = this.getDayDiff(date);
	
	return (daysAway / average_days_in_month).toFixed(2);
  }
  
  getWeekDiff(date: Date){
	const today = new Date();
	today.setHours(0,0,0,0);
	date.setHours(0,0,0,0);
	
	const diffMilliseconds = Math.abs(date.getTime() - today.getTime());
	const millisecondsInAWeek = 1000 * 60 * 60 * 24 * 7;
	const weeks = diffMilliseconds / millisecondsInAWeek;

	return weeks.toFixed(2);
  }
  
  getDayDiff(date: Date){
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);
	
	const oneDayInMilliseconds: number = 1000 * 60 * 60 * 24;

	const differenceInMilliseconds: number = date.getTime() - today.getTime();

	const daysDifference: number = Math.ceil(differenceInMilliseconds / oneDayInMilliseconds);

	return daysDifference;
	
  }
  
  _getModalComponentDataItems(modalTarget:string, data:any):any{
	  var resp:any = {
	  	component:null,
	  	dialogConfig:{
	  		vacation_id: data.vacation_id,
			data:data
	  	}
	  }
	  switch(modalTarget){
	  	case "prepayment":
	  		resp.component = PrepaymentModalComponent;
			
			if(!resp.dialogConfig.data.prepayment){
				resp.dialogConfig.data.prepayment = {
					"description":"",
					"type":"",
					"vendor":"",
					"isRefundable":"",
					"amount":"",
					"paymentSource":""
				}
			}
	  		break;
		case "config":
			resp.component = ConfigModalComponent;
			
			if(!resp.dialogConfig.data.config){
				resp.dialogConfig.data.config = {
					config_label:"",
					config_key:"",
					config_value:"",
					config_notes:""
				}
			}
			break;
	  	case "fcc":
	  		resp.component = FCCModalComponent;

			if(!resp.dialogConfig.data.fcc){
				resp.dialogConfig.data.fcc = {
					"key":"",
					"value":{
						"value":"",
						"isEditing":false
					}
				}
				
				resp.dialogConfig.data.createNewFCC = true;
			}
	  		break;
		case "bi":
			resp.component = BudgetItemModalComponent;
			
			if(!resp.dialogConfig.data.budgetItem){
				resp.dialogConfig.data.budgetItem = {
					id:"",
					item:"",
					amount:"",
					amountGoal:"",
					cashRequirement:"",
					notes:"",
					order:""
				}
			}
			break;
	  }
	  return resp;
  }
  
  generateModal(modalTarget:string, data:any): void{
  	if(modalTarget){
  		const dialogConfig = new MatDialogConfig();
  		
  		var dialogConfigData = this._getModalComponentDataItems(modalTarget, data);
  		dialogConfig.data = dialogConfigData.dialogConfig;
  		
  		const dialog = this.dialog.open(dialogConfigData.component, dialogConfig);
  		
  		
  		dialog.afterClosed().subscribe(result=>{
  			
  		})
  	}
   }
}
import { Injectable } from '@angular/core';
import Vacation from '../../models/vacation-planner/vacation.model';
import VacationConfig from '../../models/vacation-planner/vacation_config.model';
import VacationConfigItem from '../../models/vacation-planner/vacation_config_item.model';
import Prepayment from '../../models/vacation-planner/prepayment.model';
@Injectable({
  providedIn: 'root'
})
export class WebVacationUtilityService {


  constructor() {

   }
   
   processSingleVacation(vacation: any){
		if(vacation){
			vacation.meta = {};
		}
		
		if(vacation.funding_comps_credits){
			//and convert it into a JSON object for display in the table
			
			if(typeof(vacation.funding_comps_credits) == "string")
				vacation.funding_comps_credits = JSON.parse(vacation.funding_comps_credits);
			
			var totalFCC = 0.00;
			
			for(var obj in vacation.funding_comps_credits){
				var fcc_object = vacation.funding_comps_credits[obj];
				
				if(fcc_object && fcc_object.value){
					totalFCC += (parseFloat(fcc_object.value));
				}
			}
			
			vacation.meta.totalFCC = totalFCC;
		}
		
		//calculate months, weeks, days remaining
		const tripStartDate = this.getVacationValue(vacation, "trip_start_date", true)
		
		vacation.meta.monthsRemaining = "Fill Config";
		vacation.meta.weeksRemaining = "Fill Config";
		vacation.meta.daysRemaining = "Fill Config";
		
		if(tripStartDate){
			let dateObj: Date = new Date(tripStartDate);
			
			let monthsAway = this.getMonthDiff(dateObj);
			let weeksAway = this.getWeekDiff(dateObj);
			let daysAway = this.getDayDiff(dateObj);
			
			vacation.meta.monthsRemaining = monthsAway || "Fill Config";
			vacation.meta.weeksRemaining = weeksAway || "Fill Config";
			vacation.meta.daysRemaining = daysAway || "Fill Config";
		}
		
		/*Process Prepayments*/
		if(vacation.prepayments.length > 0){
			//for(var obj in vacation.prepayments){
			for(var count = 0; count < vacation.prepayments.length; count++){
				const prepayment = vacation.prepayments[count];
				prepayment.meta = {};
				
				const prepaymentAmount = prepayment.amount;
				const prepaymentCashbackRate = prepayment.paymentSource.cashbackRate;
				
				if(prepaymentAmount > 0 && prepaymentCashbackRate > 0.00){
					prepayment.meta.cashback = prepaymentAmount * prepaymentCashbackRate;
					prepayment.meta.amountTooltip = "Cashback for this prepayment is $" + prepayment.meta.cashback;
					prepayment.meta.paymentSourceTooltip = "Cashback rate is " + (prepaymentCashbackRate * 100) + "%";
				}
				vacation.prepayments[count] = prepayment;
			}
		}
		return vacation;
   }
  
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
  /*processVacation(vacation:Vacation): Vacation{
	if(vacation){
		//vacation.meta holds runtime properties such as calculations that do not need storage
		vacation.meta = {
			totalFCC: 0.00,
			monthsRemaining: 0,
			weeksRemaining: 0,
			daysRemaining: 0,
			totalPrepayments: 0,
			totalPrepaymentCashback: 0
		}
		
		
		if(vacation.funding_comps_credits){
			
			//and convert it into a JSON object for display in the table
			vacation.fcc = JSON.parse(vacation.funding_comps_credits);
			
			var totalFCC = 0.00;
			
			for(var obj in vacation.fcc){
				var fcc_object = vacation.fcc[obj as keyof typeof vacation.fcc];
				
				if(fcc_object ){
					totalFCC += (parseFloat(fcc_object.value));
				}
			}
			
			vacation.meta.totalFCC = totalFCC;
		}
		
		//calculate months, weeks, days remaining
		const tripStartDate = this.getVacationValue(vacation, "trip_start_date", true)
		
		vacation.meta.monthsRemaining = "Fill Config";
		vacation.meta.weeksRemaining = "Fill Config";
		vacation.meta.daysRemaining = "Fill Config";
		
		if(tripStartDate){
			let dateObj: Date = new Date(tripStartDate);
			
			let monthsAway = this.getMonthDiff(dateObj);
			let weeksAway = this.getWeekDiff(dateObj);
			let daysAway = this.getDayDiff(dateObj);
			
			vacation.meta.monthsRemaining = monthsAway || "Fill Config";
			vacation.meta.weeksRemaining = weeksAway || "Fill Config";
			vacation.meta.daysRemaining = daysAway || "Fill Config";
		}
	}
	
	return vacation;
  }*/
}
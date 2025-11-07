import { Injectable } from '@angular/core';
import {WebVacationUtilityService} from '../utility/web-vacation-utility.service';
import Vacation from '../../models/vacation-planner/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class VacationProcessorService {

  constructor(private utility: WebVacationUtilityService) { }
  
  vacation: any;
  
  processStatus = {
	"fcc":"not_started",
	"time":"not_started",
	"prepayments":"not_started",
	"funding_overview":"not_started",
	"package":"not_started"
  }
  
  async _processFCC(): Promise<string>{
	
	if(!this.vacation){
		this.processStatus.fcc = "error";
	}
	
	this.processStatus.fcc = "in_progress";
	
	if(this.vacation.funding_comps_credits){
		
		if(typeof(this.vacation.funding_comps_credits) == "string")
			this.vacation.funding_comps_credits = JSON.parse(this.vacation.funding_comps_credits);
		
		var totalFCC = 0.00;
		
		for(var obj in this.vacation.funding_comps_credits){
			var fcc_object = this.vacation.funding_comps_credits[obj];
			
			if(fcc_object && fcc_object.value){
				totalFCC += (parseFloat(fcc_object.value));
			}
		}
		
		this.vacation.meta.totalFCC = totalFCC;
	}
	
	this.processStatus.fcc = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.fcc);
	});
  }
  async _processDaysWeeksMonthsRemaining(): Promise<string>{
	
	if(!this.vacation){
		this.processStatus.time = "error";
	}
	
	this.processStatus.time = "in_progress";
	
	const tripStartDate = this.utility.getVacationValue(this.vacation, "trip_start_date", true);
	  		
	this.vacation.meta.monthsRemaining = "Fill Config";
	this.vacation.meta.weeksRemaining = "Fill Config";
	this.vacation.meta.daysRemaining = "Fill Config";
	console.log("start date debugging");
	if(tripStartDate){
		let dateObj: Date = new Date(tripStartDate);console.log(dateObj);
		
		let monthsAway = this.utility.getMonthDiff(dateObj);
		let weeksAway = this.utility.getWeekDiff(dateObj);
		let daysAway = this.utility.getDayDiff(dateObj);
		
		this.vacation.meta.monthsRemaining = monthsAway || "Fill Config";
		this.vacation.meta.weeksRemaining = weeksAway || "Fill Config";
		this.vacation.meta.daysRemaining = daysAway || "Fill Config";
	}
	
	this.processStatus.time = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.time);
	});
  }
  
  async _processPrepayments(): Promise<string>{
	if(!this.vacation){
		this.processStatus.prepayments = "error";
	}
	if(this.vacation.prepayments.length > 0){
		this.processStatus.prepayments = "in_progress";
		
		var totalPrepaymentAmount: number = 0.00;
		for(var count = 0; count < this.vacation.prepayments.length; count++){
			const prepayment = this.vacation.prepayments[count];
			prepayment.meta = {};
			
			const prepaymentAmount = prepayment.amount;
			const prepaymentCashbackRate = prepayment.paymentSource.cashbackRate;
			
			totalPrepaymentAmount += prepaymentAmount;
			
			if(prepaymentAmount > 0 && prepaymentCashbackRate > 0.00){
				prepayment.meta.cashback = prepaymentAmount * prepaymentCashbackRate;
				prepayment.meta.amountTooltip = "Cashback for this prepayment is $" + prepayment.meta.cashback;
				prepayment.meta.paymentSourceTooltip = "Cashback rate is " + (prepaymentCashbackRate * 100) + "%";
			}
			this.vacation.prepayments[count] = prepayment;
		}
		
		this.vacation.meta.totalPrepayments = totalPrepaymentAmount;
	}
	
	this.processStatus.prepayments = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.prepayments);
	});
  }
  
  async _processFundingOverview(): Promise<string>{
	if(!this.vacation){
		this.processStatus.funding_overview = "error";
	}
	const startTime = Date.now();
	
	while(this.processStatus.fcc != "complete" && false){
		
		if(this.processStatus.fcc == "complete" || this.processStatus.fcc == "error"){
			break;
		}
		
		var durationMs = 5000;//5 seconds
		const currentTime = Date.now();
		const elapsedTime = currentTime - startTime;
		
		if (elapsedTime >= durationMs) {
			break;//Don't want to keep the application from finishing processing for too long. Max 5 seconds
		}
	}
	
	this.processStatus.funding_overview = "in_progress";
	
	this.vacation.meta.fo_main_funding = this.vacation.meta.totalFCC;
	
	this.processStatus.funding_overview = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.funding_overview);
	});
  }
  
  async _processEstimatedTripPackagePrice(): Promise<string>{//Needs the budget dashboard first
	if(!this.vacation){
		this.processStatus.package = "error";
	}
	this.processStatus.package = "in_progress";
	this.processStatus.package = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.package);
	});
  }
  
  
  
  async processSingleVacation(vacation: any): Promise<Vacation>{
  		if(vacation){
  			vacation.meta = {};
  		}
		
		this.vacation = vacation;
		
		var fcc = this._processFCC();
		var time = this._processDaysWeeksMonthsRemaining();
  		var prepayments = this._processPrepayments();
		var funding_overview = this._processFundingOverview();
		var trip_package = this._processEstimatedTripPackagePrice();
		
		const results = await Promise.all([fcc, time, prepayments, funding_overview, trip_package]);
		return new Promise((resolve)=>{
			resolve(this.vacation);
		});
		
		/*try{
			
			console.log(results);
			
		}catch(error:any){
			console.log(error);
		}*/
     }
  
}

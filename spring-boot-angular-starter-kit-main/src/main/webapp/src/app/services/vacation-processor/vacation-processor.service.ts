import { Injectable } from '@angular/core';
import {WebVacationUtilityService} from '../utility/web-vacation-utility.service';
import Vacation from '@models/vacation-planner/vacation.model';
import Confirmation from '@models/vacation-planner/confirmation.model';

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
	"package":"not_started",
	"tsm":"not_started",
	"tasks":"not_started",
	"disabler":"not_started",
	"calendar":"not_started"
  }
  
 /* preprocessVacation(v:Vacation):Vacation{
	v.meta = {};
	v.meta.calendarEvents = [];
	
	
	
	return v;
  }*/
  
  async _processCalendar():Promise<string>{
	if(!this.vacation){
		this.processStatus.calendar = "error";
		return new Promise((resolve)=>{
			resolve(this.processStatus.calendar);
		});
	}
	
	
	
	if(this.vacation.confirmations.length > 0){
		this.vacation.confirmations.forEach((confirmation:Confirmation) => {
			this._createCalendarEvent(confirmation.description, confirmation.date);
		});
	}
		
	this.processStatus.calendar = "in_progress";
	
	return new Promise((resolve) => {
		resolve(this.processStatus.calendar);
	});
  }
  
  async _createCalendarEvent(title: string, date: string):Promise<boolean>{
	
	var calendarEvent = {
		title:title,
		date:date
	}
	
	this.vacation.meta.calendarEvents.push(calendarEvent);
	
	return new Promise((resolve) => {
		resolve(true);
	});
  }
  
  async _processDisabler():Promise<string>{
	
	/* Need to strip out the entire disabler feature due to UI limitations*/
	
	var disablePacking = this.utility.getVacationValue(this.vacation, "tab_disable_packing", true, "");
	var disableSpa = this.utility.getVacationValue(this.vacation, "tab_disable_spa", true, "");
	var disableCalendar = this.utility.getVacationValue(this.vacation, "tab_disable_calendar", true, "");
	var disableResearch = this.utility.getVacationValue(this.vacation, "tab_disable_research", true, "");
	var disableTripAnalysis = this.utility.getVacationValue(this.vacation, "tab_disable_trip_analysis", true, "");
	
	this.vacation.meta.tab_disabler = {
			packing: false,
			spa: false,
			calendar: false,
			research: false,
			tripAnalysis: false
		}
	
	this.vacation.meta.tab_disabler.packing = disablePacking.toLowerCase() == "true";
	this.vacation.meta.tab_disabler.spa = disableSpa.toLowerCase() == "true";
	this.vacation.meta.tab_disabler.calendar = disableCalendar.toLowerCase() == "true";
	this.vacation.meta.tab_disabler.research = disableResearch.toLowerCase() == "true";
	this.vacation.meta.tab_disabler.tripAnalysis = disableTripAnalysis.toLowerCase() == "true";
	
	
	return new Promise((resolve) => {
		resolve(this.processStatus.disabler);
	});
  }
  
  //Process funding, comps, & credits
  async _processFCC(): Promise<string>{
	
	if(!this.vacation){
		this.processStatus.fcc = "error";
		return new Promise((resolve)=>{
			resolve(this.processStatus.fcc);
		});
	}
	
	this.processStatus.fcc = "in_progress";
	
	if(this.vacation.funding_comps_credits){
		
		var totalFCC = 0.00;
		
		for(var obj in this.vacation.funding_comps_credits){
			var fcc_object = this.vacation.funding_comps_credits[obj];

			this.vacation.funding_comps_credits[obj].fccAmount = this.vacation.funding_comps_credits[obj].fccAmount.toFixed(2);
			
			if(fcc_object && fcc_object.fccAmount){
				totalFCC += (parseFloat(fcc_object.fccAmount));
			}
		}
		
		this.vacation.meta.totalFCC = totalFCC.toFixed(2);
		
		console.log("vacay2");
		console.log(this.vacation);
	}
	
	this.processStatus.fcc = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.fcc);
	});
  }
  
  //Process days, weeks, and months remaining
  async _processDaysWeeksMonthsRemaining(): Promise<string>{
	
	if(!this.vacation){
		this.processStatus.time = "error";
	}
	
	this.processStatus.time = "in_progress";
	
	const tripStartDate = this.utility.getVacationValue(this.vacation, "trip_start_date", true, "");
	  		
	this.vacation.meta.monthsRemaining = "Fill Config";
	this.vacation.meta.weeksRemaining = "Fill Config";
	this.vacation.meta.daysRemaining = "Fill Config";
	
	if(tripStartDate){
		let dateObj: Date = new Date(tripStartDate);		
		let monthsAway = this.utility.getMonthDiff(dateObj);
		let weeksAway = this.utility.getWeekDiff(dateObj);
		let daysAway = this.utility.getDayDiff(dateObj);
		
		this.vacation.meta.monthsRemaining = monthsAway || "Fill Config";
		this.vacation.meta.weeksRemaining = weeksAway || "Fill Config";
		
		if(daysAway || daysAway == 0){
			this.vacation.meta.daysRemaining = daysAway;
		}
	}
	
	this.processStatus.time = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.time);
	});
  }
  
  _calculatePrepayments(){
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
			this.vacation.prepayments[count].amount = this.vacation.prepayments[count].amount.toFixed(2);
		}
		
		return totalPrepaymentAmount;
		
		
	}
	
	return 0;
  }
  
  //Process prepayments and prepayment cashback
  async _processPrepayments(): Promise<string>{
	if(!this.vacation){
		this.processStatus.prepayments = "error";
	}
	
	this.vacation.meta.totalPrepayments = this._calculatePrepayments();
	
	this.processStatus.prepayments = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.prepayments);
	});
  }
  
  //Process the funding overview section
  async _processFundingOverview(): Promise<string>{
	if(!this.vacation){
		this.processStatus.funding_overview = "error";
	}
	//const startTime = Date.now();
	
	/*while(this.processStatus.fcc != "complete" && false){
		
		if(this.processStatus.fcc == "complete" || this.processStatus.fcc == "error"){
			break;
		}
		
		var durationMs = 5000;//5 seconds
		const currentTime = Date.now();
		const elapsedTime = currentTime - startTime;
		
		if (elapsedTime >= durationMs) {
			break;//Don't want to keep the application from finishing processing for too long. Max 5 seconds
		}
	}*/
	
	this.processStatus.funding_overview = "in_progress";
	
	this.vacation.meta.fo_estimated_cost = this._calculateBudgetDashboard();//budget db total
	this.vacation.meta.fo_main_funding = this.vacation.meta.totalFCC;
	this.vacation.meta.fo_credit_card_funding = this.vacation.meta.fo_estimated_cost - this.vacation.meta.fo_main_funding;// - this._calculatePrepayments();//Budget DB total - Main Funding - Prepayments
	
	
	
	this.processStatus.funding_overview = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.funding_overview);
	});
  }
  
  _calculateBudgetDashboard(){
	const budgetItems = this.vacation.budgetItems;
	var totalBudgetItems = 0.00;
	
	if(budgetItems && budgetItems.length > 0){
		for(var count = 0; count < budgetItems.length; count++){
			const budgetItem = budgetItems[count];
			
			if(budgetItem.amount && budgetItem.amount > 0)
				totalBudgetItems += budgetItem.amount;
		}
	}
	
	return totalBudgetItems;
  }
  
  //Calculate the estimated trip package price.
  async _processEstimatedTripPackagePrice(): Promise<string>{
	if(!this.vacation){
		this.processStatus.package = "error";
	}
	this.processStatus.package = "in_progress";
	
	
	
	this.vacation.meta.estimated_trip_package_price = this._calculateBudgetDashboard();
	
	this.processStatus.package = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.package);
	});
  }
  
  //Process the trip status monitor triggers
  async _processTripStatusMonitor(): Promise<string>{
	
	if(!this.vacation){
		this.processStatus.tsm = "error";
	}
	
	this.processStatus.tsm = "in_progress";
	
	const oneDayMS = 86400000;
	const sevenDaysMS = oneDayMS * 7;
	
	//Is Today Trip Day
	const startDate = this.utility.getVacationValue(this.vacation, "trip_start_date", true, "");
	
	var startDateObject = new Date(startDate);
	startDateObject.setHours(0,0,0,0);
	
	var today = new Date();
	today.setHours(0,0,0,0);
	
	const diff = Math.abs(startDateObject.getTime() - today.getTime());
	
	this.vacation.meta.tsm_istodaytripday_stylecolor = "red";
	
	if(diff >= oneDayMS && diff <= sevenDaysMS){
		this.vacation.meta.tsm_istodaytripday_stylecolor = "yellow";
	}
	if(diff >= 0 && diff < oneDayMS){
		this.vacation.meta.tsm_istodaytripday_stylecolor = "green";
	}
	
	//End Is Today Trip Day
	
	this.processStatus.tsm = "complete";
	
	return new Promise((resolve)=>{
		resolve(this.processStatus.package);
	});
  }
  
  async _processTasks(): Promise<string>{
	if(!this.vacation){
		this.processStatus.tasks = "error";
		
		return new Promise((resolve)=>{
			resolve(this.processStatus.tasks);
		});
	}
	
	this.processStatus.tasks = "in_progress";
	this.processStatus.tasks = "complete";
	return new Promise((resolve)=>{
		resolve(this.processStatus.tasks);
	});
  }
  
  
  
  async processSingleVacation(vacation: any): Promise<any>{
  		if(vacation){
			//vacation = this.preprocessVacation(vacation);
			vacation.meta = {};
			vacation.meta.calendarEvents = [];
  		}
		
		this.vacation = vacation;
		
		var fcc = this._processFCC();
		var time = this._processDaysWeeksMonthsRemaining();
  		var prepayments = this._processPrepayments();
		var funding_overview = this._processFundingOverview();
		var trip_package = this._processEstimatedTripPackagePrice();
		var tsm = this._processTripStatusMonitor();
		var disabler = this._processDisabler();
		var calendar = this._processCalendar();
		
		const results = await Promise.all([fcc, time, prepayments, funding_overview, trip_package, tsm, disabler, calendar]);
		return new Promise((resolve)=>{
			console.log("the processed vacation");
			console.log(this.vacation);
			resolve(this.vacation);
		});
  }
  
}

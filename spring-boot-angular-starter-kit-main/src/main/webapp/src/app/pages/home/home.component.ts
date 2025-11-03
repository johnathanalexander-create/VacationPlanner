
import {Component, Signal, Input, effect} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule, MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";
import {VacationControllerService} from '../../services/vacation-planner/vacation-controller.service';
import Vacation from '../../models/vacation-planner/vacation.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { TripDashboardComponent } from '../../components/vacation/trip-dashboard/trip-dashboard.component';
import { PrepaymentsComponent } from '../../components/vacation/prepayments/prepayments.component';
import {WebVacationUtilityService} from '../../services/utility/web-vacation-utility.service';
import { TripConfigComponent } from '../../components/vacation/trip-config/trip-config.component';
import { ConfirmationsComponent } from '../../components/vacation/confirmations/confirmations.component';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PrepaymentModalComponent} from '../../components/vacation/dynamic-modal-content/prepayment-modal/prepayment-modal.component';

@Component({
    selector: 'app-home',
    imports: [MatToolbarModule, MatSelectModule, MatTableModule, MatButtonModule, MatTabsModule, ConfirmationsComponent,
			 CommonModule, FormsModule, TripDashboardComponent, PrepaymentsComponent, TripConfigComponent, MatButton, PrepaymentModalComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  selectedVacation?: Vacation | null = null;
  
  currentTab: string = "";
  
  //Identifies the current tab for control-panel button changes
  onTabChange(evt: any): void{
	const tabs:any = {
		0: "trip_dashboard",
		1: "prepayments",
		2: "budget",
		3: "research",
		4: "confirmations",
		5: "calendar",
		6: "spa",
		7: "packing",
		8: "task",
		9: "trip_analysis",
		10: "config"
	};
	
	this.currentTab = tabs[evt.index];
  }
  
  generateModal(): void{
	/*const dialog = this.dialog.open(PrepaymentModalComponent, {
		width: '750px',
		data: {
			vacation_id: this.selectedVacation.id
		}
	});*/
	
	const dialogConfig = new MatDialogConfig();
	dialogConfig.data = {
		vacation_id: this.selectedVacation?.id
	}
	
	const dialog = this.dialog.open(PrepaymentModalComponent, dialogConfig);
	
	dialog.afterClosed().subscribe(result=>{
		console.log(result);
	})
  }
  
  processSingleVacation(vacation: any){
  		if(vacation){
  			vacation.meta = {};
  			
  		}
  }
  
  processAllVacations(body: any){console.log(body);
	for(var index = 0; index<body.length; index++){
		const vacation = body[index];
		
		body[index] = this.util.processSingleVacation(vacation);
	}
	
	//Process all vacations returned from the signal
	
	//For each vacation object
	/*for(var index = 0; index < body.length; index++){
		const vacation = body[index];
		if(vacation){
			vacation.meta = {};//vacation.meta holds runtime properties such as calculations that do not need storage
			
			
			if(vacation.funding_comps_credits){
				//and convert it into a JSON object for display in the table
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
			const tripStartDate = this.util.getVacationValue(vacation, "trip_start_date", true)
			
			vacation.meta.monthsRemaining = "Fill Config";
			vacation.meta.weeksRemaining = "Fill Config";
			vacation.meta.daysRemaining = "Fill Config";
			
			if(tripStartDate){
				let dateObj: Date = new Date(tripStartDate);
				
				let monthsAway = this.util.getMonthDiff(dateObj);
				let weeksAway = this.util.getWeekDiff(dateObj);
				let daysAway = this.util.getDayDiff(dateObj);
				
				vacation.meta.monthsRemaining = monthsAway || "Fill Config";
				vacation.meta.weeksRemaining = weeksAway || "Fill Config";
				vacation.meta.daysRemaining = daysAway || "Fill Config";
			}
			
		}
	}*/
	console.log(body);
	return body;//
  }
  
  vacations: Signal<Vacation[] | [] | null> = toSignal(this.vacationService.getVacationsByUserId().pipe(
	map(response => this.processAllVacations(response.body))
		
	), {initialValue: []}

  );
  delete(vacation: Vacation){
	
  }
  
  	
  
  loading:Signal<boolean> = toSignal(this.vacationService.loadingStatus(), {initialValue:true});

  constructor(private vacationService: VacationControllerService, private util: WebVacationUtilityService, public dialog: MatDialog) {
	this.vacationService.getVacationsByUserId();
  }
}

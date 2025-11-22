
import {Component, Signal, Input, effect} from '@angular/core';

import { TripConfigComponent } from '../../components/vacation/trip-config/trip-config.component';
import { ConfirmationsComponent } from '../../components/vacation/confirmations/confirmations.component';
import { BudgetDashboardComponent } from '../../components/vacation/budget-dashboard/budget-dashboard.component';
import { TripDashboardComponent } from '../../components/vacation/trip-dashboard/trip-dashboard.component';
import { PrepaymentsComponent } from '../../components/vacation/prepayments/prepayments.component';
import { PrepaymentModalComponent } from '../../components/vacation/dynamic-modal-content/prepayment-modal/prepayment-modal.component';
import { FCCModalComponent } from '../../components/vacation/dynamic-modal-content/fcc-modal/fcc-modal.component';
import { ResearchComponent } from '../../components/vacation/research/research.component';

import Vacation from '../../models/vacation-planner/vacation.model';

import { VacationControllerService } from '../../services/vacation-planner/vacation-controller.service';
import { VacationProcessorService } from '../../services/vacation-processor/vacation-processor.service';
import { VacationUpdaterService } from '../../services/vacation-updater/vacation-updater.service';
import { WebVacationUtilityService } from '../../services/utility/web-vacation-utility.service';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule, MatButton } from "@angular/material/button";
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs/operators";
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    imports: [	MatToolbarModule, MatSelectModule, MatTableModule, MatButtonModule, MatTabsModule, ConfirmationsComponent,
				CommonModule, FormsModule, TripDashboardComponent, PrepaymentsComponent, TripConfigComponent, MatButton, BudgetDashboardComponent,
			 	FCCModalComponent, ResearchComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  selectedVacation?: Vacation | null = null;
  
  private dataSubscription: Subscription | undefined;
  
  vacationList?: Array<any>;
  currentTab: string = "";
  
  constructor(private vacationService: VacationControllerService,
			  private util: WebVacationUtilityService,
			  public dialog: MatDialog,
			  private processor: VacationProcessorService,
		  	  private vacationUpdater: VacationUpdaterService) {
  	this.vacationService.getVacationsByUserId();
  }
  
  ngOnInit(){
	this.dataSubscription = this.vacationUpdater.sharedData$.subscribe(data=>{
		
		this.selectedVacation = data;
	});
  }
  ngOnDestroy(){
	this.dataSubscription?.unsubscribe();
  }
  
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
  
  generateModal(modalTarget:string){
	if(modalTarget){
		var data = {
			vacation_id: this.selectedVacation?.id,
			vacation: this.selectedVacation
		}
		this.util.generateModal(modalTarget, data);
	}
  }
  
  /*_getModalComponentDataItems(modalTarget:string):any{
	var resp:any = {
		component:null,
		dialogConfig:{
			vacation_id: this.selectedVacation?.id
		}
	}
	switch(modalTarget){
		case "new-prepayment":
			resp.component = PrepaymentModalComponent;
			break;
		case "new-fcc":
			resp.component = FCCModalComponent;
			break;
	}
	
	return resp;
  }
  
  generateModal(modalTarget:string): void{
	if(modalTarget){
		const dialogConfig = new MatDialogConfig();
		
		var dialogConfigData = this._getModalComponentDataItems(modalTarget);
		dialogConfig.data = dialogConfigData.dialogConfig;
		
		const dialog = this.dialog.open(dialogConfigData.component, dialogConfig);
		
		
		dialog.afterClosed().subscribe(result=>{
			
		})
	}
  }*/
  
  processAllVacations(body: any){console.log(body);
	for(var index = 0; index<body.length; index++){
		const vacation = body[index];
		
		body[index] = this.processor.processSingleVacation(vacation);
	}

	return body;
  }
  
  processVacationList(body:any){
	
	this.vacationList = body;
	
	if(this.vacationList?.length == 1){
		var vacationID = this.vacationList[0].key;
		
		this.setSelectedVacation(null, vacationID);
	}
	
	return body;
  }
  
  setSelectedVacation(evt:any, vacationID:number){
	this.currentTab = "trip_dashboard";
	var id = vacationID;
	
	if(evt || vacationID == -1){
		id = evt.value.key;
	}
	

  	this.vacationService.getVacationByID(id).subscribe({
  		next:(resp) =>{
  			this.vacationUpdater.updateVacation(resp.body);
  		},
  		error:(err:any) =>{
  			
  		}
  	});
  }
  
  vacations: Signal<Vacation[] | [] | null> = toSignal(this.vacationService.getVacationListByUserID().pipe(
  	map(response => this.processVacationList(response.body))
  		
  	), {initialValue: []}

  );
  
  /*vacations: Signal<Vacation[] | [] | null> = toSignal(this.vacationService.getVacationsByUserId().pipe(
	map(response => this.processAllVacations(response.body))
		
	), {initialValue: []}

  );*/
  delete(vacation: Vacation){
	
  }
  
  	
  
  loading:Signal<boolean> = toSignal(this.vacationService.loadingStatus(), {initialValue:true});

  
}

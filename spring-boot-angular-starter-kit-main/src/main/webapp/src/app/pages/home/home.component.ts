
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
import {VacationProcessorService} from '../../services/vacation-processor/vacation-processor.service';
import {VacationUpdaterService} from '../../services/vacation-updater/vacation-updater.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-home',
    imports: [MatToolbarModule, MatSelectModule, MatTableModule, MatButtonModule, MatTabsModule, ConfirmationsComponent,
			 CommonModule, FormsModule, TripDashboardComponent, PrepaymentsComponent, TripConfigComponent, MatButton, PrepaymentModalComponent],
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
	this.dataSubscription = this.vacationUpdater.sharedData$.subscribe(data=>{console.log("home updater");console.log(data);
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
  
  generateModal(): void{	
	const dialogConfig = new MatDialogConfig();
	dialogConfig.data = {
		vacation_id: this.selectedVacation?.id
	}
	
	const dialog = this.dialog.open(PrepaymentModalComponent, dialogConfig);
	
	dialog.afterClosed().subscribe(result=>{
		console.log(result);
	})
  }
  
  processAllVacations(body: any){console.log(body);
	for(var index = 0; index<body.length; index++){
		const vacation = body[index];
		
		body[index] = this.processor.processSingleVacation(vacation);
	}

	return body;
  }
  
  processVacationList(body:any){
	
	this.vacationList = body;
	
	return body;
  }
  
  setSelectedVacation(evt:any){
  	this.vacationService.getVacationByID(evt.value.key).subscribe({
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

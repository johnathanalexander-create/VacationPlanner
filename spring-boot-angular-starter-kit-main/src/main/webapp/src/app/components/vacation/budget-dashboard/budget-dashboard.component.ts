import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Vacation from '../../../models/vacation-planner/vacation.model';
import BudgetItem from '../../../models/vacation-planner/budget_item.model';
import {VacationUpdaterService} from '../../../services/vacation-updater/vacation-updater.service';
import {Subscription} from 'rxjs';
import {BudgetItemModalComponent} from '../dynamic-modal-content/budget-item-modal-component/budget-item-modal-component.component';
import { ViewChild, AfterViewInit } from '@angular/core';
import { WebVacationUtilityService } from '../../../services/utility/web-vacation-utility.service';

@Component({
  selector: 'app-budget-dashboard',
  imports: [MatTableModule, MatTooltipModule, MatSort],
  templateUrl: './budget-dashboard.component.html',
  styleUrl: './budget-dashboard.component.scss'
})
export class BudgetDashboardComponent {
	private _selectedVacation?: Vacation;
	
	@Input()
	set selectedVacation(value: Vacation){
		//this.dataSource.data = value.budgetItems;
		this.dataSource = new MatTableDataSource<BudgetItem>(value.budgetItems);
		this.dataSource.sort = this.sort;
		
		this._selectedVacation = value;
	}
	
	dataSource = new MatTableDataSource<BudgetItem>([]);//dataSource = new MatTableDataSource<BudgetItem>();
	
	@ViewChild(MatSort) sort!: MatSort;
	
	constructor(private vacationUpdater: VacationUpdaterService, private dialog:MatDialog, private util: WebVacationUtilityService){}
	
	private dataSubscription: Subscription | undefined;
	
	ngOnInit(){
		this.dataSubscription = this.vacationUpdater.sharedData$.subscribe(data=>{
			this.selectedVacation = data;
			
		});
	}
	ngAfterViewInit(){
		this.dataSource.sort = this.sort;
	}
	editBudgetItem(budgetItem:any){
		if(budgetItem){
			
			var data = {
				vacation_id: this._selectedVacation?.id,
				vacation: this._selectedVacation,
				budgetItem: budgetItem
			}
			
			this.util.generateModal("bi", data);
			
			/*const dialogConfig = new MatDialogConfig();
			dialogConfig.data = {
				budgetItem:budgetItem,
				vacation_id:this.selectedVacation?.id,
				vacation: this.selectedVacation
			}*/
			
			/*const dialog = this.dialog.open(BudgetItemModalComponent, dialogConfig);
			
			dialog.afterClosed().subscribe(result=>{

			});*/
		}
	}
	
	displayedColumns:string[] = ["item", "amount", "amountGoal", "cashRequirement", "notes"];
								 
	
}

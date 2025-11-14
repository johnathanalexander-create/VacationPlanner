import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import Vacation from '../../../models/vacation-planner/vacation.model';
import BudgetItem from '../../../models/vacation-planner/budget_item.model';
import {VacationUpdaterService} from '../../../services/vacation-updater/vacation-updater.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-budget-dashboard',
  imports: [MatTableModule, MatTooltipModule],
  templateUrl: './budget-dashboard.component.html',
  styleUrl: './budget-dashboard.component.scss'
})
export class BudgetDashboardComponent {
	@Input()
	set selectedVacation(value: Vacation){
		this.dataSource.data = value.budgetItems;
	}
	
	constructor(private vacationUpdater: VacationUpdaterService){}
	
	private dataSubscription: Subscription | undefined;
	
	ngOnInit(){
		this.dataSubscription = this.vacationUpdater.sharedData$.subscribe(data=>{
			console.log("new thing happening");console.log(data);
			this.selectedVacation = data;
		});
	}
	
	displayedColumns:string[] = ["item", "amount", "amountGoal", "cashRequirement", "notes"];
								 
	dataSource = new MatTableDataSource<BudgetItem>();
}

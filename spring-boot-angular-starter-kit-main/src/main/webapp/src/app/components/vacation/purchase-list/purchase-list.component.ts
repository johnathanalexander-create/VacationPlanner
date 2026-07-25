import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Vacation from '@models/vacation-planner/vacation.model';
import PackedItem from '@models/vacation-planner/packing/packed_item.model';
import { ViewChild, AfterViewInit } from '@angular/core';
import { VacationUpdaterService } from '@services/vacation-updater/vacation-updater.service';
import PurchaseItem from '@models/vacation-planner/purchase_item.model';

@Component({
  selector: 'app-purchase-list',
  imports: [MatTableModule, MatTooltipModule, MatSort],
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.scss'
})
export class PurchaseListComponent {
	private _selectedVacation?: Vacation;
	
	@ViewChild(MatSort) sort!: MatSort;
	
	displayedColumns:string[] = ["title", "status", "cost"];
	
	@Input()
	set selectedVacation(value: Vacation){
		//this.dataSource.data = value.budgetItems;

		this.dataSource = new MatTableDataSource<PurchaseItem>(value.purchaseItems);
		this.dataSource.sort = this.sort;
		
		this._selectedVacation = value;
	}
	
	dataSource = new MatTableDataSource<PurchaseItem>([]);
		
	constructor(private vacationUpdater: VacationUpdaterService){}
	
	ngOnInit(){
		this.vacationUpdater.sharedData$.subscribe(data=>{
			this.selectedVacation = data;
			
		});
	}
	
	doNothing(){}
}

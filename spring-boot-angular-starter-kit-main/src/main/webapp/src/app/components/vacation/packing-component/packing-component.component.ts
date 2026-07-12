import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Vacation from '@models/vacation-planner/vacation.model';
import PackedItem from '@models/vacation-planner/packing/packed_item.model';
import { ViewChild, AfterViewInit } from '@angular/core';
import { VacationUpdaterService } from '@services/vacation-updater/vacation-updater.service';

@Component({
  selector: 'app-packing-component',
  imports: [MatTableModule, MatTooltipModule, MatSort],
  templateUrl: './packing-component.component.html',
  styleUrl: './packing-component.component.scss'
})
export class PackingComponent {
	private _selectedVacation?: Vacation;
	
	@ViewChild(MatSort) sort!: MatSort;
	
	displayedColumns:string[] = ["title", "status", "mandatory"];
	
	@Input()
	set selectedVacation(value: Vacation){
		//this.dataSource.data = value.budgetItems;

		console.log(value.luggageSets[0].packedItems)
		this.dataSource = new MatTableDataSource<PackedItem>(value.luggageSets[0].packedItems);
		this.dataSource.sort = this.sort;
		
		this._selectedVacation = value;
	}
	
	dataSource = new MatTableDataSource<PackedItem>([]);
	
	constructor(private vacationUpdater: VacationUpdaterService){}
	
	ngOnInit(){
		this.vacationUpdater.sharedData$.subscribe(data=>{
			this.selectedVacation = data;
			
		});
	}
	
	doNothing(){}
}

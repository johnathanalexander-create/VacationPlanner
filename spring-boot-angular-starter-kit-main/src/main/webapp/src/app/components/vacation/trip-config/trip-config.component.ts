import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import Vacation from '../../../models/vacation-planner/vacation.model';
import VacationConfigItem from '../../../models/vacation-planner/vacation_config_item.model';
import { CommonModule } from '@angular/common';
import {VacationControllerService} from '../../../services/vacation-planner/vacation-controller.service';
import {VacationUpdaterService} from '../../../services/vacation-updater/vacation-updater.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-trip-config',
  imports: [MatTableModule, CommonModule, MatSort],
  templateUrl: './trip-config.component.html',
  styleUrl: './trip-config.component.scss'
})
export class TripConfigComponent implements AfterViewInit{
	@Input()
	set selectedVacation(value: Vacation){
		this.dataSource = new MatTableDataSource<VacationConfigItem>(value.config.configItems);
		this.dataSource.sort = this.sort;
	}
	
	dataSource = new MatTableDataSource<VacationConfigItem>([]);
	
	constructor(private service: VacationControllerService, private vacationUpdater: VacationUpdaterService){}
	
	
	displayedColumns:string[] = ["config_label", "config_value", "config_notes", "order"];
	
	@ViewChild(MatSort) sort!: MatSort;
	
	
	ngOnInit(){}
	
	ngAfterViewInit(){
		this.dataSource.sort = this.sort;
	}
	
	
	toggleEditMode(element:any, newValue:string){
		var save = false;
		if(element){
			
			if(element.is_editing){
				save = true;
			}
			
			element.is_editing = !element.is_editing;
			
			
			if(save){
				
				
				this.dataSource.data.forEach(function(value, index, array){
					if(value.id == element.id){
						value.config_value = newValue;
						
						array[index] = value;
					}
				});
				
				//Need to send api request
				this.service.saveConfigItem(element).subscribe({
					next:(resp) => {
						this.vacationUpdater.updateVacation(resp.body);
					}
				});
			}
		}
	}
}

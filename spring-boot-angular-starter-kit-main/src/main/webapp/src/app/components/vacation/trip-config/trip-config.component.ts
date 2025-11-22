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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import {WebVacationUtilityService} from '../../../services/utility/web-vacation-utility.service';


@Component({
  selector: 'app-trip-config',
  imports: [MatTableModule, CommonModule, MatSort, MatTooltipModule, MatInputModule],
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
	
	constructor(private service: VacationControllerService, private vacationUpdater: VacationUpdaterService, private util: WebVacationUtilityService){}
	
	
	displayedColumns:string[] = ["config_label", "config_value", "config_notes"];
	
	@ViewChild(MatSort) sort!: MatSort;
	
	
	ngOnInit(){}
	
	ngAfterViewInit(){
		this.dataSource.sort = this.sort;
	}
	
	generateModal(item:any){
		if(item){
			var data = {
				vacation_id: this.selectedVacation?.id,
				vacation: this.selectedVacation,
				config:item
			}
			
			this.util.generateModal("config", data);
		}
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

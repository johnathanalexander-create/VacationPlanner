import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import Vacation from '../../../models/vacation-planner/vacation.model';
import VacationConfigItem from '../../../models/vacation-planner/vacation_config_item.model';
import { CommonModule } from '@angular/common';
import {VacationControllerService} from '../../../services/vacation-planner/vacation-controller.service';


@Component({
  selector: 'app-trip-config',
  imports: [MatTableModule, CommonModule],
  templateUrl: './trip-config.component.html',
  styleUrl: './trip-config.component.scss'
})
export class TripConfigComponent {
	@Input()
	set selectedVacation(value: Vacation){
		this.dataSource = value.config.configItems;
	}
	
	constructor(private service: VacationControllerService){}
	
	
	displayedColumns:string[] = ["config_label", "config_value", "config_notes", "order"];
	dataSource:VacationConfigItem[] = []
	
	toggleEditMode(element:any, newValue:string){
		var save = false;
		if(element){
			
			if(element.is_editing){
				save = true;
			}
			
			element.is_editing = !element.is_editing;
			
			
			if(save){
				
				this.dataSource.forEach(function(value, index, array){
					if(value.id == element.id){
						value.config_value = newValue;
						
						array[index] = value;
					}
				});
				
				//Need to send api request
				this.service.saveConfigItem(element).subscribe({
					next:(resp) => {
						console.log("updated config");
						console.log(resp);
					}
				});
			}
		}
	}
}

import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import Vacation from '../../../models/vacation-planner/vacation.model';
import VacationConfigItem from '../../../models/vacation-planner/vacation_config_item.model';


@Component({
  selector: 'app-trip-config',
  imports: [MatTableModule],
  templateUrl: './trip-config.component.html',
  styleUrl: './trip-config.component.scss'
})
export class TripConfigComponent {
	@Input()
	set selectedVacation(value: Vacation){
		this.dataSource = value.config.configItems;
	}
	
	displayedColumns:string[] = ["config_label", "config_value", "config_notes", "order"];
	dataSource:VacationConfigItem[] = []
	
	/*ngOnInit(){
		this.fetchData();
	}
	
	fetchData(){
		setTimeout(()=>{
			this.dataSource = this.selectedVacation?.config.configItems ?? [];
		}, 1000);
		}*/
}

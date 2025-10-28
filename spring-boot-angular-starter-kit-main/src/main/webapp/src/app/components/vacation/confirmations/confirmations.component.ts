import { Component, Input } from '@angular/core';
import Vacation from '../../../models/vacation-planner/vacation.model';
import Confirmation from '../../../models/vacation-planner/confirmation.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-confirmations',
  imports: [MatTableModule],
  templateUrl: './confirmations.component.html',
  styleUrl: './confirmations.component.scss'
})
export class ConfirmationsComponent {
	@Input() selectedVacation?: Vacation | null = null;
	
	displayedColumns: string[] = ["description", "type", "confirmationCode", "date", "time", "notes"];
	dataSource: Confirmation[] = [];
	
	ngOnInit(){
		this.fetchData();
	}
	
	fetchData(){
		setTimeout(()=>{
			this.dataSource = this.selectedVacation?.confirmations ?? [];
		}, 1000);
	}
}

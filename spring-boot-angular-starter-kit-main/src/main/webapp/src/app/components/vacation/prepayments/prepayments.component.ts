import { Component, Input } from '@angular/core';
import Vacation from '../../../models/vacation-planner/vacation.model';
import Prepayment from '../../../models/vacation-planner/prepayment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

var ELEMENT_DATA: Prepayment[] = [
	{id: 4,description: 'test', vendor: 'test2', isRefundable: false, isRefundRequested: false, isRefundReceived: false, type: "", amount: 0, paymentSource: "", notes:""}
];

@Component({
  selector: 'app-prepayments',
  imports: [MatTableModule],
  templateUrl: './prepayments.component.html',
  styleUrl: './prepayments.component.scss'
})
export class PrepaymentsComponent {
	@Input() selectedVacation?: Vacation | null = null;
	
	displayedColumns:string[] = ["description", "type", "vendor", "isRefundable", 
								 "isRefundRequested", "isRefundReceived", "amount", 
								 "paymentSource", "notes"];
	
	dataSource = ELEMENT_DATA;//new MatTableDataSource<Prepayment>( ELEMENT_DATA );
	
	ngOnInit(){
		this.fetchData();
		
	}
	
	fetchData(){
		setTimeout(()=>{
			this.dataSource = this.selectedVacation?.prepayments ?? [];
			console.log("datasource");
			console.log(this.dataSource);
			//console.log(this.dataSource.data);
			console.log(this.selectedVacation);
		}, 1000);
	}
}

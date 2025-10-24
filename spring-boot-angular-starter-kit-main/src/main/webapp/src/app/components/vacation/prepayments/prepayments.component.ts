import { Component, Input } from '@angular/core';
import Vacation from '../../../models/vacation-planner/vacation.model';
import Prepayment from '../../../models/vacation-planner/prepayment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prepayments',
  imports: [MatTableModule],
  templateUrl: './prepayments.component.html',
  styleUrl: './prepayments.component.scss'
})
export class PrepaymentsComponent {
	
	@Input()
	set selectedVacation(value: Vacation){
		this.dataSource = value.prepayments;
	}
	
	displayedColumns:string[] = ["description", "type", "vendor", "isRefundable", 
								 "isRefundRequested", "isRefundReceived", "amount", 
								 "paymentSource", "notes"];
	
	dataSource:Prepayment[] = [];
	
	ngOnInit(){
		this.fetchData();
		
	}
	
	fetchData(){
		setTimeout(()=>{
			this.dataSource = this.selectedVacation?.prepayments ?? [];
		}, 1000);
	}
}

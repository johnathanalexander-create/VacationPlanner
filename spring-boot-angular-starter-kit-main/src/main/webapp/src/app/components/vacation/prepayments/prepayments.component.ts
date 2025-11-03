import { Component, Input } from '@angular/core';
import Vacation from '../../../models/vacation-planner/vacation.model';
import Prepayment from '../../../models/vacation-planner/prepayment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-prepayments',
  imports: [MatTableModule, MatTooltipModule],
  templateUrl: './prepayments.component.html',
  styleUrl: './prepayments.component.scss'
})
export class PrepaymentsComponent {
	
	@Input()
	set selectedVacation(value: Vacation){
		this.dataSource.data = value.prepayments;
	}
	
	displayedColumns:string[] = ["description", "type", "vendor", "isRefundable", 
								 "isRefundRequested", "isRefundReceived", "amount", 
								 "paymentSource", "notes"];
	
	//dataSource:Prepayment[] = [];
	dataSource = new MatTableDataSource<Prepayment>();
	
	/*ngOnInit(){
		this.fetchData();
		
		console.log("prepayments");
		console.log(this.dataSource.data);
		
	}
	
	fetchData(){
		setTimeout(()=>{
			//this.dataSource.data = this.selectedVacation?.prepayments ?? [];console.log("the other");console.log(this.dataSource.data);
		}, 1000);
	}*/
}

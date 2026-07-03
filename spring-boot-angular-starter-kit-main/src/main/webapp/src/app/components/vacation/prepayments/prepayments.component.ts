import { Component, Input } from '@angular/core';
import Vacation from '@models/vacation-planner/vacation.model';
import Prepayment from '@models/vacation-planner/prepayment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebVacationUtilityService } from '../../../services/utility/web-vacation-utility.service';
import { ModalService } from '../../../services/utility/modal-service/modal-service.service';

@Component({
  selector: 'app-prepayments',
  imports: [MatTableModule, MatTooltipModule],
  templateUrl: './prepayments.component.html',
  styleUrl: './prepayments.component.scss'
})
export class PrepaymentsComponent {
	
	private _selectedVacation: Vacation | null = null;
	
	@Input()
	set selectedVacation(value: Vacation){
		this._selectedVacation = value;
		this.dataSource.data = value.prepayments;
	}
	
	displayedColumns:string[] = ["description", "type", "vendor", "isRefundable", 
								 "isRefundRequested", "isRefundReceived", "amount", 
								 "paymentSource", "notes"];
	
	dataSource = new MatTableDataSource<Prepayment>();
	
	constructor(private util: WebVacationUtilityService, private modal: ModalService){}
	
	generateModal(item:any){
		if(item){
			var data = {
				vacation_id: this._selectedVacation?.id,
				vacation: this._selectedVacation,
				prepayment:item,
			}
			
			this.modal.generateModal("prepayment", data);
		}
	}
}

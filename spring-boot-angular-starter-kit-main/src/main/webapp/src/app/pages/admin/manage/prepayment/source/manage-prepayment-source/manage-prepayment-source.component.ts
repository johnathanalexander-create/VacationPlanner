import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import PrepaymentSource from '@models/vacation-planner/prepayment_source.model';

import { PrepaymentService } from '../../../../../../services/admin/prepayment/prepayment.service';
import { VacationControllerService } from "../../../../../../services/vacation-planner/vacation-controller.service";
import { ModalService } from '../../../../../../services/utility/modal-service/modal-service.service';

@Component({
  selector: 'app-manage-prepayment-source',
  imports: [MatTableModule, MatTooltipModule, MatSort, MatToolbar, MatToolbarRow, MatIconModule, FormsModule],
  templateUrl: './manage-prepayment-source.component.html',
  styleUrl: './manage-prepayment-source.component.scss'
})
export class ManagePrepaymentSourceComponent {
	displayedColumns:string[] = ["name", "cashback_rate", "active"];
	dataSource = new MatTableDataSource<PrepaymentSource>([]);
	
	showActiveOnly: boolean = true;
	
	@ViewChild(MatSort) sort!: MatSort;
	
	constructor(private service:PrepaymentService,
				private vacationService: VacationControllerService,
				private modal: ModalService){}
	
	ngOnInit(){
		this.load();
		

	}
	ngAfterViewInit(){
		this.dataSource.sort = this.sort;
	}
	
	load(){
		this.vacationService.getAllPrepaymentSources().subscribe({
			next:(resp) => {
				this.dataSource.data = resp?.body ?? [];
				console.log(resp);
			}
		});
	}
	
	applyActiveFilter(){
		const searchString = this.showActiveOnly.toString().toLowerCase();
		    
		    // Assigning the string to .filter triggers the table's built-in filter
		    this.dataSource.filter = searchString;
	}

	editPrepaymentSource(prepaymentSource:any){
		var data = {
			prepaymentSource:prepaymentSource
		}
		if(prepaymentSource){
			this.modal.generateModal("prepaymentsource", data);
		}
	}
	addSource(){
		this.modal.generateModal("prepaymentsource", {});
	}
	
	/*applyFilter(event: Event) {console.log(event);
	    const filterValue = (event.target as HTMLInputElement).value;
		alert(filterValue);
	    this.dataSource.filter = filterValue.trim().toLowerCase();
	 }*/
}

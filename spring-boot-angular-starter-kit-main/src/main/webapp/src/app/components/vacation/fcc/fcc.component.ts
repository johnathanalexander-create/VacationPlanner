import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import {VacationProcessorService} from '../../../services/vacation-processor/vacation-processor.service';
import {VacationUpdaterService} from '../../../services/vacation-updater/vacation-updater.service';
import { ModalService } from '../../../services/utility/modal-service/modal-service.service';

import FCC from '../../../models/vacation-planner/fcc.model';
import Vacation from '../../../models/vacation-planner/vacation.model';

@Component({
  selector: 'app-fcc',
  imports: [MatTableModule],
  templateUrl: './fcc.component.html',
  styleUrl: './fcc.component.scss'
})
export class FccComponent {
	_selectedVacation?: Vacation;
	
	constructor(private modal: ModalService){}
			
	@Input()
	set selectedVacation(value: Vacation){
		this.fccDataSource = new MatTableDataSource<FCC>(value.fcc);
		
		this._selectedVacation = value;
	}
	
	fccDataSource = new MatTableDataSource<FCC>([]);
		fccDisplayedColumns:string[] = ["fccTitle", "fccAmount"];
		
	generateModal(item:any){
		if(item){
			var data = {
				vacation_id: this._selectedVacation?.id,
				vacation: this._selectedVacation,
				fcc:item,
			}

			this.modal.generateModal("fcc", data);
		}
	}
}

import { Component, Input } from '@angular/core';
import Vacation from '../../../models/vacation-planner/vacation.model';

@Component({
  selector: 'app-confirmations',
  imports: [],
  templateUrl: './confirmations.component.html',
  styleUrl: './confirmations.component.scss'
})
export class ConfirmationsComponent {
	@Input() selectedVacation?: Vacation | null = null;
}

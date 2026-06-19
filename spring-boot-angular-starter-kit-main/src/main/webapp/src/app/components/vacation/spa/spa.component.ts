import { Component, Input } from '@angular/core';
import Vacation from '../../../models/vacation-planner/vacation.model';

@Component({
  selector: 'app-spa',
  imports: [],
  templateUrl: './spa.component.html',
  styleUrl: './spa.component.scss'
})
export class SpaComponent {
	@Input() selectedVacation?: Vacation | null = null;
}

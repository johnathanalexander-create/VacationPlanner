import { Component, HostBinding, EventEmitter, Output, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-notes',
  imports: [],
  templateUrl: './sticky-notes.component.html',
  styleUrl: './sticky-notes.component.scss'
})
export class StickyNotesComponent {
	//notes = [];
	
	@Input()
	size?:string;
	
	onDismiss(event:any){
	  //this.dismiss.emit(event);
	}

	onFocusOut(event:any){
	  //this.focusout.emit(event)
	}
}

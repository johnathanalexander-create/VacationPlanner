import { Component } from '@angular/core';
import { StickyNotesComponent } from '../../sticky-notes/sticky-notes.component';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-research',
  imports: [StickyNotesComponent, CommonModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent {
	notes: any[] = [];
	
	addNote (size:string) {
		if(size == null || size == ""){
			size = "md";
		}
		const noteObj = { 
			id: this.notes.length + 1,
			content:'',
			size: size
		}
		this.notes.push(noteObj);
		// sort the array
		this.notes= this.notes.sort((a,b)=>{ return b.id-a.id});
		//localStorage.setItem('notes', JSON.stringify(this.notes));
	};
	
	saveNote(event:any){
	  const id = event.srcElement.parentElement.parentElement.getAttribute('id');
	  const content = event.target.innerText;
	  event.target.innerText = content;
	  const json = {
	    'id':id,
	    'content':content
	  }
	  this.updateNote(json);
	  //localStorage.setItem('notes', JSON.stringify(this.notes));
	  console.log("********* updating note *********")
	}
	
	deleteNote(event:any){
	   const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
	   this.notes.forEach((note, index)=>{
	    if(note.id== id) {
	      this.notes.splice(index,1);
	      //localStorage.setItem('notes', JSON.stringify(this.notes));
	      console.log("********* deleting note *********")
	      return;
	    }
	  });
	}
	updateNote(newValue:any){
	  this.notes.forEach((note, index)=>{
	    if(note.id== newValue.id) {
	      this.notes[index].content = newValue.content;
	    }
	  });
	}
	updateAllNotes() {
	    console.log(document.querySelectorAll('app-note'));
	    let notes = document.querySelectorAll('app-note');

	    notes.forEach((note, index)=>{
	         //console.log(note.querySelector('.content').innerHTML)
	         //this.notes[note.id].content = note.querySelector('.content').innerHTML;
	    });

	    //localStorage.setItem('notes', JSON.stringify(this.notes));

	  }
}

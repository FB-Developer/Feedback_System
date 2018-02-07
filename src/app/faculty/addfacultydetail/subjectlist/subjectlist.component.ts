import { Component,Input, OnInit } from '@angular/core';
import{FBsubject}from'../../../fbmodel/fbsubjectdt';
import {FormGroup,FormBuilder,Form,FormArray,Validators} from '@angular/forms';

@Component({
  selector: 'fb-subjectlist',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css']
})
export class SubjectlistComponent implements OnInit {
  @Input('sectionFG')
  sectionFG:FormGroup;
  @Input('subjectList')
  subjectList:FBsubject[];

  constructor(private fb:FormBuilder) { }
  ngOnInit() {
      this.subjectList.push(new FBsubject());
      this.sectionFG.addControl('subjectList',this.fb.array([]));
  }
  addSubject(){
    let subject =new FBsubject();
    subject.subname="";
    this.subjectList.push(subject);
  }
  removeSubject(indx){
    if(this.subjectList.length>1)
      {
        this.subjectList.splice(indx,1);
        (<FormArray>this.sectionFG.controls['subjectList']).removeAt(indx);
      }
  }
}

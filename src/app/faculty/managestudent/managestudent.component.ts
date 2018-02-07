import { Component, OnInit } from '@angular/core';
import {config} from '../facultyconfig';
import {ManagestudentService} from './managestudent.service';
import * as _ from 'lodash';
@Component({
  selector: 'fb-managestudent',
  templateUrl: './managestudent.component.html',
  styleUrls: ['./managestudent.component.css']
})

export class ManagestudentComponent implements OnInit {
  academicyearList=config.academicyearList;
  degreeList=config.degreeList;
  departmentList=config.departmentList;
  semList=config.semList;
  classList= config.classList;
  academicyear='2017-18';
  dept='CE';
  degree='BE';
  sem='7';
  class='1';
  studentList:any[];
  tempList:any[];
  userId;
  deleteList:string[];deleteFlag=false;
  userName;completed:string='All';
  errormesg;allselected:boolean=false;

  constructor(private manageser:ManagestudentService) { }
  ngOnInit() {
    this.loadStudentList();
  }
  setCompleted(id:string,completed:boolean)
  {
    this.manageser.setCompleted(id,completed)
      .subscribe(dt=>{console.log('****',dt);});
  }
  findByCompletedStatus()
  {
      if(this.completed=='All')
        this.tempList=this.studentList;
      else if(this.completed=='Completed')
        this.tempList=_.filter(this.studentList,(student)=>{
            return student.studentdetail.completed;
          });
        else
        this.tempList=_.filter(this.studentList,(student)=>{
            return !student.studentdetail.completed;
        });
  }
  findByUserID()
  {
    this.tempList=_.filter(this.studentList,(student)=>{
          return student.userId.includes(this.userId);
          });
  }
  cbSelected(id:string,event){
      if(!this.deleteList)
        this.deleteList=new Array();
      let indx=this.deleteList.indexOf(id);
      if(event.target.checked && indx==-1)
        this.deleteList.push(id);
      else if(indx >= 0)
        this.deleteList.splice(indx,1);
    this.deleteFlag=false;
    if(this.deleteList.length>0)
        this.deleteFlag=true;
        this.deleteList.map(temp=>console.log('****',temp));
    console.log('----',this.deleteList.length);
}
  findByUserName()
  {
    this.tempList=_.filter(this.studentList,(student)=>{
          return student.userName.toLowerCase().includes(this.userName.toLowerCase());
          });
  }
  loadStudentList()
  {
    this.manageser.getStudentList(this.academicyear,this.dept,this.class,this.sem,this.degree)
    .subscribe((dt)=>{
      if(dt.status)
      {
        this.errormesg=null;
        this.studentList=this.tempList=dt.mesg;
      }
      else
      {
        this.errormesg=dt.mesg;
        this.studentList=this.tempList=null;
      }
    })
  }
  selectall(event){
      console.log('****',event);
      if(this.allselected)
        this.deleteFlag=true;
    else
    this.deleteFlag=false;
  }
}

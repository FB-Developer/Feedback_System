import { Component, OnInit } from '@angular/core';
import {GetformsService} from './getforms.service';
import {config} from '../facultyconfig';
import {Router} from '@angular/router';

class FormInfo{
  academicyear:string;
  dept:string;
  sem:string;
  class:string;
  degree:string;
}
@Component({
  selector: 'fb-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
fbroot:FormInfo[];
academicyearList=config.academicyearList;
departmentList=config.departmentList;
academicyear:string='2017-18';
dept:string='CE';
  constructor(private gf:GetformsService, private router:Router) { }

  ngOnInit() {
    this.loadFormField();
  }
  loadFormField(){
    if(this.academicyear&&this.dept)
    {
      this.gf.getForms(this.academicyear,this.dept)
      .subscribe((result)=>{
        this.fbroot=result;
      });
    }
  }
  viewDetail(detail:FormInfo)
  {
    this.router.navigate(['faculty/forms/formdetail',detail.academicyear,detail.dept,detail.sem,detail.class,detail.degree]);
  }
  deleteForm(detail:FormInfo)
  {
    console.log("****",detail);
  }

}

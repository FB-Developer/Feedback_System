import { Component, ChangeDetectorRef,OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Form,Validators} from '@angular/forms';
import {config} from '../../facultyconfig';
import{FBroot}from'../../../fbmodel/fbrootdt';
import {Router} from '@angular/router';
import {SubmitfbdetailService} from '../submitfbdetail.service';
import swal from 'sweetalert2';
@Component({
  selector: 'fb-facultyroot',
  templateUrl: './facultyroot.component.html',
  styleUrls: ['./facultyroot.component.css']
})
export class FacultyrootComponent implements OnInit {
  rootFG:FormGroup;
  rootDT:FBroot;
  academicyearList=config.academicyearList;
  degreeList=config.degreeList;
  departmentList=config.departmentList;
  semList=config.semList;
  classList= config.classList;
  loggedInUser:string;
  errorMesg;
  constructor(private fb:FormBuilder,private fbdetailserv:SubmitfbdetailService,private route:Router,private cd:ChangeDetectorRef) {
  }
  ngOnInit() {
    const temp = JSON.parse(localStorage.getItem('loggedInUser'));
    this.loggedInUser=temp.userName;
    this.createRootDT();
    this.rootFG=this.fb.group({
      academicyear:[this.rootDT.academicyear,Validators.required],
      degree:[this.rootDT.degree,Validators.required],
      dept:[this.rootDT.dept,Validators.required],
      sem:[this.rootDT.sem,Validators.required],
      class:[this.rootDT.class,Validators.required]
    });
    this.cd.detectChanges();
  }
  createRootDT(){
      this.rootDT=new FBroot();
      this.rootDT.academicyear="2017-18";
      this.rootDT.degree="BE";
      this.rootDT.dept="CE";
      this.rootDT.sem="1";
      this.rootDT.class="1";
      this.rootDT.sectionList=new Array();
  }
  onSubmit(value:FBroot){
    swal({
            title: 'Confirm Submit',
            text: 'Really Want to submit?',
            type: 'question',
            showCancelButton:true,
            confirmButtonText: 'Submit',
            cancelButtonText:'Cancel'
          }).then(result=>{
          if(result.value==true){
            this.fbdetailserv.sendFBDetail(value)
            .subscribe((temp) => {
              if (temp.status) {
                this.errorMesg = "";
                swal({
                        title: 'Success',
                        text: 'Submitted Succesfully',
                        type: 'success',
                        confirmButtonText: 'Done'
                      }).then((result)=>
                        this.route.navigate(['/faculty'])
                      );
              }
              else {
                swal({
                        title: 'Error',
                        text: temp.mesg,
                        type: 'error',
                        cancelButtonText:'Close'
                      });
              }
            },
            (error) => {
              this.errorMesg = error;
              swal({
                      title: 'Error',
                      text: this.errorMesg,
                      type: 'error',
                      cancelButtonText:'Close'
                    });
            }
            );
          }
  });
  }
}

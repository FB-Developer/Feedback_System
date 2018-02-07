import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions,Response} from '@angular/http';
import{Observable}from'rxjs/Observable';
import'rxjs/add/operator/map';
import'rxjs/Rx'
import {FBroot} from '../../fbmodel/fbrootdt';
@Injectable()
export class GetformsService {
  url1:string='http://100.100.102.124:4400/users/fbformlistbydept';
  urlformdetail:string='http://100.100.102.124:4400/users/fbformdetail';
  constructor(private http:Http){
  }
  getForms(ayear:string,dept:string){
    let tempurl1=this.url1+'?academicyear='+ayear+'&dept='+dept;
    console.log('****',tempurl1);
    return this.http.get(tempurl1)
      .map((response:Response)=>response.json());
  }

  getFormDetail(academicyear:string,dept:string,class1:string,sem:string,degree:string){
    let tempurl1=this.urlformdetail+'?academicyear='+academicyear+'&dept='+dept+'&class='+class1+'&degree='+degree+'&sem='+sem;
    console.log('****',tempurl1);
    return this.http.get(tempurl1)
      .map((response:Response)=>response.json());
  }
}

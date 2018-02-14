import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions,Response} from '@angular/http';
import{Observable}from'rxjs/Observable';
import'rxjs/add/operator/map';
import'rxjs/Rx'
@Injectable()
export class FbresultService {
url:string='http://100.100.102.124:4400/fbresult';
  constructor(private http:Http) { }

  getOverallFB(ayear:string,dept:string){
    let tempurl1=this.url+'/overall?academicyear='+ayear+'&dept='+dept;
    console.log('****',tempurl1);
    return this.http.get(tempurl1)
      .map((response:Response)=>response.json());
  }
  getFacultyFB(ayear:string,dept:string,fname:string)
  {
      let tempurl1=this.url+'?academicyear='+ayear+'&dept='+dept+'&fname='+fname;
      console.log('****',tempurl1);
      return this.http.get(tempurl1)
        .map((response:Response)=>response.json());
  }
}

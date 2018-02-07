import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions,Response} from '@angular/http';
import {FBroot} from '../../fbmodel/fbrootdt'
import{Observable}from'rxjs/Observable';
import'rxjs/add/operator/map';
import'rxjs/Rx'
@Injectable()
export class SubmitfbdetailService {
  urlfb:string='http://100.100.102.124:4400/users/addfbdetail'

  constructor(private http:Http) { }
  sendFBDetail(result:FBroot){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlfb,result,options)
      .map((response:Response)=>response.json());

  }
}

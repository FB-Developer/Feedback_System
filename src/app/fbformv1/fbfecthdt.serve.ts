import {Injectable} from'@angular/core';
import {Http,Headers,RequestOptions,Response} from '@angular/http';
import{Observable}from'rxjs/Observable';
import'rxjs/add/operator/map';
import'rxjs/Rx'
import { FBrequest, FBrequestresult } from './fbmodel/fbresult';

@Injectable()
export class FBfetchDtServe{
  urlfbresult:string='http://100.100.102.124:4400/users/addfbresult'
  urlfb:string='http://100.100.102.124:4400/users/fbdetailv1'
  urlfbsetcompleted:string='http://100.100.102.124:4400/users/setcompleted'

  constructor(private http:Http){}
  getRootDt(temp:any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlfb,temp,options)
      .map((response:Response)=>response.json());

  }

  setCompletedStatus(temp:any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlfbsetcompleted,temp,options)
      .map((response:Response)=>response.json());

  }

  sendFBresult(result:FBrequestresult){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlfbresult,result,options)
      .map((response:Response)=>response.json());

  }
}

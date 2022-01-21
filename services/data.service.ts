import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId : string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_name: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated 

      this.api.checkLogin(user_name,password).subscribe(data=>{
  if(data.id!=null){
  localStorage.setItem('id',String(data.id))
   localStorage.setItem('token',String(data.token))
this.isLogIn.next(true);
  }
  else{
      this.isLogIn.next(false);
 
  }
},error=>{
  //localStorage.setItem('userId','-1');
  // this.isLogIn.next(false);
   throwError(error.error);
});
    return of(this.isLogIn.value);
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status
return of(this.isLogIn.value);
  }

  regNewUser(regNewUser): Observable<any> {
    // should return response retrieved from ApiService

    // handle error 

    let result;
this.api.regNewUser(regNewUser).subscribe(data=>result=data,error=>throwError(error));
    // should return response retrieved from ApiService

    // handle error 

    return of(result);
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
     localStorage.removeItem('id');
     localStorage.removeItem('token');
 // localStorage.setItem('userId',null);
this.isLogIn.next(false);
  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service

    let user;
    // should return user details retrieved from api service
this.api.getUserDetails(localStorage.getItem('id')).subscribe(data=>user=data,error=>this.handleError);
    return of(user);
  }

  updateProfile(userId:string, userDetails): Observable<boolean> {
    // should return response retrieved from ApiService

    // handle error 

      let result=false;
    // should return the updated status according to the response from api service
this.api.updateDetails(userId,userDetails).subscribe(res=>result=true,error=>this.handleError);

    return of(result);
  }

  registerPatient(patientDetails): Observable<any> {
  let result;
this.api.registerPatient(patientDetails).subscribe(data=>result=data,error=>throwError(error));
    // should return response retrieved from ApiService

    // handle error 

    return of(result);
  }

  getAllPatientsList(): Observable<any> {
   let res;
    // should return all patients list retrieved from ApiService

    // handle error 
this.api.getAllPatientsList().subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }

  getParticularPatient(id): Observable<any> {
    let res;
    // should return all patients list retrieved from ApiService

    // handle error 
this.api.getParticularPatient(id).subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }
  
  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error 
 let res;
  this.api.diseasesList().subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
 
    let res;
    // should return all patients list retrieved from ApiService

    // handle error 
this.api.scheduleAppointment(appointmentDetails).subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }

  getSinglePatientAppointments(patientId): Observable<any> {
    
     let res;
    // should return all patients list retrieved from ApiService

    // handle error 
this.api.getSinglePatientAppointments(patientId).subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }

  deleteAppointment(appointmentId): Observable<any> {
      let res;
    // should return all patients list retrieved from ApiService

    // handle error 
this.api.deleteAppointment(appointmentId).subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }

  requestedAppointments(): Observable<any> {
    let res;
    // should return all patients list retrieved from ApiService

    // handle error 
this.api.requestedAppointments().subscribe(data=>res=data,error=>this.handleError);
    return of(res);
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
	 return throwError(error);
  }

}


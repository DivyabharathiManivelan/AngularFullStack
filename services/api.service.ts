import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable , of, throwError} from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;

  constructor(private http: HttpClient) {
    
    this.API_URL = 'api';

  }

  public checkLogin(user_name: string, password: string): Observable<any> {
    // should return response from server

    // handle error 

    const url=this.API_URL+'/signin'

    // handle error 

    //return this.http.post<any>(url,{'username':username,'password':password}).pipe(tap(error=>this.handleError(error)));
     return this.http.post<any>(url,{'user_name':user_name,'password':password}).pipe(catchError(this.handleError));
  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server
  const url=this.API_URL+'/register'
    // handle error 

   return this.http.post<any>(url,regNewUser).pipe(catchError(this.handleError));
  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error 
const url=this.API_URL+'/viewprofile/'+userId;
    // handle error 

    return this.http.get<any>(url).pipe(catchError(this.handleError));
     }

  public updateDetails(userId:string, userDetails: any): Observable<any> {
    // should return response from server

     const url=this.API_URL+'/editprofile/'+userId;

    // handle error 

    return this.http.put<any>(url,userDetails).pipe(catchError(this.handleError));
  }

  public registerPatient(patient: any): Observable<any> {
    // should return response from server if patientDetails added successfully

   const url=this.API_URL+'/patients/register';

    return this.http.post<any>(url,patient).pipe(catchError(this.handleError));
  }

  public getAllPatientsList(): Observable<any> {
    // should return all patients from server

   const url=this.API_URL+'/patients/list/';
    // handle error 

    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  public getParticularPatient(patientId): Observable<any> {
    // should return particular patient details from server

    const url=this.API_URL+'/patients/view/'+patientId;
    // handle error 

    return  this.http.get<Users>(url).pipe(catchError(error=>this.handleError));
  }

  public diseasesList(): Observable<any> {
    // should return diseases from server

   
  const url=this.API_URL+'/diseases';
    // should return diseases from server

    // handle error 

    return this.http.get<any>(url).pipe(catchError(error=>this.handleError));
  }

  public scheduleAppointment(appointmentDetails: any) : Observable<any>{
    // should return response from server if appointment booked successfully
const url=this.API_URL+'/appointment/register';
    // should return response from server if appointment booked successfully

    // handle error 

    return this.http.post<any>(url,appointmentDetails).pipe(catchError(error=>this.handleError));
  }

  public getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

   const url=this.API_URL+'/appointment/list/'+patientId;
    // handle error 

    return  this.http.get<any>(url).pipe(catchError(error=>this.handleError));
  }

  public deleteAppointment(appointmentId): Observable<any>  {
    // should delete the appointment

    const url=this.API_URL+'/appointment/delete/'+appointmentId;
    // should delete the appointment

    // handle error

    return this.http.delete<any>(url).pipe(catchError(error=>this.handleError));
  }

  public requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    const url=this.API_URL+'/appointment/list';
    // should return all requested appointments from server

    // handle error 

   return this.http.get<any>(url).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error);
  }

}

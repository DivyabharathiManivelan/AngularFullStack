import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  listOfDiseases;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    // add necessary validators

    this.appointmentForm = fb.group({
      'selectDisease' : [null,[Validators.required]],
      'tentativeDate' : [null,[Validators.required]],
      'priority' : [null,[Validators.required]]
    })
   }

  ngOnInit() {

    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property
let id= this.activatedRoute.snapshot.params['patientId'];
    this.dataService.getParticularPatient(id).subscribe(data=>this.patient=data,error=>throwError(error));
  }

  bookAppointment() {
    // get diseases list from service
  this.isBookAppointment=true;
    this.isScheduledAppointment=false;
    this.isFormEnabled=true;
this.isTableEnabled=false;
    // get diseases list from service
this.dataService.diseasesList().subscribe(list=>this.listOfDiseases=list);
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
  }
 get f() { return this.appointmentForm.controls; }
  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, disease, priority, tentativedate

    // if booked successfully should redirect to 'requested_appointments' page
    this.appointmentForm.controls['patientId']=this.patient.id;
this.appointmentForm.controls['patientFirstName']=this.patient.firstName;
this.appointmentForm.controls['patientLastName']=this.patient.lastName;
this.appointmentForm.controls['registeredTime']=this.patient.registeredTime;
    // The below attributes to be added while booking appointment using service
    // patientId, patientFirstName, patientLastName, disease, priority, tentativedate, registeredTime
this.appointmentDetails=new Appointment(this.appointmentForm.controls)
    // if booked successfully should redirect to 'requested_appointments' page
    let res;
    this.dataService.scheduleAppointment(this.appointmentDetails).subscribe(
      result=>{res=result; if(res!=null){
this.route.navigate(['requested_appointments']);
    }
      },error=>{});
   
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    // get particular patient appointments using getSinglePatientAppointments method of DataService 
this.isBookAppointment=false;
this.isScheduledAppointment=true;
this.isFormEnabled=false;
this.isTableEnabled=true;

this.dataService.getSinglePatientAppointments(this.patient.patient_Id).subscribe(apdata=>this.appointmentDetails=apdata);
  }

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments
let bool;
    try{
this.dataService.deleteAppointment(appointmentId).subscribe(res=>bool=res,error=>throwError(error));
    }
    catch(error){
      throwError(error);
    }
    // After deleting the appointment, get particular patient appointments
this.scheduledAppointment();
  }
  
}

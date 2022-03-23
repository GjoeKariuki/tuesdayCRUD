import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../services/api.service';



@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {

  recordsForm !: FormGroup;
   actionBtn: string='save';

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DetailsFormComponent>,
    @Inject( MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.recordsForm = this.formBuilder.group({
      admin_name: ['',Validators.required],
      lat: ['',Validators.required],
      lng: ['',Validators.required],
      population: ['',Validators.required],
      
    });

    if(this.editData){
      this.actionBtn = 'update';
      this.recordsForm.controls[`admin_name`].setValue(this.editData.admin_name);
      this.recordsForm.controls[`lat`].setValue(this.editData.lat);
      this.recordsForm.controls[`lng`].setValue(this.editData.lng);
      this.recordsForm.controls[`population`].setValue(this.editData.population);
    }
    //console.log(this.editData.id);
  }

  addRecord() {
    if(!this.editData){
      if(this.recordsForm.valid){
        this.api.postRecord(this.recordsForm.value).subscribe({
          next: (res) => {
            alert("record added successfully");
            this.recordsForm.reset();
            this.dialogRef.close('saved');
          }, 
          error: () => {
            alert('error while adding record')
          }
        });
      }
    }
    else { this.updateRecord(); }

  }

  updateRecord() {
    this.api.putRecord(this.recordsForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('record updated successfully');
        this.recordsForm.reset();
        this.dialogRef.close('updated');
      },
      error: () => {
        alert('error while updating');
      }
    });
  }

}

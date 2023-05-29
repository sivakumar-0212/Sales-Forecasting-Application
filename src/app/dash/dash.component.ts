import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  filename = '';
  fileuploadflag = false;
  perselectvalue = 'Day'

  periodControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  period: String[] = [
    'DAY',
    'WEEK',
    'MONTH',
    'YEAR'
  ];

  duration :any;
  color:any;
  message:any;
  homeform: any;
  
  constructor(private builder: FormBuilder,private http:HttpClient,private _snackbar:MatSnackBar) { }

  ngOnInit(): void {

  }

  onFileSelected(fileInputEvent: any) {
    //why const
    const file: File = fileInputEvent.target.files[0];

    if (file) {
      this.filename = file.name;
      this.fileuploadflag = true;
    }

  }

  numFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  // homeform = this.builder.group({
  //   num: this.builder.control('', Validators.required)
  // });


  changeClient(value: string) {
    // console.log(value);
    this.perselectvalue = value
  }

  openSnackbar(msgs:string,color:any,duration:any){
    this._snackbar.open(msgs,'',{
      horizontalPosition : "center",
      verticalPosition: "top",
      duration:duration,
      panelClass :[color]
    });
  }
}

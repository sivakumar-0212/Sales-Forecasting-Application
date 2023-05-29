import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MatSnackBar ,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public homeform !: FormGroup
  values :any;
  fileName= '';
  fileto:any;
  perselectvalue="Day";

  period:string[]=[
    'Day',
    'Week','Month','Year'
  ];

  horizontalPosition !: MatSnackBarHorizontalPosition;
  verticalPosition !: MatSnackBarVerticalPosition;

  duration :any;
  color:any;
  message:any;

  constructor(
    private router:Router,private builder: FormBuilder,
    private http:HttpClient,private spinner: NgxSpinnerService,private _snackbar:MatSnackBar
    ){}

  // homeform=new FormGroup({
  //   values:new FormControl('',Validators.required),
  //   period:new FormControl('',Validators.required),
  //   fileto:new FormControl('',Validators.required)
  // })
  ngOnInit(): void {
    
    this.homeform =this.builder.group({
      values:[''],
      period:[''],
    })
    this.homeform=new FormGroup({
      values:new FormControl('',Validators.required),
      period:new FormControl('',Validators.required),
      fileto:new FormControl('',Validators.required)
    })
  }

  openSnackbar(msgs:string,color:any,duration:any){
    this._snackbar.open(msgs,'',{
      horizontalPosition : "center",
      verticalPosition: "top",
      duration:duration,
      panelClass :[color]
    });
  }

  proceedhome(){
    if(!this.homeform.valid){
      //alert('Enter valid data');
      this.message = "Enter valid data";
      this.color = 'success-snackbar';
      this.duration=1000;
      this.openSnackbar(this.message,this.color,this.duration);
    }
    else{
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
      this.http.post<any>("http://localhost:3001/datas",this.homeform.value).subscribe(res=>{
        this.message = "Success";
        this.color = 'success-snackbar';
        this.duration=1000;
        this.openSnackbar(this.message,this.color,this.duration);
       },err=>{
        alert("kdjnsf")
       })
      //  this.http.post<any>('http://127.0.0.1:5000/predict',{'values':this.values}).subscribe(res=>{
      //    alert("hiii");
      //  },err=>{
      //     alert("nope")
      //  })
    }
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        const upload$ = this.http.post("/api/thumbnail-upload", formData);
        upload$.subscribe();
    }
  }

  changeClient(value:string){
    console.log(value);
    this.perselectvalue=value;
  }
}

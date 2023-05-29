import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar ,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
   hide = true;
   userdata:any;
   horizontalPosition !: MatSnackBarHorizontalPosition;
   verticalPosition !: MatSnackBarVerticalPosition;

    duration :any;
    color:any;
    message:any;

   constructor(private router:Router,private builder: FormBuilder,private _snackbar:MatSnackBar,private http:HttpClient){}
  //public loginform!:FormGroup
  // loginform: FormGroup|any;
  loginform=this.builder.group({
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required) ,
  });

  openSnackbar(msgs:string,color:any,duration:any){
    this._snackbar.open(msgs,'',{
      horizontalPosition : "center",
      verticalPosition: "top",
      duration:duration,
      panelClass :[color]
    });
  }
  submit(){
    this.http.get<any>("http://localhost:3001/user").subscribe(res=>{
      const users =res.find((a:any)=>{
        return a.name===this.loginform.value.name && a.password===this.loginform.value.password
      });
      if(this.loginform.valid){
      if(users){
        this.message = "Login Success✌️✌️";
        this.color = 'success-snackbar';
        this.duration=1000;
        this.openSnackbar(this.message,this.color,this.duration);
        this.loginform.reset();
        this.router.navigate(['dash'])
      }
      
    else if(this.loginform.value.password ===''){
      this.message = "Enter password!!";
      this.duration=2000;
      this.color = "failure-snackbar";
      this.openSnackbar(this.message,this.color,this.duration);    }
      else{
        this.message = "Enter valid credentials!!☹️☹️";
        this.duration=2000;
        this.color = "failure-snackbar";
        this.openSnackbar(this.message,this.color,this.duration);
      }
    }
    else{
      this.message = "Fill all details!! 😴😴";
          this.duration=2000;
          this.color = "failure-snackbar";
          this.openSnackbar(this.message,this.color,this.duration);
    }
    })
  }
}

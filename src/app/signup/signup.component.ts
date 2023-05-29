import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar ,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hide = true;
  duration :any;
  color:any;
  message:any;
  horizontalPosition !: MatSnackBarHorizontalPosition;
   verticalPosition !: MatSnackBarVerticalPosition;
  
  constructor(private router:Router,private builder: FormBuilder,private _snackbar:MatSnackBar,private http:HttpClient){}

  signupform=this.builder.group({
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required),
    vpassword:this.builder.control('',Validators.required)
  });

  openSnackbar(msgs:string,color:any,duration:any){
    this._snackbar.open(msgs,'',{
      horizontalPosition : "center",
      verticalPosition: "top",
      duration:duration,
      panelClass :[color]
    });
  }

  proceedsignup(){
    this.http.get<any>("http://localhost:3001/user").subscribe(res=>{
      const users =res.find((a:any)=>{
        return a.name===this.signupform.value.name
      });
      if(this.signupform.valid){
      if(!users){
        if(this.signupform.value.vpassword===this.signupform.value.password){
          this.http.post<any>("http://localhost:3001/user",this.signupform.value).subscribe(res=>{
            this.message = "signup Successfully!!(❁´◡`❁)";
        this.color = 'success-snackbar';
        this.duration=2000;
        this.openSnackbar(this.message,this.color,this.duration);
        this.signupform.reset();
        this.router.navigate(['login'])
      
          })
        }
        else{
          this.message = "Password must be same!!";
          this.duration=2000;
          this.color = "failure-snackbar";
          this.openSnackbar(this.message,this.color,this.duration);
        }
        }
        else{
          this.message = "Username already taken! try with other name !!";
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

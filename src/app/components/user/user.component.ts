import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Event to be fired (Pushed to app.component)
  @Output()
  onNewUser = new Subject<User>()

  // VARIABLES
  form!:FormGroup

  // CONSTRUCTOR
  constructor(private fb:FormBuilder) {}

  // METHODS
  ngOnInit(): void {
      this.form = this.createForm()
  }

  // Triggered upon 'Share' button
  processForm() {
    console.info('>>> Processing form', this.form.value)
    const formValue = this.form.value as User 
    // Pass User object to app.component
    this.onNewUser.next(formValue)
  }

  value() {
    return this.form.value as User
  }

  // Create new form (Clear form fields)
  clearForm() {
    this.form = this.createForm()
  }

  // Create form group from multiple data in form control
  private createForm():FormGroup {
    return this.fb.group({
      name:this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      email:this.fb.control<string>('',[Validators.required, Validators.email]),
      phone:this.fb.control<string>('',[Validators.required,Validators.minLength(8)]),
      dob:this.fb.control<Date>(new Date(),[Validators.required])
    })
  }
}

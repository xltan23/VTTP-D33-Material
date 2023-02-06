import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'D33W';

  @ViewChild(UserComponent)
  userComponent!:UserComponent

  // VARIABLES
  users:User[] = []
  canShare = false

  // CONSTRUCTOR
  constructor() {}

  // METHODS
  ngOnInit(): void {
    // Boolean value that shows whether form can be shared
    this.canShare = !!navigator.share
    // Automatically activates upon access to form
    console.info('Can share: ', this.canShare)      
  }

  ngAfterViewInit(): void {
      
  }

  // Method receives User object from user.component
  // Append User object into users array
  newUser(user:User) {
    this.users = [...this.users, user]
  }

  // Triggered upon 'Clear' button
  // Method calls method from user.component
  clearForm() {
    this.userComponent.clearForm()
  }

  // Triggered upon 'Share' button
  share() {
    const user = this.userComponent.value()
    console.info('>>> user: ', user)
    // Shared information format: 
    // Title of Email - title
    // Content of Email - text
    navigator.share({
      title:user.name, 
      text:`Email: ${user.email}, Phone: ${user.phone}`
    })
    .then(result => {
      console.info('>>> share result: ', result)
    })
    .catch(err => {
      console.error('>>> share error: ', err)
    })
  }
}

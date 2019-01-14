import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/directives/ng_form'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    console.info(form)
  }

}

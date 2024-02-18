import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, CommonModule, MatButtonModule, 
    HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public registerMode = false;
  users: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get("https://localhost:5001/api/users").subscribe({
      next: res => this.users = res,
      error: error => console.error(error),
      complete: () => console.log("Request has completed.")
    });
  }

  registerModeToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event: any) {
    this.registerMode = false;
  }
}

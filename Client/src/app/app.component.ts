import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;

  constructor(private httpClient: HttpClient) {
    
  }
  ngOnInit(): void {
    this.httpClient.get("https://localhost:5001/api/users").subscribe({
      next: res => this.users = res,
      error: error => console.error(error),
      complete: () => console.log("Request has completed.")
    });
  }

}

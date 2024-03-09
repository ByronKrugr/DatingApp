import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.scss'
})
export class TestErrorsComponent {
  private baseUrl = "https://localhost:5001/api/buggy/"

  constructor(private http: HttpClient) {
    
  }

  get404Error(event: any) {
    this.http.get(this.baseUrl + "not-found").subscribe(
      (res) => console.log(res),
      error => console.error(error)
    );
  }

  get400Error(event: any) {
    this.http.get(this.baseUrl + "bad-request").subscribe(
      (res) => console.log(res),
      error => console.error(error)
    );
  }

  get401Error(event: any) {
    this.http.get(this.baseUrl + "auth").subscribe(
      (res) => console.log(res),
      error => console.error(error)
    );
  }

  getServerError(event: any) {
    this.http.get(this.baseUrl + "server-error").subscribe(
      (res) => console.log(res),
      error => console.error(error)
    );
  }

  getValidationError(event: any) {
    this.http.post("https://localhost:5001/api/account/register", {}).subscribe(
      (res) => console.log(res),
      error => console.error(error)
    );
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { InputComponent } from '../../components/input/input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterModule,InputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private api: ApiService, private router: Router) {}
  databases: any;

  user = new FormControl('');

  password = new FormControl('');
  port = new FormControl('');

  form = new FormGroup({
    user: this.user,
    password: this.password,
    port: this.port,
  });

  onSubmit() {
    this.api
      .connectDb({
        password: this.password.value as string,
        port: this.port.value as any,
        user: this.user.value as string,
      })
      .subscribe((data) => {
        if (data.status === 200) {
          this.router.navigate(['/databases']);
        }
      });
  }
}

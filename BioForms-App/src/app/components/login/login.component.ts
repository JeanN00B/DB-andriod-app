import { Component, ViewChild, ElementRef } from '@angular/core';
import { SupabaseService } from 'src/service/supabase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;


  constructor (
    private supabaseService: SupabaseService, 
    private router: Router) { }

  async onLogin(email: string, password: string){
    if(!this.supabaseService.isLoggedIn()){
      await this.supabaseService.loginUser(email, password);
    }
  }

  async onSubmit() {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    await this.supabaseService.loginUser(email, password);

    if (this.supabaseService.isLoggedIn()) {
      // Successful login, redirect to the form component
      this.router.navigate(['/form']);
    } else {
      // Handle login error, display error message or toast
      console.error('Login failed:');
    }
  }
}

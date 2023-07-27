import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { FormComponent } from 'src/app/components/form/form.component';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private defaultUser: User | null = null;

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.publicKey);
  }

  public async loginUser(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    this.defaultUser = data?.user;
    console.log('Default user signed in successfully:', this.defaultUser);
  }


  isLoggedIn(): boolean {
    return this.defaultUser !== null;
  }

  public async logoutUser() {
    await this.supabase.auth.signOut();
    this.defaultUser = null;
  }

  createOrganism(data: any) {
    return this.supabase.from('biocollection').insert([data]);
  }
}

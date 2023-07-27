import { Component } from '@angular/core';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform, NavController } from '@ionic/angular';
import { SupabaseService } from 'src/service/supabase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'BioForms-App';
  popupMessage: string = '';

  constructor(
    private geolocation: Geolocation,
    protected platform: Platform,
    protected navController: NavController,
    ) {
      this.platform.ready().then(async () => {

      });
    }

}
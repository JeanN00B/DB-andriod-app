import { OnInit, OnDestroy, Component } from '@angular/core';
import { SupabaseService } from 'src/service/supabase.service';
import { Subscription } from 'rxjs';
import { Geolocation, Geoposition, PositionError } from '@awesome-cordova-plugins/geolocation/ngx';

//import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnDestroy, OnInit {
  formData: any = {};
  locationData: any = null;
  photoData: SafeResourceUrl | null = null;
  private geolocationSubscription: number | undefined;

  constructor(
    private supabaseService: SupabaseService,
    private geolocation: Geolocation,
    public platform: Platform,
    private sanitizer: DomSanitizer,
    private router: Router
    ) {}

  ngOnInit() {
    const options = {
      enableHighAccuracy: false,
      timeout: 4000,
      maximumAge: 0
    };

    this.geolocationSubscription = navigator.geolocation.watchPosition(
      (position: GeolocationPosition ) => {
        this.locationData = position.coords;
        console.log('Location data:', this.locationData);
    }, (error: PositionError) => {
      console.error('Error getting current position', error);
    }, 
    options);
  }

  ngOnDestroy() {
    //this.geolocationSubscription?.unsubscribe();
  }

  async onLogout() {
    try {
      await this.supabaseService.logoutUser();
      console.log('User logged out successfully');
      this.router.navigate(['/login']);
      this.ngOnDestroy();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  // Function to take a photo with the device's camera
  async takePhoto() {
    if (this.platform.is('cordova')) {
      try {
        const image: CameraPhoto = await Camera.getPhoto ({
          quality: 90,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
          correctOrientation: true
        });

        this.photoData = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpeg;base64,' + image.base64String
        );
      } catch (error) {
        console.error("Error selecting the photo: ", error);
      }
    } 
  }

  // Function to select a photo from the device's photo library
  async selectPhoto() {
    if (this.platform.is('cordova')) {
      try {
        const image: CameraPhoto = await Camera.getPhoto ({
          quality: 90,
          resultType: CameraResultType.Base64,
          source: CameraSource.Photos, //PHOTOLIBRARY, CAMERA, SAVEDPHOTOALBUM
          correctOrientation: true
        });
        this.photoData = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpeg;base64,' + image.base64String
        );
      } catch (error) {
        console.error("Error selecting the photo: ", error);
      }
    } else {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      //input.capture = 'environment';
      input.click();
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target?.files && target.files.length > 0) {
          const photoFile = target.files[0];
          this.photoData = URL.createObjectURL(photoFile);
        }
      };
    }
  }

  //prepare the data to be sent to the database
  onSubmit() {
    const dataToSend = {
      category: this.formData.category,
      name: this.formData.name,
      species: this.formData.species,
      description: this.formData.description,
      location: this.locationData ? `(${this.locationData.latitude?.toString() || "0"}, ${this.locationData.longitude?.toString() || "0"})` : '(0,0)', //comes from LocationComponent
      photo: this.photoData //comes from PhotoComponent
    };
    
    if (this.photoData) {
      try{
        const base64Data = this.safeResourceUrlToBase64(this.photoData);
        dataToSend.photo = base64Data;
      } catch (error) {
        console.error("Error converting the photo to base64: ", error);
      }
    }
    // Call the service to save the data to Supabase
    this.supabaseService.createOrganism(dataToSend).then(
      (response) => {
        console.log('Data sent successfully', response);
        //clear the form
        this.formData = {};
        this.locationData = null;
        this.photoData = null;
      },
      (error) => {
        console.error('Error sending data', error);
      }
    );
  }

  safeResourceUrlToBase64(safeResourceUrl: SafeResourceUrl): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(null);
      }
      fetch(safeResourceUrl.toString()).then((response) => {
        response.blob().then((blob) => {
          reader.readAsDataURL(blob);
        });
      });
    });
  }
}
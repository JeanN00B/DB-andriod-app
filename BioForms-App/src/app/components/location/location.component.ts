import { Component, EventEmitter, Output } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent {
  @Output() locationData = new EventEmitter<any>();

  async ngOnInit() {
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      this.locationData.emit(coordinates.coords);
    } catch (error) {
      console.error('Error getting current position', error);
    }
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.locationData.emit(coordinates.coords);
  }

}

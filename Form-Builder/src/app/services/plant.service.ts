import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private firestore: Firestore) { }
  addPlant(plant:any){
    const plantRef = collection(this.firestore, 'plants');
    return addDoc(plantRef, plant);
  }
}


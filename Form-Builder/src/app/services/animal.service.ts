import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  constructor(private firestore: Firestore) { }
  addAnimal(animal:any){
    const animalRef = collection(this.firestore, 'animals');
    return addDoc(animalRef, animal);
  }
}
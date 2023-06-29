import { Component, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-animal-editor',
  templateUrl: './animal-editor.component.html',
  styleUrls: ['./animal-editor.component.css']
})

export class AnimalEditorComponent {
  Animal = this.fb.group({
    animalName: ['', Validators.required],
    Description: [''],
    Specie: ['', Validators.required],
    Picture: ['']
  });

  constructor(
    private fb: FormBuilder,
    private animalService:AnimalService) { }

  async onSubmit() {
    const animalResponse = await this.animalService.addAnimal(this.Animal.value);
    console.log(animalResponse)
  }
}

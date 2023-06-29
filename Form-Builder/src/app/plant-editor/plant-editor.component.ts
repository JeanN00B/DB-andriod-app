import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-plant-editor',
  templateUrl: './plant-editor.component.html',
  styleUrls: ['./plant-editor.component.css']
})
export class PlantEditorComponent {
  Plant = this.fb.group({
    plantName: ['', Validators.required],
    Description: [''],
    Specie: ['', Validators.required],
    Picture: ['']
  });

  constructor(
    private fb: FormBuilder, 
    private plantService:PlantService) { }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    const plantResponse = await this.plantService.addPlant(this.Plant.value);
    console.log(plantResponse)
  }
}
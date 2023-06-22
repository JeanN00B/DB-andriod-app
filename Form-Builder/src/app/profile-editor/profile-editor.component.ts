import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  Animal = this.fb.group({
    animalName: ['', Validators.required],
    Description: [''],
    Specie: ['', Validators.required],
    Picture: ['']
  });

  constructor(private fb: FormBuilder) { }

  updateProfile() {
    this.Animal.patchValue({
      animalName: 'cat',
      Description: '4 legged mammal, agile, and a hunter',
      Specie: 'Felis catus',
      Picture: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    });
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.Animal.value);
  }
}

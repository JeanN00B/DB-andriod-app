import { Component } from '@angular/core';

export type EditorType = 'plant' | 'animal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editor: EditorType = 'animal';

  get showPlantEditor() {
    return this.editor === 'plant';
  }

  get showAnimalEditor() {
    return this.editor === 'animal';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}

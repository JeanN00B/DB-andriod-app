import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlantEditorComponent } from './plant-editor/plant-editor.component';
import { AnimalEditorComponent } from './animal-editor/animal-editor.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
//import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantEditorComponent,
    AnimalEditorComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    // other imports ...
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
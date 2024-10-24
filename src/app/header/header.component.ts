import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { startWith, map } from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule, ReactiveFormsModule,MatAutocompleteModule,
    AsyncPipe,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected from styleUrl to styleUrls
})
export class HeaderComponent implements OnInit {
  menuOpen: boolean = false;
  menu = ["Home", "About", "Services", "Contact"];
  newData: any = {};
  selectedCard: any = null;
  myControl = new FormControl();

  constructor(private supabaseService: SupabaseService) {}
  
  filteredOptions: string[] = [];



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.supabaseService.industries.filter(option => option.toLowerCase().includes(filterValue));
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openPopup() {
    this.selectedCard = true; // Open the popup
  }

  closePopup() {
    this.selectedCard = null; // Close the popup
    this.resetForm(); // Reset form data when closing the popup
  }

  ngOnInit() {
    this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    .subscribe(filteredOptions => {
      this.filteredOptions = filteredOptions;
    });
  }

  filter(): void {
  
  }


  submitForm() {
    // Validate that all required fields are filled and location is selected
 

    if (!this.newData.title || !this.newData.companyName || !this.newData.mobile || !this.newData.contactPerson || !this.newData.jobRole || !this.newData.description || !this.newData.walkInDate) {
      alert('Please fill all required fields.');
      return;
    }

    console.log('Form Data:', this.newData);
    // Optionally, save the data to the database here
    this.closePopup(); // Close the popup after submission
  }

  resetForm() {
    // Reset form data to default values
    this.newData = {
      title: '',
      companyName: '',
      mobile: '',
      contactPerson: '',
      jobRole: '',
      walkInDate: '',
      description: '',
      walkInLocation: '' // Reset walk-in location
    };
 
  }
  
}

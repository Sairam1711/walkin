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
      this.filteredOptions=filteredOptions
      this.newData.industry = filteredOptions[0];
      console.log(this.filteredOptions);
    });
  }

  filter(): void {
  
  }


  submitForm() {
    // Validate that all required fields are filled and location is selected
 

    if (!this.newData.job_title ||!this.newData.job_city || !this.newData.employer_name || !this.newData.mobile || !this.newData.job_role || !this.newData.job_description || !this.newData.walkInDate) {
    console.log(this.newData);
      alert('Please fill all required fields.');
      return;
    }else

    {
      this.newData.date=new Date
      this.newData.status=false
      this.supabaseService.adddata(this.newData,"walkindata")
    }

    console.log('Form Data:', this.newData);
    // Optionally, save the data to the database here
    this.closePopup(); // Close the popup after submission
  }

  resetForm() {
    // Reset form data to default values
    this.newData = {
      job_title: '',
      employer_name: '',
      mobile: '',
      job_role: '',
      walkInDate: '',
      date:'',
      job_description: '',
      walkInLocation: '', // Reset walk-in location
      job_location:"",
      industry:""
    };
 
  }
  
}

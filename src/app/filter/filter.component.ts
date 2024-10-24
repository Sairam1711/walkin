import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatStepperModule,
    MatInputModule, MatButtonModule,
    MatFormFieldModule, ReactiveFormsModule,MatAutocompleteModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  searchTerm: string = '';
  jobRole: string = '';
  contactPerson: string = '';

  @Output() filterChange = new EventEmitter<any>();

  industryControl = new FormControl();
  industries: string[] = ['IT', 'Healthcare', 'Finance', 'Education', 'Retail']; // Add your industry list here
  filteredIndustries:any =['IT', 'Healthcare', 'Finance', 'Education', 'Retail'];
  onFilterChange() {
    // Implement any additional filter logic if needed
  }
  ngOnInit() {
    this.filteredIndustries = this.industryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.industries.filter(option => option.toLowerCase().includes(filterValue));
  }
  // filterIndustries() {
  //   const vfilterIndustriesalue = this.industryControl.value.toLowerCase();
  //   this.filteredIndustries = this.industries.filter(industry => 
  //     industry.toLowerCase().includes(value)
  //   );
  // }
filterIndustries() {
  const vfilterIndustriesalue = this.industryControl.value.toLowerCase();
    this.filteredIndustries = this.industries.filter(industry => 
      industry.toLowerCase()
    );
    console.log(this.filteredIndustries);
    this.filterChange.emit({
      searchTerm: this.searchTerm,
      jobRole: this.jobRole,
      industries: this.filteredIndustries,
    });
  }

  onInputChange() {
    if (this.searchTerm) {
      this.filteredIndustries = this.industries.filter(industry =>
        industry.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredIndustries = [];
    }
  }

  selectIndustry(industry: string) {
    this.searchTerm = industry;
    this.filteredIndustries = [];
  }
}

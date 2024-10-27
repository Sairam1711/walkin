import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {map, startWith} from 'rxjs/operators';
import { SupabaseService } from '../services/supabase.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatStepperModule,
    MatInputModule, MatButtonModule,
    MatFormFieldModule, ReactiveFormsModule,MatAutocompleteModule,MatIconModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  searchTerm: string = '';
  searchTerm2:any="";
  jobRole: string = '';
  contactPerson: string = '';
  filter:any={};
  @Output() filterChange = new EventEmitter<any>();
  constructor(private supabaseService: SupabaseService,private router: Router,private route: ActivatedRoute) {
    this.industries=supabaseService.industries
    console.log(supabaseService.filtermain);
    if(supabaseService.filtermain){
      this.searchTerm=supabaseService.filtermain.employer_name
      this.searchTerm2=supabaseService.filtermain.industry
      this.jobRole=supabaseService.filtermain.jobRole
    }
  }
  industryControl = new FormControl();
  industries: string[] = ['IT', 'Healthcare', 'Finance', 'Education', 'Retail']; // Add your industry list here
  filteredIndustries:any =['IT', 'Healthcare', 'Finance', 'Education', 'Retail'];
  onFilterChange() {
    // Implement any additional filter logic if needed
  }
  ngOnInit() {
    // this.filteredIndustries = this.industryControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );

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
  autoclick(value:any){
  
 this.searchTerm2=value;
  }
  search(){
    console.log(this.searchTerm);
    this.filter=
    {
      employer_name:this.searchTerm?this.searchTerm:"",
      job_role:this.jobRole?this.jobRole:"",
      industry:this.searchTerm2?this.searchTerm2:""
    }
   
    // this.filterChange. emit( {
    //   employer_name:this.searchTerm,
    //   job_role:this.jobRole,
    //   industry:this.searchTerm2
    // });
  
 //   this.supabaseService.getData("walkindata",1,6,this.filter)
 console.log(this.filter);
    this.router.navigate(['/search', 1,this.filter.employer_name,this.filter.industry,this.filter.job_role])
  //  this.router.navigate(['/search/1/'+this.filter.employer_name?this.filter.employer_name:""+'/'+this.filter.industry?this.filter.industry:''+'/'+this.filter.searchTerm2?this.filter.searchTerm2:''])
  }
}

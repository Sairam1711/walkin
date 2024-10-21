import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  searchTerm: string = '';
  jobRole: string = '';
  contactPerson: string = '';

  @Output() filterChange = new EventEmitter<any>();

  onFilterChange() {
    this.filterChange.emit({
      searchTerm: this.searchTerm,
      jobRole: this.jobRole,
      contactPerson: this.contactPerson,
    });
  }

}

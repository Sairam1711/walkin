import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { SupabaseService } from '../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-walk-in-card',
  standalone: true,
  imports: [CommonModule,FilterComponent,FormsModule,CommonModule,  MatCardModule,
    MatButtonModule,MatTooltipModule,MatIconModule],
  templateUrl: './walk-in-card.component.html',
  styleUrl: './walk-in-card.component.css'
})
export class WalkInCardComponent implements OnInit {
 // Sample data for wake events
 cards: any[] = []
 cardsPerPage = 6;
 currentPage = 1;
  // Assuming 6 cards per page
 selectedCard: any = null; // To hold the card details for the popup
 limit: number = 6;
 totalRecords: number = 0;
 totalPages = Math.ceil(this.totalRecords / 6);
 constructor(private supabaseService: SupabaseService) {}

 ngOnInit() {
   this.loadData(this.currentPage,{});
 }

 async loadData(page: number,filter:any): Promise<void> {
 this.supabaseService.getData("walkindata", page, this.limit, filter)
    .then(result => {
      console.log( result.data);
      this.cards = result.data;
      this.totalRecords = result.count;
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
    });
}

applyFilters(): void {
  this.currentPage = 1; // Reset to the first page when applying filters
  this.loadData(this.currentPage,{});
}

// onPageChange(event: number): void {
//   this.currentPage = event;
 
// }



// Method to copy the location (mobile number in this case)
copyLocation(mobile: string) {
  navigator.clipboard.writeText(mobile).then(() => {
    alert('Location copied to clipboard: ' + mobile);
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

openPopup(card: any) {
  console.log("click");
  this.selectedCard = card; // Set the selected card
}

closePopup() {
  this.selectedCard = null; // Close the popup
}



// get paginatedCards() {
//   const startIndex = (this.currentPage - 1) * this.cardsPerPage;
//   return this.cards?.slice(startIndex, startIndex + this.cardsPerPage);
// }

nextPage() {
  
    this.currentPage++;
    this.loadData(this.currentPage,{});
  
}

previousPage() {

    this.currentPage--;
    this.loadData(this.currentPage,{});
  
}
filteredCards = this.cards; // Create a copy of cards for filtering

onFilterChange(filter: any) {
  const { searchTerm, jobRole, contactPerson } = filter;

   
    this.loadData(this.currentPage,{description:searchTerm,job_role:jobRole,contact_person:contactPerson});
   
}
truncateText(text: string, limit: number): string {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text; // Return original text if it's shorter than the limit
}

}

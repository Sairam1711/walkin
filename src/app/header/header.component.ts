import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  menuOpen: boolean = false;
  menu =["Home","About","Services","Contact"]
  newData = {
    title: '',
    companyName: '',
    mobile: '',
    contactPerson: '',
    jobRole: ''
  };
  constructor(private supabaseService: SupabaseService) {}
  toggleMenu() {
    console.log("okkk");
    this.menuOpen = !this.menuOpen;
    
  }
  selectedCard: any = null;
  openPopup() {
    this.selectedCard = true; // Set the selected card
  }
  
  closePopup() {
    this.selectedCard = null; // Close the popup
  }
  async addEmployee() {
    try {
      const { data, error } = await this.supabaseService.adddata(this.newData,"");
      if (error) {
        console.error('Error adding employee:', error);
        return;
      }
      console.log('Employee added:', data);
      // Optionally, reset the form
      this.resetForm();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  resetForm() {
    this.newData = {
      title: '',
      companyName: '',
      mobile: '',
      contactPerson: '',
      jobRole: ''
    };
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { WalkInCardComponent } from './walk-in-card/walk-in-card.component';
import { FooterComponent } from './footer/footer.component';
import { SupabaseService } from './services/supabase.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,HeaderComponent,CommonModule,WalkInCardComponent,FooterComponent,HttpClientModule],
  providers:[SupabaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'wakeIn';
  data: any;

  constructor(private supabaseService: SupabaseService) {
  

  }
filteradd(){

}

 


   getname=()=>{
 
    return "sairam"
  }
  
}

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WalkInCardComponent } from './walk-in-card/walk-in-card.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    {path:"",component:WalkInCardComponent},
    {path:"about-us",component:AboutUsComponent}

];


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://wgyosliqoivyowjliubq.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneW9zbGlxb2l2eW93amxpdWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDg5NzksImV4cCI6MjA0MDg4NDk3OX0.f1uzZrTkeJlmGKEDSTBGwDOrGV2jdLhqnZMgMLODc1o';
  private supabase: SupabaseClient;
  cards :any
  filtermain:any
  constructor(private http: HttpClient) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey)

  }

  // Method to fetch data from a specific table
  async getData(tableName: string, page: number, limit: number, filters: any) {
    this.filtermain=filters;
    const start = (page - 1) * limit;
    const end = start + limit - 1;
  
    let query = this.supabase.from(tableName).select('*', { count: 'exact' })    .order('created_at', { ascending: false }).range(start, end);
  
    // Apply filters if they exist
    if (filters.employer_name) {
      const terms = filters.employer_name.split(' ').map((term: any)=> `%${term}%`);
      terms.forEach((term: any)=> {
        query = query.or(`job_city.ilike.${term},job_title.ilike.${term},job_role.ilike.${term},employer_name.ilike.${term}`);
      });
    }
    if (filters.job_role) {
      query = query.ilike('job_role', `%${filters.job_role}%`);
    }
    if (filters.industry) {
      query = query.ilike('industry', `%${filters.industry}%`);
    }
  
    // Execute query
    const { data, count, error } = await query;
  
    if (error) {
      console.error('Error fetching data:', error);
      return { data: [], total: 0 };
    }
    this.cards=data
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return { data: data || [], total: count || 0 };
  }
  
  async adddata(wdata: any, tableName: string) {
    const { data, error } = await this.supabase
      .from(tableName) // Use the table name passed as a parameter
      .insert([wdata]);

    return { data, error };
  }
   industries = [
    "Information Technology (IT)",
    "Healthcare and Medicine",
    "Manufacturing",
    "Retail and E-commerce",
    "Finance and Banking",
    "Construction",
    "Education and Training",
    "Transportation and Logistics",
    "Hospitality and Tourism",
    "Media and Entertainment",
    "Telecommunications",
    "Automotive",
    "Agriculture",
    "Energy and Utilities",
    "Real Estate",
    "Legal Services",
    "Food and Beverage",
    "Marketing and Advertising",
    "Pharmaceuticals",
    "Non-profit and NGOs"
  ];

  private url = 'https://jsearch.p.rapidapi.com/search?query=tamilnadu walkin &page=2&num_pages=1&date_posted=all';
  private headers = new HttpHeaders({
    'x-rapidapi-key': 'ca7ac31055mshbf6d44b7e6850f3p171fb1jsn09f34abc7362',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com'
  });

 

  getJobs() {
    return this.http.get(this.url, { headers: this.headers, responseType: 'json' }).pipe(
      catchError(error => {
        console.error('Error fetching job data', error);
        return throwError(error);
      })
    );
  }

  // Add more methods for authentication, CRUD operations, etc.
}

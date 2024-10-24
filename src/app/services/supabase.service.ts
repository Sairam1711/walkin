import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://wgyosliqoivyowjliubq.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneW9zbGlxb2l2eW93amxpdWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDg5NzksImV4cCI6MjA0MDg4NDk3OX0.f1uzZrTkeJlmGKEDSTBGwDOrGV2jdLhqnZMgMLODc1o';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  // Method to fetch data from a specific table
  async getData(tableName: string, page: number, limit: number, filters: any) {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = this.supabase.from(tableName).select('*', { count: 'exact' }).range(start, end);

    // Apply filters if they exist
    if (filters.company_name) {
      query = query.ilike('company_name', `%${filters.company_name}%`);
    }
    if (filters.job_role) {
      query = query.ilike('job_role', `%${filters.job_role}%`);
    }

    // Execute query
    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching data:', error);
      return { data: [], count: 0 };
    }

    return { data: data || [], count: count || 0 };
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
  // Add more methods for authentication, CRUD operations, etc.
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }

  postRecord(data: any){
    return this.http.post<any>('http://localhost:3000/counties_demo_data/', data);
  }

  getRecord(){
    return this.http.get<any>('http://localhost:3000/counties_demo_data/',);
  }

  putRecord(data: any, id:number){
    return this.http.put<any>('http://localhost:3000/counties_demo_data/'+id, data);
  }

  deleteRecord(id:number){
    return this.http.delete<any>('http://localhost:3000/counties_demo_data/' + id);
  }
}

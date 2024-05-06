import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoURL = 'http://127.0.0.1:8000/media/';

  constructor(private http:HttpClient) { }

  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/department/')
  }

  addDepartment(value: any){
    return this.http.post(this.APIUrl + '/department/', value)
  }

  updateDepartment(value: any){
    return this.http.put(this.APIUrl + '/department/', value)
  }

  deleteDepartment(value: any){
    return this.http.delete(this.APIUrl + '/department/'+value)
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/employee/')
  }

  addEmployee(value: any){
    return this.http.post(this.APIUrl + '/employee/', value)
  }

  updateEmployee(value: any){
    return this.http.put(this.APIUrl + '/employee/', value)
  }

  deleteEmployee(value: any){
    return this.http.delete(this.APIUrl + '/employee/'+value)
  }

  uploadPhoto(val: any){
    return this.http.post(this.APIUrl + '/SaveFile/', val)
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/department/')
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BlogModel} from "./store/Blog/blog.model";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }
  haveaccess(){
    return true;
  }

  getAllBlogs(): Observable<BlogModel[]>{
    return this.http.get<BlogModel[]>("http://localhost:3000/Blogs")
  }

}

import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {BlogModel, Blogs} from "../../shared/store/Blog/blog.model";
import {getBlogInfo, getBlogs} from "../../shared/store/Blog/blog.selectors";
import {AppStateModel} from "../../shared/store/Global/AppState.model";
import {MatDialog} from "@angular/material/dialog";
import {AddBlogComponent} from "../add-blog/add-blog.component";
import {deleteBlog, loadBlog} from "../../shared/store/Blog/blog.actions";

@Component({
  selector: 'app-Blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{

    constructor(private store: Store<AppStateModel>, private dialog: MatDialog) {
    }

    blogList !: BlogModel[];
    blogInfo !: Blogs;
    ngOnInit(): void {
      this.store.dispatch(loadBlog())
      this.store.select(getBlogInfo).subscribe((data) => {
        this.blogInfo = data
      })
    }
    addBlog(){
      this.openPopup(0, 'Add Blog')
    }
    openPopup(id: number, title:string, isEdit=false){
      this.dialog.open(AddBlogComponent, {
        width: '40%',
      data: {
          id: id,
          title: title,
          isEdit: isEdit
      }
      });
    }

    editBlog(itemId: number){
      this.openPopup(itemId, 'Edit Blog', true)
    }

    removeBlog(itemId: number){
      if(confirm("Are you sure want to remove?")){
        this.store.dispatch(deleteBlog({id: itemId}))
      }
    }

}

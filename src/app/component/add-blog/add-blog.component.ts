import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {BlogModel} from "../../shared/store/Blog/blog.model";
import {AppStateModel} from "../../shared/store/Global/AppState.model";
import {Store} from "@ngrx/store";
import {addBlog, updateBlog} from "../../shared/store/Blog/blog.actions";
import {getBlogById} from "../../shared/store/Blog/blog.selectors";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  pageTitle = '';
  editBlogId = 0;
  editData!: BlogModel;

  constructor(private dialogRef: MatDialogRef<AddBlogComponent>,
              private builder: FormBuilder,
              private store: Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.pageTitle = this.data.title;
    if (this.data.isEdit) {
      this.editBlogId = this.data.id
      this.store.select(getBlogById(this.data.id)).subscribe((data) => {
        this.editData = data;
        this.blogForm.setValue({
          id: this.editData.id,
          title: this.editData.title,
          description: this.editData.description
        })
      })
    }
  }

  saveBlog() {
    if (this.blogForm.valid) {
      const _blogInput: BlogModel = {
        id: 0,
        title: this.blogForm.value.title as string,
        description: this.blogForm.value.description as string
      }
      if(this.data.isEdit){
        _blogInput.id = this.blogForm.value.id as number;
        this.store.dispatch(updateBlog({blogInput: _blogInput}))
      }else {
        this.store.dispatch(addBlog({blogInput: _blogInput}))
      }
      this.closePopup()
    }
  }

  closePopup() {
    this.dialogRef.close()
  }

  blogForm = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  })
}

import {createReducer, on} from "@ngrx/store";
import {BlogState} from "./blog.state";
import {addBlog, deleteBlog, loadBlog, loadBlogFail, loadBlogSuccess, updateBlog} from "./blog.actions";
import {state} from "@angular/animations";
import {BlogModel} from "./blog.model";

const _blogReducer = createReducer(BlogState,
    on(loadBlog, (state) => {
      return {
        ...state
      }
    }),
    on(loadBlogSuccess, (state, action) => {
      return {
        ...state,
        blogList: [...action.blogList],
        errorMessage: ''
      }
    }),
    on(loadBlogFail, (state, action) => {
      return {
        ...state,
        blogList: [],
        errorMessage: action.errorText
      }
    }),
    on(addBlog, (state, action) => {
      const _blog = {...action.blogInput};
      _blog.id = state.blogList.length + 1
      return {
        ...state,
        blogList: [...state.blogList, _blog]
      }
    }),
    on(updateBlog, (state, action) => {
      const _blog = {...action.blogInput};
      const updateBlog = state.blogList.map(blog =>{
        return _blog.id === blog.id ? _blog: blog;
      });
      return {
        ...state,
        blogList: updateBlog
      }
    }),
    on(deleteBlog, (state, action) =>{
      const updatedBlogList = state.blogList.filter((data: BlogModel) => data.id !== action.id  )
      return {
        ...state,
        blogList: updatedBlogList
      }
    })
  );

export function blogReducer(state: any, action: any){
  return _blogReducer(state, action);
}

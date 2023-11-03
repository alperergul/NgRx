import {createAction, props} from "@ngrx/store";
import {BlogModel} from "./blog.model";

export const LOAD_BLOG_SUCCESS = "[blog page] load blog success"
export const LOAD_BLOG_FAIL = "[blog page] load blog fail"
export const LOAD_BLOG = "[blog page] load blog"
export const loadBlog = createAction(LOAD_BLOG);
export const loadBlogSuccess = createAction(LOAD_BLOG_SUCCESS, props<{blogList: BlogModel[]}>());
export const loadBlogFail = createAction(LOAD_BLOG_FAIL, props<{errorText: string}>());
export const addBlog = createAction('addBlog', props<{blogInput: BlogModel}>());
export const updateBlog = createAction('updateBlog', props<{blogInput: BlogModel}>())
export const deleteBlog = createAction('deleteBlog', props<{id: number}>())

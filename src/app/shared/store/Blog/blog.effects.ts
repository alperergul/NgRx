import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MasterService} from "../../master.service";
import {
  ADD_BLOG,
  addBlog,
  addBlogSuccess, deleteBlog, deleteBlogSuccess,
  LOAD_BLOG,
  loadBlog,
  loadBlogFail,
  loadBlogSuccess,
  updateBlog, updateBlogSuccess
} from "./blog.actions";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {BlogModel} from "./blog.model";
import {createAction} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {emptyAction, showAlert} from "../Global/App.action";

@Injectable()
export class BlogEffects{


  constructor(
    private action$: Actions,
    private service: MasterService,
    private _snackbar: MatSnackBar
  ) {

  }

  _blog = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_BLOG),
      exhaustMap((action) =>{
        return this.service.getAllBlogs().pipe(
          map((data) => {
            return loadBlogSuccess({blogList: data})
          }),
          catchError((_error) => of(loadBlogFail({errorText: _error.message})))
        )
      })
    )
  );

  _addBlog = createEffect(() =>
    this.action$.pipe(
      ofType(addBlog),
      exhaustMap(action => {
        return this.service.createBlog(action.blogInput).pipe(
          map((data) => {
            return addBlogSuccess({blogInput: data as BlogModel})
          }),
          catchError((_error) => of(loadBlogFail({errorText: _error})))
        )
      })
    )
  );

  _updateBlog = createEffect(( ) =>
    this.action$.pipe(
      ofType(updateBlog),
      switchMap(action =>
        this.service.updateBlog(action.blogInput).pipe(
          switchMap(res => of(
            updateBlogSuccess({blogInput: action.blogInput}),
            showAlert({message: "Updated succesfully!"})
          )),
          catchError((_error) => of(loadBlogFail({errorText: _error})))
        )
      )
    )
  )

  _deleteBlog = createEffect(( ) =>
    this.action$.pipe(
      ofType(deleteBlog),
      exhaustMap(action => {
        return this.service.deleteBlog(action.id).pipe(
          map(() => {
            return deleteBlogSuccess({id: action.id})
          }),
          catchError((_error) => of(loadBlogFail({errorText: _error})))
        )
      })
    )
  )

  _showAlert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap(action => {
        return this.showSnackbarAlert(action.message)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          )
      })
    )
  )

  showSnackbarAlert(message: string) {
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end'
    })
  }

}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MasterService} from "../../master.service";
import {LOAD_BLOG, loadBlogFail, loadBlogSuccess} from "./blog.actions";
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class BlogEffects{


  constructor(private action$: Actions, private service: MasterService) {

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

}

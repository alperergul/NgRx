import {counterReducer} from "../counter.reducer";
import {blogReducer} from "../Blog/blog.reducers";


export const AppState  = {

  counter: counterReducer,
  blog: blogReducer,

}

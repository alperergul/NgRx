import {CounterModel} from "../counter.model";
import { Blogs} from "../Blog/blog.model";

export interface AppStateModel{
  counter: CounterModel,
  blog: Blogs
}

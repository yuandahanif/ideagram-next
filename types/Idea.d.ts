import { Category } from "./category";
import { Comment } from "./comment";
import { Feedback } from "./Feedback";
import { Image } from "./Image";
import { Location } from "./location";
import { User } from "./user";

export interface Idea {
  id: number;
  name: string;
  description: string;
  due_date: string;
  category_id: number;
  donation_target: number;
  location_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  donation_total: number;
  owner?: User;
  location?: Location;
  category?: Category;
  images?: Image[];
  feedbacks?: Feedback[];
  comments?: Comment[];
}

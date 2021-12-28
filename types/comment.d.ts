import { User } from "./user";

export interface Comment {
  id: number;
  user?: User;
  comment: string;
  user_id: number;
  idea_id: number;
  created_at: Date;
  updated_at: Date;
}

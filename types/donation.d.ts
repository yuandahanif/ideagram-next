import { Feedback } from "./Feedback";

export interface Donation {
  id: number;
  user_id: number;
  feedback_id: number;
  feedback: Feedback;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

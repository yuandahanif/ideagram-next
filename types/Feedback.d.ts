export interface Feedback {
  id: number;
  name: string;
  description: string;
  donation_min: number;
  idea_id: number;
  created_at: Date;
  updated_at: Date;
  idea?: Idea;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  balance?: number;
  created_at: Date;
  updated_at: Date;
}
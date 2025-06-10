export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  doctor: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}
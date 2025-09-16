import { CreateUserDTO } from "../validators/user.validator";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface UserFilter {
  first_name?: string;
  last_name?: string;
  gender?: string;
  role?: string;
  email?: string;
  phone_number?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
  size?: number;
  page?: number;
}

export interface PaginatedUserResponse {
  users: CreateUserDTO[];
  pagination: {
    totalRows: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

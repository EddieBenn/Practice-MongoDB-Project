import zod from "zod";
import { Gender, Role } from "../interfaces/user.interface";

export const createUserSchema = zod.object({
  first_name: zod.string().min(2, "First name is required"),
  last_name: zod.string().min(2, "Last name is required"),
  email: zod.email("Invalid email address"),
  gender: zod.enum([Gender.MALE, Gender.FEMALE]),
  role: zod.enum([Role.USER, Role.ADMIN]).optional(),
  phone_number: zod.string().min(2, "Phone number is required"),
  password: zod
    .string()
    .min(6, "Password should be at least 6 characters long"),
});

export type CreateUserDTO = zod.infer<typeof createUserSchema>;
export const updateUserSchema = createUserSchema.partial(); 
export type UpdateUserDTO = zod.infer<typeof updateUserSchema>;

import createHttpError from "http-errors";
import User from "../models/user.model";
import { CreateUserDTO, UpdateUserDTO } from "../validators/user.validator";
import {
  PaginatedUserResponse,
  UserFilter,
} from "../interfaces/user.interface";
import { config } from "../config";
import { buildUserFilter } from "../middlewares/query.middleware";
import { DeleteResult, UpdateResult } from "mongoose";

const createUser = async (data: CreateUserDTO): Promise<CreateUserDTO> => {
  console.log(data);
  return User.create(data);
};

const getUserById = async (_id: string): Promise<CreateUserDTO> => {
  const user = await User.findOne({ _id });

  if (!user) {
    throw createHttpError(404, "User not found");
  }
  return user;
};

const getAllUsers = async (
  queryParams?: UserFilter
): Promise<PaginatedUserResponse> => {
  const page = Number(queryParams?.page) || config.DEFAULT_PAGE_NO;
  const size = Number(queryParams?.size) || config.DEFAULT_PER_PAGE;
  const skip = (page - 1) * size;

  const query = buildUserFilter(queryParams || {});
  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).sort({ created_at: -1 }).skip(skip).limit(size),
  ]);
  const totalPages = Math.ceil(count / size);
  return {
    users,
    pagination: {
      totalRows: count,
      perPage: size,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
    },
  };
};

const updateUser = async (
  _id: string,
  data: UpdateUserDTO
): Promise<UpdateResult> => {
  const user = await User.findOne({ _id });

  if (!user) {
    throw createHttpError(404, "User not found");
  }
  return User.updateOne({ _id }, { ...data, updated_at: new Date() });
};

const deleteUser = async (_id: string): Promise<DeleteResult> => {
  return User.deleteOne({ _id });
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};

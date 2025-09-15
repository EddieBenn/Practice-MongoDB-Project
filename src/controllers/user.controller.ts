import { Request, Response } from "express";
import {
  CreateUserDTO,
  createUserSchema,
  UpdateUserDTO,
  updateUserSchema,
} from "../validators/user.validator";
import userService from "../services/user.service";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    createUserSchema.parse(req.body as CreateUserDTO);
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id!);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers(req.query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      ...users,
    });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    updateUserSchema.parse(req.body as UpdateUserDTO);
    const user = await userService.updateUser(req.params.id!, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await userService.deleteUser(req.params.id!);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};

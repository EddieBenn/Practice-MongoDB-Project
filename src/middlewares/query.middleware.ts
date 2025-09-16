import createHttpError from "http-errors";
import { UserFilter } from "../interfaces/user.interface";

export const buildUserFilter = (queryParams: UserFilter) => {
  const query: any = {};

  if (queryParams?.email) query["email"] = queryParams.email.toLowerCase();
  if (queryParams?.phone_number)
    query["phone_number"] = queryParams.phone_number;
  if (queryParams?.gender) query["gender"] = queryParams.gender.toLowerCase();
  if (queryParams?.role) query["role"] = queryParams.role.toLowerCase();

  if (queryParams?.start_date && queryParams?.end_date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (
      !regex.test(queryParams?.start_date) ||
      !regex.test(queryParams?.end_date)
    ) {
      throw createHttpError(400, "Please use the date format YYYY-MM-DD");
    }
    const startDate = new Date(queryParams.start_date);
    const endDate = new Date(queryParams.end_date);

    endDate.setUTCHours(23, 59, 59, 999);
    query["created_at"] = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  if (queryParams?.search) {
    const searchRegex = new RegExp(queryParams.search, "i");
    query["$or"] = [
      { first_name: { $regex: searchRegex } },
      { last_name: { $regex: searchRegex } },
    ];
  }

  return query;
};

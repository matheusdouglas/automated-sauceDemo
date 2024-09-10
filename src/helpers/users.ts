// src/utils/users.ts
import { IUser } from "../model/user.ts";

export const users: Record<string, IUser> = {
  standard_user: {
    username: "standard_user",
    password: "secret_sauce"
  },
  locked_out_user: {
    username: "locked_out_user",
    password: "secret_sauce"
  },
};

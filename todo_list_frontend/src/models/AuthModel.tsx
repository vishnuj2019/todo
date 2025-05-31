import { z } from "zod";

export const signup_schema = z
  .object({
    username: z.string().trim().min(1, { message: "Username is Required" }),
    password: z.string().trim().min(1, { message: "Password is Required" }),
    confirm_password: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is Required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const login_schema = z.object({
  username: z.string().trim().min(1, { message: "Username is Required" }),
  password: z.string().trim().min(1, { message: "Password is Required" }),
});

export const changepassword_schema = z
  .object({
    password: z.string().trim().min(1, { message: "Password is Required" }),
    confirm_password: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is Required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password do not match",
    path: ["confirm_password"],
  });

export type login_schema_type = z.infer<typeof login_schema>;
export type signup_schema_type = z.infer<typeof signup_schema>;
export type changepassword_schema_type = z.infer<typeof changepassword_schema>;

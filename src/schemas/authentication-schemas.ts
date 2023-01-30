import Joi from "joi";
import { users } from "@prisma/client";

type SignUpSchema = Omit<users, 'id'>
type LoginSchema = Omit<users, 'id' | 'name'>

export const SignUpSchema = Joi.object<SignUpSchema>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  export const SignInSchema = Joi.object<LoginSchema>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
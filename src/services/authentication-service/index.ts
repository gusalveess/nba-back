import { invalidEmailError, unauthorizedError } from "../../errors";
import authenticationRepository from "../../repositories//authentication-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "@prisma/client";

async function SignUpService(data: Omit<users, "id">) {
  const verify = await authenticationRepository.FindEmail(data.email);

  if (verify) {
    throw invalidEmailError(data.email);
  }
  const passwordHashed = await bcrypt.hash(data.password, 12);
  const CreateData = {
    name: data.name,
    email: data.email,
    password: passwordHashed,
  };
  return await authenticationRepository.CreateUser(CreateData);
}

async function LoginService(email: string, password: string) {
  const verify = await authenticationRepository.FindAccount(email);

  if (!verify) {
    throw unauthorizedError();
  }

  const userId = verify.id.toString();

  const isPasswordValid = await bcrypt.compareSync(password, verify.password);
  if (!isPasswordValid) {
    throw unauthorizedError();
  }

  const token = jwt.sign(userId, process.env.JWT_SECRET);

  await authenticationRepository.Login(token, verify.id);

  const data = {
    token: token,
    name: verify.name
  }
  return data
}

async function LogOutService(userId: number) {
  const verify = await authenticationRepository.ActiveSession(userId);

  if (!verify) {
    throw unauthorizedError();
  }

  return await authenticationRepository.LogOut(verify.id);
}

const authenticationService = {
  SignUpService,
  LoginService,
  LogOutService,
};

export default authenticationService;

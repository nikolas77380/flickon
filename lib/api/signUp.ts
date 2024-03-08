"use server";
import { z } from "zod";
import { CREATE_USER } from "../graphQL/user";
import { getClient } from "@/apolloConfig";

const schema = z.object({
  username: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
  password_confirm: z.string().min(5),
});

export async function signUpHandler(prevState: any, formData: FormData) {
  const data = schema.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  });

  if (data.password !== data.password_confirm) {
    return { message: "Паролі не співпадають!" };
  }
  console.log({ data });

  await getClient().query({
    query: CREATE_USER,
    variables: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
}

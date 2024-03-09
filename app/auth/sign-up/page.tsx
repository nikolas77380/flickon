import { Metadata } from "next";
import classes from "./page.module.css";
import { Roboto } from "next/font/google";
import Form from "./SignUpForm";
export const metadata: Metadata = {
  title: "Створити аккаунт | Англійський футбол",
};
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
export default function SignUp() {
  return (
    <>
      <header className={classes.header}>
        <h1 className={roboto.className}>Зареєструвати аккаунт</h1>
      </header>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form />
        </div>
      </div>
    </>
  );
}

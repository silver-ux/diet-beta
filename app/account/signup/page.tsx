"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validationSignUp } from "@/app/utils/Validation";
import Link from "next/link";
import { SetContext } from "@/app/context/Context";

interface IFormInput {
  userName: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter();

  const { user, setUser } = SetContext();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: zodResolver(validationSignUp),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    setUser(response.user);

    if (!res.ok) {
      setLoginError(response.message || "ログインに失敗しました");
      return;
    }
    router.push("/");
    setLoginError(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        router.push("/");
      }
    };
    fetchUser();
  }, [router, user]);
  return (
    <div className=" h-screen w-screen px-[5%] flex items-center justify-center ">
      <div
        className="bg-gray-100 rounded-2xl w-full max-w-[700px] min-h-[600px] "
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          noValidate
          className="p-4 sm:p-15 w-full h-full"
        >
          <h2 className="my-10 sm:my-5 font-bold text-2xl text-center">
            アカウント作成
          </h2>
          <label htmlFor="ユーザーネーム">ユーザーネーム</label>
          <input
            type="text"
            className="border block w-full rounded p-3 sm:p-4 mt-2 bg-white"
            {...register("userName")}
          />
          <p className=" text-red-600">
            {errors.userName?.message as React.ReactNode}
          </p>
          <label htmlFor="メールアドレス" className="block mt-5  sm:mt-7">
            メールアドレス
          </label>
          <input
            type="email"
            className="border block w-full rounded p-3 sm:p-4 mt-2 bg-white"
            {...register("email")}
          />
          <p className=" text-red-600">
            {errors.email?.message as React.ReactNode}
          </p>
          <label htmlFor="パスワード" className="block mt-5  sm:mt-7">
            パスワード
          </label>
          <input
            type="password"
            className="border block w-full rounded p-3 sm:p-4 mt-2 bg-white"
            {...register("password")}
          />
          <p className=" text-red-600">
            {errors.password?.message as React.ReactNode}
          </p>
          {loginError && (
            <p className="text-red-600 text-center mt-4">{loginError}</p>
          )}
          <button
            type="submit"
            className="block w-[30%] mx-auto text-center mt-10 cursor-pointer py-5 bg-sky-200 rounded-2xl duration-500  hover:bg-sky-300 active:bg-sky-800"
          >
            アカウント作成
          </button>
          <Link
            href={"/account/signin"}
            className="block text-center mt-5 text-blue-500"
          >
            ログイン画面へ
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

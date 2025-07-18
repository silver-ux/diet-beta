"use client";

import { SetContext } from "@/app/context/Context";
import { validationSchema } from "@/app/utils/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type IFormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const { user, setUser } = SetContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await fetch("/api/account/signin", {
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
        className="bg-gray-100 rounded-2xl w-full max-w-[700px] h-[600px] "
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          noValidate
          className="p-4 sm:p-15 w-full h-full"
        >
          <h2 className="mt-10 mb-7 font-bold text-2xl text-center">LOGIN</h2>
          <label htmlFor="メールアドレス">メールアドレス</label>
          <input
            type="email"
            className="border block w-full rounded p-3 sm:p-4 mt-2 bg-white"
            {...register("email")}
          />
          <p className=" text-red-600">
            {errors.email?.message as React.ReactNode}
          </p>
          <label htmlFor="パスワード" className="block mt-6  sm:mt-10">
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
            className="block w-full md:w-[30%] mx-auto text-center mt-10 cursor-pointer py-5 bg-red-200 rounded-2xl duration-500  hover:bg-red-300 active:bg-red-800"
          >
            ログイン
          </button>
          <Link
            href={"/account/signup"}
            className="block text-center mt-5 text-blue-500"
          >
            アカウント作成
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

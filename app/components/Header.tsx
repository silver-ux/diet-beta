"use client";
import React from "react";
import Container from "./Container";
import { SetContext } from "../context/Context";

const Header = () => {
  const { user, setUser } = SetContext();

  const logout = async () => {
    try {
      const res = await fetch("/api/account/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`エラー: ${data.error}`);
        return;
      }
      setUser(null); // 状態更新
      console.log(user);

      alert(data.message); // ← メッセージを受け取って表示
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };
  return (
    <header className="h-[100px] border-b-1">
      <Container className={"flex items-center justify-between"}>
        <h1 className="font-bold">
          <span className="text-3xl">
            {user ? user?.user_metadata.username : "No Name"}
          </span>
          さん、ようこそ！
        </h1>
        <button
          onClick={logout}
          className="cursor-pointer mt-3 text-[14px] md:text-[16px] bg-red-200 hover:bg-red-300 duration-300 py-3 px-4 rounded-md"
        >
          ログアウト
        </button>
      </Container>
    </header>
  );
};

export default Header;

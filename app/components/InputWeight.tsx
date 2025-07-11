"use client";
import React, { useState } from "react";
import Container from "./Container";
import { Props } from "../page";

const InputWeight = ({ setWeight }: Props) => {
  const [num, setNum] = useState<number>(50);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weight: num,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else if (data.message) {
      alert(data.message);
    }

    const add = {
      ...data.data,
      created_at: new Date(data.data.created_at).toISOString().slice(8, 10), // YYYY-MM-DD に変換
    };

    setWeight((prev) => [...prev, add]);
  };
  return (
    <Container className={"mt-5"}>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min={20}
          value={num}
          onChange={(e) => setNum(Number(e.target.value))}
          className="border-1 py-1.5 px-4 rounded-md"
        />
        <button
          type="submit"
          className="border-1 rounded-md p-1 bg-red-100 ml-3 cursor-pointer hover:bg-red-200"
        >
          送信
        </button>
      </form>
    </Container>
  );
};

export default InputWeight;

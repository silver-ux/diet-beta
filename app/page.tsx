"use client";
import { SetStateAction, useState } from "react";
import SimpleBarChart, { Data } from "./components/Chart";
import Header from "./components/Header";
import InputWeight from "./components/InputWeight";
import Video from "./components/Video";

export type Props = {
  weight: Data[];
  setWeight: React.Dispatch<SetStateAction<Data[]>>;
};

export default function Home() {
  // 表示するデータ
  const [weight, setWeight] = useState<Data[]>([]);
  return (
    <>
      <Header />
      <Video />
      <InputWeight setWeight={setWeight} weight={weight} />
      <SimpleBarChart setWeight={setWeight} weight={weight} />
    </>
  );
}

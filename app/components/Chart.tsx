"use client"; // Next.js App Router を使う場合は忘れずに

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Container from "./Container";
import { useEffect, useState } from "react";
import { Props } from "../page";
import { CustomTooltip } from "./CustomToolTip";

export type Data = {
  id: number;
  created_at: string;
  user_id: string;
  weight: number;
};

export default function SimpleBarChart({ weight, setWeight }: Props) {
  // 重複しない年月
  const [year, setYear] = useState<string[]>([]);
  const [month, setMonth] = useState<string[]>([]);

  // selectで選択した年月
  const now = new Date();
  const nowYear = String(now.getFullYear());
  const nowMonth = String(now.getMonth() + 1).padStart(2, "0");
  const nowYearMonth = `${nowYear}-${nowMonth}`;

  const [selectedYear, setSelectedYear] = useState<string>(nowYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(nowMonth);
  const [selectedYearMonth, setSelectedYearMonth] =
    useState<string>(nowYearMonth);

  useEffect(() => {
    const fetchItems = async () => {
      // データを持ってきてる
      const res = await fetch("/api/post");
      const data: Data[] = await res.json();

      // 全データから年月を取って重複しないように
      const dates = data.map((item) => item.created_at);
      const uniqueYearMonth = [...new Set(dates)];
      const month = uniqueYearMonth.map((item) => item.slice(5, 7));
      const uniqueMonth = [...new Set(month)];
      const year = uniqueYearMonth.map((item) => item.slice(0, 4));
      const uniqueYear = [...new Set(year)];

      setMonth(uniqueMonth);
      setYear(uniqueYear);

      // 選択した年月と当てはまるデータを持ってきてる
      const filterd = data.filter(
        (item) =>
          new Date(item.created_at).toISOString().slice(0, 7) ===
          selectedYearMonth
      );
      const formatted = filterd.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).toISOString().slice(8, 10), // YYYY-MM-DD に変換
      }));

      setWeight(formatted);
    };
    fetchItems();
  }, [selectedYearMonth, setWeight]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const newYear = name === "year" ? value : selectedYear;
    const newMonth = name === "month" ? value : selectedMonth;

    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
    setSelectedYearMonth(`${newYear}-${newMonth}`);
  };
  return (
    <Container className={"mt-5"}>
      <select
        name="year"
        id="year"
        onChange={handleChange}
        value={selectedYear}
        className="border-1 py-2 px-3 rounded-md"
      >
        {year.map((item) => (
          <option key={item} value={item}>
            {item}年
          </option>
        ))}
      </select>
      <select
        name="month"
        id="month"
        onChange={handleChange}
        value={selectedMonth}
        className="border-1 py-2 px-3 ml-4 rounded-md"
      >
        {month.map((item) => (
          <option key={item} value={item}>
            {item}月
          </option>
        ))}
      </select>

      <div className="w-full h-[350px] md:h-[500px] mt-5 pr-[10px]">
        <ResponsiveContainer>
          <AreaChart data={weight}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="created_at" />
            <YAxis width={20} domain={[30, 80]} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}

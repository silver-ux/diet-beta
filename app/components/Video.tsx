"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";

type Video = {
  id: number;
  created_at: string;
  video: string;
  parts: "leg" | "chest" | "back" | "abs"; // 明示してもOK
};

const Video = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch("/api/training");
      const data: Video[] = await res.json();

      // partsごとに振り分け
      const legVideos = data.filter((item) => item.parts === "leg");
      const chestVideos = data.filter((item) => item.parts === "chest");
      const backVideos = data.filter((item) => item.parts === "back");
      const absVideos = data.filter((item) => item.parts === "abs");

      const allVideos = {
        leg: legVideos,
        chest: chestVideos,
        back: backVideos,
        abs: absVideos,
      };

      const partsList: Array<"leg" | "chest" | "back" | "abs"> = [
        "leg",
        "chest",
        "back",
        "abs",
      ];
      //   今日の日付
      const now = new Date();
      //   ベースの日付
      const baseDate = new Date("2025-07-01");

      //   今の時間からベースの時間を引く
      const diffInMs = now.getTime() - baseDate.getTime();
      //   ミリ秒を「1日あたりのミリ秒数」で割る
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      const currentIndex = Math.floor(diffInDays / 2) % partsList.length;
      const todayPart = partsList[currentIndex];

      const videosToShow = allVideos[todayPart];
      const index =
        videosToShow.length > 0 ? diffInDays % videosToShow.length : 0;
      const dailyVideo = videosToShow[index];

      setUrl(dailyVideo?.video ?? "");
    };

    fetchUrl();
  }, []);

  return (
    <Container className={""}>
      <div className="mt-5 h-[315px] md:h-[550px]">
        {url && (
          <iframe
            width="100%"
            height="100%"
            src={url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </Container>
  );
};

export default Video;

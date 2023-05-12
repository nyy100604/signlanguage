import React, { useState } from "react";

export const useWords = () => {
  const [unit, setUnit] = useState(null);
  const [nowWords, setNowWords] = useState(null);
  const [unitname, setUnitname] = useState("");
  return [unitname, setUnitname, unit, setUnit, nowWords, setNowWords];
};
export const unit1 = [
  "公園",
  "幫/幫忙/幫助",
  "算",
  "下一個",
  "開始",
  "連續",
  "完",
  "十一",
  "十二",
  "二十",
  "二十一",
  "三十",
  "四十",
  "五十",
  "六十",
  "百",
  "做",
  "那/那裡",
];

export const unit2 = ["嘿嘿嘿"];
export const unit3 = ["哈哈哈"];

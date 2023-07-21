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

export const unit2 = [
  "盪鞦韆",
  "換",
  "人",
  "時間",
  "放心",
  "輪流",
  "下一個",
  "洗衣服",
  "洗車",
];

export const unit3 = [
  "常常",
  "久",
  "問",
  "會不會",
  "累/辛苦",
  "比賽",
  "回答",
  "猜",
  "輸",
  "贏",
  "他們兩個",
];

export const test1 =[
  "做",
  "二十一",
  "十二",
  "公園",
  "百",
  "開始",
  "完",
  "六十",
  "幫/幫忙/幫助",
  "連續",
];

export const test2 = [
  "下一個",
  "盪鞦韆",
  "放心",
  "人",
  "輪流",
  "洗衣服",
  "時間",
  "洗車",
  "換",
  "盪鞦韆", 
];

export const test3 = [
  "常常",
  "他們兩個",
  "會不會",
  "贏",
  "久",
  "累/辛苦",
  "回答",
  "猜",
  "問",
  "比賽",
];
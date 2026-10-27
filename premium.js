
/* 天命の導き｜有料鑑定エンジン */

// 数秘術：ライフパスナンバー
function calculateLifePath(birthdate) {
  const digits = birthdate.replace(/\D/g, "");

  if (!/^\d{8}$/.test(digits)) {
    
    throw new Error("生年月日の形式が正しくありません");
  }

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("存在しない日付です");
  }

  let number = digits.split("").reduce(
    (sum, digit) => sum + Number(digit), 0
  );

  while (number > 9 && ![11, 22, 33].includes(number)) {
    number = String(number).split("").reduce(
      (sum, digit) => sum + Number(digit), 0
    );
  }

  return {
    system: "数秘術",
    lifePathNumber: number
  };
}

// マヤ暦：伝統的ツォルキン（GMT相関 584283）
function calculateMaya(birthdate) {
  const digits = birthdate.replace(/\D/g, "");
  if (!/^\d{8}$/.test(digits)) {
    throw new Error("生年月日の形式が正しくありません");
  }

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("存在しない日付です");
  }

  const jdn = Math.floor(date.getTime() / 86400000) + 2440588;
  const mod = (n, m) => ((n % m) + m) % m;
  const days = jdn - 584283;

  const tone = mod(days + 3, 13) + 1;
  const signIndex = mod(days + 19, 20);

  const signs = [
    "イミシュ", "イク", "アクバル", "カン", "チクチャン",
    "キミ", "マニク", "ラマト", "ムルク", "オク",
    "チュエン", "エブ", "ベン", "イシュ", "メン",
    "キブ", "カバン", "エツナブ", "カワク", "アハウ"
  ];

  return {
    system: "伝統的マヤ暦（ツォルキン）",
    correlation: 584283,
    tone: tone,
    daySign: signs[signIndex],
    kinNumber: mod(days + 159, 260) + 1
  };
}
// 西洋占星術：太陽星座（簡易版）
function calculateZodiac(birthdate) {
  const digits = birthdate.replace(/\D/g, "");

  if (!/^\d{8}$/.test(digits)) {
    throw new Error("生年月日の形式が正しくありません");
  }

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("存在しない日付です");
  }

  const signs = [
    ["山羊座", 120],
    ["水瓶座", 219],
    ["魚座", 321],
    ["牡羊座", 420],
    ["牡牛座", 521],
    ["双子座", 622],
    ["蟹座", 723],
    ["獅子座", 823],
    ["乙女座", 923],
    ["天秤座", 1024],
    ["蠍座", 1123],
    ["射手座", 1222],
    ["山羊座", 1232]
  ];

  const md = month * 100 + day;
  const zodiac = signs.find(s => md < s[1])[0];

  return {
    system: "西洋占星術（太陽星座・簡易版）",
    zodiac: zodiac
  };
}
// 九星気学：本命星（立春付近は要確認）
function calculateNineStar(birthdate) {
  const digits = birthdate.replace(/\D/g, "");

  if (!/^\d{8}$/.test(digits)) {
    throw new Error("生年月日の形式が正しくありません");
  }

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("存在しない日付です");
  }

  // 立春は通常2月3日～5日頃
  // 境界日は精密な節入り時刻の確認が必要
  if (month === 2 && day >= 3 && day <= 5) {
    return {
      system: "九星気学",
      star: "立春の境界日のため要確認",
      needsVerification: true
    };
  }

  const adjustedYear =
    month === 1 || (month === 2 && day <= 2)
      ? year - 1
      : year;

  const stars = [
    "一白水星",
    "二黒土星",
    "三碧木星",
    "四緑木星",
    "五黄土星",
    "六白金星",
    "七赤金星",
    "八白土星",
    "九紫火星"
  ];

  const number = ((11 - (adjustedYear % 9) - 1) % 9 + 9) % 9 + 1;

  return {
    system: "九星気学",
    star: stars[number - 1],
    starNumber: number,
    adjustedYear: adjustedYear,
    needsVerification: false
  };
}

// 四柱推命：十干・十二支の基本データ
const SHICHU_STEMS = [
  "甲", "乙", "丙", "丁", "戊",
  "己", "庚", "辛", "壬", "癸"
];

const SHICHU_BRANCHES = [
  "子", "丑", "寅", "卯", "辰", "巳",
  "午", "未", "申", "酉", "戌", "亥"
];

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
// 四柱推命：六十干支を生成
const SHICHU_60 = Array.from({ length: 60 }, (_, i) => {
  return SHICHU_STEMS[i % 10] + SHICHU_BRANCHES[i % 12];
});
// 四柱推命：年柱（立春付近は要確認）
function calculateYearPillar(birthdate) {
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

  if (month === 2 && day >= 3 && day <= 4) {
    return {
      system: "四柱推命",
      yearPillar: null,
      needsVerification: true
    };
  }

  const pillarYear = month === 1 || (month === 2 && day <= 2)
    ? year - 1
    : year;

  const index = ((pillarYear - 1984) % 60 + 60) % 60;

  return {
    system: "四柱推命",
    yearPillar: SHICHU_60[index],
    needsVerification: false
  };
}

// 四柱推命：月柱の節入り日（概算）
const SHICHU_SETSUIRI = [
  6, 4, 6, 5, 6, 6,
  7, 8, 8, 8, 7, 7
];

// 四柱推命：月柱の計算（節入り日は概算）
function calculateMonthPillar(birthdate) {
  const digits = birthdate.replace(/\D/g, "");
  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  if (!/^\d{8}$/.test(digits)) {
    throw new Error("生年月日の形式が正しくありません");
  }

  // 節入り前なら前の節月として扱う
  const beforeSetsuiri = day < SHICHU_SETSUIRI[month - 1];
  const branchIndex = (month + 12 - (beforeSetsuiri ? 1 : 0)) % 12;
  // 年干を基準に寅月の天干を決定
  const yearPillar = calculateYearPillar(birthdate);
  if (yearPillar.needsVerification) {
    return { monthPillar: null, needsVerification: true };
  }

  const yearStemIndex = SHICHU_STEMS.indexOf(yearPillar.yearPillar[0]);
  const tigerStemIndex = ((yearStemIndex % 5) * 2 + 2) % 10;
  const monthOffset = (branchIndex - 2 + 12) % 12;
  const stemIndex = (tigerStemIndex + monthOffset) % 10;

  return {
    monthPillar: SHICHU_STEMS[stemIndex] + SHICHU_BRANCHES[branchIndex],
    needsVerification:
      Math.abs(day - SHICHU_SETSUIRI[month - 1]) <= 2
  };
}
// 四柱推命：日柱の計算
function calculateDayPillar(birthdate) {
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

  // 2000年1月1日を戊午日として計算
  const base = Date.UTC(2000, 0, 1);
  const days = Math.round((date.getTime() - base) / 86400000);

  const index = ((days + 54) % 60 + 60) % 60;

  return {
    system: "四柱推命",
    dayPillar: SHICHU_60[index]
  };
}
// 四柱推命：時柱の計算
function calculateHourPillar(birthdate, birthtime) {
  // 出生時刻が不明なら計算しない
  if (!birthtime) {
    return {
      hourPillar: null,
      needsVerification: false
    };
  }

  // 時刻の形式を確認
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(birthtime)) {
    throw new Error("出生時刻の形式が正しくありません");
  }

  const hour = Number(birthtime.slice(0, 2));
  const minute = Number(birthtime.slice(3, 5));

  // 子時は23:00から始まる
  const branchIndex = Math.floor(((hour + 1) % 24) / 2);

  // 日柱の天干を取得
  const dayData = calculateDayPillar(birthdate);
  const dayStem = dayData.dayPillar[0];
  const dayStemIndex = SHICHU_STEMS.indexOf(dayStem);

  // 五鼠遁によって時干を決定
  const startStemIndex = (dayStemIndex % 5) * 2;
  const stemIndex = (startStemIndex + branchIndex) % 10;

  return {
    system: "四柱推命",
    hourPillar: SHICHU_STEMS[stemIndex] + SHICHU_BRANCHES[branchIndex],
    needsVerification: hour === 23
  };
}
// 四柱推命：節入り日時データ（日本標準時）
// 年ごとの検証済みデータを追加していく

const SHICHU_SETSUIRI_EXACT = {
  1976: {
    2: "1976-02-05T01:40:00+09:00",
    3: "1976-03-05T19:48:00+09:00",
    4: "1976-04-05T00:47:00+09:00"
  }
};


// 指定した年・月の節入り日時を取得
function getExactSetsuiri(year, month) {
  const yearData = SHICHU_SETSUIRI_EXACT[year];

  if (!yearData || !yearData[month]) {
    return null;
  }

  return yearData[month];
}


 // 出生日時が節入り前か後かを判定する（日本標準時）
function compareBirthWithSetsuiri(birthdate, birthtime, year, month) {
  const setsuiri = getExactSetsuiri(year, month);

  if (!setsuiri || !birthtime) {
    return null;
  }

  const digits = birthdate.replace(/\D/g, "");
  if (!/^\d{8}$/.test(digits)) {
    return null;
  }

  const birthISO =
    digits.slice(0, 4) + "-" +
    digits.slice(4, 6) + "-" +
    digits.slice(6, 8) + "T" +
    birthtime + ":00+09:00";

  const birthTimestamp = Date.parse(birthISO);
  const setsuiriTimestamp = Date.parse(setsuiri);

  if (
    !Number.isFinite(birthTimestamp) ||
    !Number.isFinite(setsuiriTimestamp)
  ) {
    return null;
  }

  return birthTimestamp >= setsuiriTimestamp;
}

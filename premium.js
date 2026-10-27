
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

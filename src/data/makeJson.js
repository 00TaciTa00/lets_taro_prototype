function toRoman(num) {
  const romanNumeralMap = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";
  for (const { value, numeral } of romanNumeralMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

const taroCards = [];
for (let i = 0; i < 78; i++) {
  taroCards.push({
    id: i,
    number: i + 1,
    romanNum: toRoman(i + 1),
    name: `타로 ${i + 1}번`,
    image: `@/assets/foreImage.jpg`,
  });
}

const fs = require("fs");
fs.writeFileSync("taroInfo.json", JSON.stringify(taroCards, null, 2));

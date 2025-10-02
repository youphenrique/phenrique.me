"use client";

const BIRTH_DAY = 12;
const BIRTH_YEAR = 1992;
const BIRTH_MONTH_INDEX = 9 - 1; // October (0-indexed)

function computeAge() {
  const now = new Date();
  let age = now.getFullYear() - BIRTH_YEAR;
  const month = now.getMonth();
  const day = now.getDate();
  if (month < BIRTH_MONTH_INDEX || (month === BIRTH_MONTH_INDEX && day < BIRTH_DAY)) {
    age -= 1;
  }
  return age;
}

export function CurrentAge() {
  const age = computeAge();
  return <span>{age}</span>;
}

export function onlyAlphabetical(event) {
  if (
    (event.key.codePointAt(0) < 65 || event.key.codePointAt(0) > 90) &&
    (event.key.codePointAt(0) < 97 || event.key.codePointAt(0) > 122) &&
    event.key.codePointAt(0) !== 32 &&
    event.key.codePointAt(0) > 31
  ) {
    event.preventDefault();
  }
}

export function onlyNumbers(event) {
  if (
    !(
      (event.key.codePointAt(0) >= 48 && event.key.codePointAt(0) <= 57) ||
      event.key === "Backspace" ||
      (event.ctrlKey && event.key === "a") ||
      (event.ctrlKey && event.key === "c")
    )
  ) {
    event.preventDefault();
  }
}

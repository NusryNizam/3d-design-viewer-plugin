/**
 * Debounce function
 * @param func Function to debounce
 * @param wait Milliseconds to wait before firing
 */
export function debounce<F extends Function>(func: F, wait: number): F {
  let timeoutID: number;

  if (!Number.isInteger(wait)) {
    console.warn("Called debounce without a valid number");
    wait = 300;
  }

  return <any>function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this;

    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * Count decimal places in a number
 * @param value Number to check
 */
export function countDecimals(value: number): number {
  if (Math.floor(value) === value) return 0;
  const valueAsString = value.toString();
  return valueAsString.includes(".") ? valueAsString.split(".")[1].length : 0;
}

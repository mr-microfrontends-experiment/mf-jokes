export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function hashToUrlParams(values: { [key: string]: string | number }): string {
  if (Object.keys(values).length === 0) {
    return '';
  }

  return (
    '?' +
    Object.entries(values)
      .filter(([_key, value]) => !!value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
}

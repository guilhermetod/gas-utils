export const buildHyperlinkFormula = (
  url: string,
  displayValue?: string,
): string => `=HYPERLINK("${url}"${displayValue ? `; "${displayValue}"` : ''})`;

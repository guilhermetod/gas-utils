import { internet } from 'faker';

import { buildHyperlinkFormula } from '@spreadsheet/utils/build-hyperlink-formula';

describe('buildHyperlinkFormula', () => {
  let url: string;
  let displayValue: string;

  beforeEach(() => {
    url = internet.url();
    displayValue = internet.domainWord();
  });

  it('should start with the hyperlink formula initializer', () => {
    const result = buildHyperlinkFormula(url, displayValue);

    expect(result).toMatch(/^=HYPERLINK\(/);
  });

  it('should close the formula after the url if there\'s no display value', () => {
    const result = buildHyperlinkFormula(url);

    expect(result).toMatch(new RegExp(`${url}"\\)$`));
  });

  it('should add the display value as the second argument after the url', () => {
    const result = buildHyperlinkFormula(url, displayValue);

    expect(result).toMatch(new RegExp(`"${url}"; "${displayValue}"\\)$`));
  });
});

const validColumn_ = '\\$?([A-Z]+)';
const validRow_ = '\\$?([0-9]*[1-9][0-9]*)';
const multiDimensional_ = `(${(validColumn_)}${(validRow_)})`;
const uniDimensional_ = `(${(validColumn_)}|${(validRow_)})`;

const validOptions_ = [
  `${multiDimensional_}:${multiDimensional_}`,
  `${multiDimensional_}:${uniDimensional_}`,
  `${uniDimensional_}:${multiDimensional_}`,
  `${validRow_}:${validRow_}`,
  `${validColumn_}:${validColumn_}`,
  `${multiDimensional_}`,
];

export const VALID_A1_NOTATION = new RegExp(`^(${validOptions_.join('|')})$`, 'i');
export const A1_NOTATION_COORDINATES = new RegExp(`^${validColumn_}?${validRow_}?(?::${validColumn_}?${validRow_}?)?$`, 'i');

export interface RowCoordinates {
  readonly firstRow: number,
  readonly lastRow: number,
}

export interface ColumnCoordinates {
  readonly firstColumn: number,
  readonly lastColumn: number,
}

export interface RangeCoordinates extends ColumnCoordinates, RowCoordinates { }

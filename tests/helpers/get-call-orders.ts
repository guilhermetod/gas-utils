export interface CallOrders {
  first: number,
  last: number,
}

export const getCallOrders = (mockedFunction: jest.Mock): CallOrders => ({
  first: mockedFunction.mock.invocationCallOrder[0],
  last: mockedFunction.mock.invocationCallOrder.slice(-1)[0],
});

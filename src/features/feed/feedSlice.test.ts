import reducer, {
  createOrder,
  fetchOrders,
  fetchOrdersById,
  getUserOrders,
  initialState
} from './feedSlice';
import { expect } from '@jest/globals';

describe('Feed Slice Reducer - createOrder', () => {
  it('should set isLoading to true when createOrder is pending', () => {
    const action = { type: createOrder.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should update order and set isLoading to false when createOrder is fulfilled', () => {
    const mockOrderData = {
      id: '1',
      name: 'Order 1',
      ingredients: ['Ingredient 1', 'Ingredient 2']
    };
    const action = { type: createOrder.fulfilled.type, payload: mockOrderData };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.order).toEqual(mockOrderData);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when createOrder is rejected', () => {
    const mockError = 'Network error';
    const action = { type: createOrder.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.order).toBeNull();
  });
});

describe('Feed Slice Reducer - fetchOrders', () => {
  const initialState = {
    selectedOrderId: null,
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    order: null,
    isLoading: false,
    error: null
  };

  it('should set isLoading to true when fetchOrders is pending', () => {
    const action = { type: fetchOrders.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  it('should update feed and set isLoading to false when fetchOrders is fulfilled', () => {
    const mockFeedData = {
      orders: [{ id: '1', name: 'Order 1' }],
      total: 100,
      totalToday: 10
    };
    const action = { type: fetchOrders.fulfilled.type, payload: mockFeedData };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feed).toEqual(mockFeedData);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when fetchOrders is rejected', () => {
    const mockError = 'Network error';
    const action = { type: fetchOrders.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0
    });
  });
});

describe('Feed Slice Reducer - fetchOrdersById', () => {
  const initialState = {
    selectedOrderId: null,
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    order: null,
    isLoading: false,
    error: null
  };

  it('should set isLoading to true when fetchOrdersById is pending', () => {
    const action = { type: fetchOrdersById.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should update feed and set isLoading to false when fetchOrdersById is fulfilled', () => {
    const mockOrdersData = [{ id: '1', name: 'Order 1' }];
    const action = {
      type: fetchOrdersById.fulfilled.type,
      payload: mockOrdersData
    };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feed.orders).toEqual(mockOrdersData);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when fetchOrdersById is rejected', () => {
    const mockError = 'Network error';
    const action = { type: fetchOrdersById.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.feed.orders).toEqual([]);
  });
});

describe('Feed Slice Reducer - getUserOrders', () => {
  const initialState = {
    selectedOrderId: null,
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    order: null,
    isLoading: false,
    error: null
  };

  it('should set isLoading to true when getUserOrders is pending', () => {
    const action = { type: getUserOrders.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should update feed.orders and set isLoading to false when getUserOrders is fulfilled', () => {
    const mockOrders = [
      { id: '1', name: 'Order 1' },
      { id: '2', name: 'Order 2' }
    ];
    const action = { type: getUserOrders.fulfilled.type, payload: mockOrders };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.feed.orders).toEqual(mockOrders);
    expect(newState.error).toBeNull();
  });

  it('should set error and set isLoading to false when getUserOrders is rejected', () => {
    const mockError = 'Network error';
    const action = { type: getUserOrders.rejected.type, payload: mockError };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(mockError);
    expect(newState.feed.orders).toEqual([]);
  });
});

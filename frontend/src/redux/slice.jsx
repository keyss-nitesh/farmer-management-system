// import { createSlice } from '@reduxjs/toolkit';

// const farmSlice = createSlice({
//   name: 'farm',
//   initialState: {
//     user: null,
//     token: null,
//     expenses: [],
//     sales: [],
//     totalExpense: 0,
//     totalSale: 0,
//     profitLoss: 0,
//   },
//   reducers: {
//     setAuth: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem('token', action.payload.token);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//     setExpenses: (state, action) => {
//       state.expenses = action.payload;
//       state.totalExpense = state.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
//       state.profitLoss = state.totalSale - state.totalExpense;
//     },
//     setSales: (state, action) => {
//       state.sales = action.payload;
//       state.totalSale = state.sales.reduce((sum, s) => sum + parseFloat(s.sale_amount), 0);
//       state.profitLoss = state.totalSale - state.totalExpense;
//     },
//     addExpense: (state, action) => {
//       state.expenses.push(action.payload);
//       state.totalExpense += parseFloat(action.payload.amount);
//       state.profitLoss = state.totalSale - state.totalExpense;
//     },
//     addSale: (state, action) => {
//       state.sales.push(action.payload);
//       state.totalSale += parseFloat(action.payload.sale_amount);
//       state.profitLoss = state.totalSale - state.totalExpense;
//     },
//   },
// });

// export const { setAuth, logout, setExpenses, setSales, addExpense, addSale } = farmSlice.actions;
// export default farmSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    user: null,
    token: null,
    expenses: [],
    sales: [],
    totalExpense: 0,
    totalSale: 0,
    profitLoss: 0,
  },
  reducers: {

    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expenses = [];
      state.sales = [];
      state.totalExpense = 0;
      state.totalSale = 0;
      state.profitLoss = 0;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.totalExpense = state.expenses.reduce(
        (sum, e) => sum + parseFloat(e.amount || 0), 0
      );
      state.profitLoss = state.totalSale - state.totalExpense;
    },

    setSales: (state, action) => {
      state.sales = action.payload;
      state.totalSale = state.sales.reduce(
        (sum, s) => sum + parseFloat(s.sale_amount || 0), 0
      );
      state.profitLoss = state.totalSale - state.totalExpense;
    },

    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      state.totalExpense += parseFloat(action.payload.amount || 0);
      state.profitLoss = state.totalSale - state.totalExpense;
    },

    addSale: (state, action) => {
      state.sales.push(action.payload);
      state.totalSale += parseFloat(action.payload.sale_amount || 0);
      state.profitLoss = state.totalSale - state.totalExpense;
    },

    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
      state.totalExpense = state.expenses.reduce(
        (sum, e) => sum + parseFloat(e.amount || 0), 0
      );
      state.profitLoss = state.totalSale - state.totalExpense;
    },

    removeSale: (state, action) => {
      state.sales = state.sales.filter((s) => s.id !== action.payload);
      state.totalSale = state.sales.reduce(
        (sum, s) => sum + parseFloat(s.sale_amount || 0), 0
      );
      state.profitLoss = state.totalSale - state.totalExpense;
    },

  },
});

export const {
  setAuth,
  logout,
  setExpenses,
  setSales,
  addExpense,
  addSale,
  removeExpense,
  removeSale,
} = farmSlice.actions;

export default farmSlice.reducer;

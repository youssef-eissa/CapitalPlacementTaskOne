import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { configureStore } from '@reduxjs/toolkit';
import { ApiSlicer } from './Redux/DataApi';


const store = configureStore({
  reducer: {
    [ApiSlicer.reducerPath]:ApiSlicer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlicer.middleware),
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiProvider api={ApiSlicer}>
      <Provider store={store}>
    <App />
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { ErrorBoundary } from "./providers/ErrorBoundary";
import { createReduxStore } from "./providers/StoreProvider";

import "./index.css";

const root = document.getElementById("root") || document.createElement("div");

const AppWithRouter = () => {
  const store = createReduxStore();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(root).render(<AppWithRouter />);

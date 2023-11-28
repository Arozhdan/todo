import { Suspense, useEffect } from "react";
import AppRouter from "./providers/Router/ui/AppRouter";
import { useAppDispatch } from "@/shared/lib";
import { todoListActions } from "@/entities/TodoList";

const initApp = (dispatch: ReturnType<typeof useAppDispatch>) => {
  dispatch(todoListActions.initList());
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    initApp(dispatch);
  }, []);

  return (
    <Suspense fallback={<>loading...</>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;

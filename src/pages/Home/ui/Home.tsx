import {
  TodoList,
  fetchTodoItemsFromAPI,
  getIsTodoListLoading,
  getTodoList,
  getTodoListCompleted,
  getTodoListInited,
} from "@/entities/TodoList";
import { useAppDispatch } from "@/shared/lib";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./Home.module.css";
import { FactCard, fetchFact, getFact } from "@/features/renderRandomFact";

const Home = () => {
  const dispatch = useAppDispatch();

  const list = useSelector(getTodoList);
  const isLoading = useSelector(getIsTodoListLoading);

  const isListInited = useSelector(getTodoListInited);
  const todoListLength = useSelector(getTodoList).length;

  const fact = useSelector(getFact);
  const isListCompleted = useSelector(getTodoListCompleted);

  useEffect(() => {
    console.log("isListInited", isListInited);
    console.log("todoListLength", todoListLength);

    if (!isListInited || todoListLength > 0) return;

    console.log("fetchTodoItemsFromAPI");

    dispatch(fetchTodoItemsFromAPI());
  }, [isListInited]);

  useEffect(() => {
    if (!isListCompleted || fact?.text) return;
    dispatch(fetchFact());
  }, [isListCompleted]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!list.length) {
    return <div>Empty</div>;
  }

  return (
    <div className={styles.page}>
      <TodoList />
      {isListCompleted && <FactCard />}
    </div>
  );
};

export default Home;

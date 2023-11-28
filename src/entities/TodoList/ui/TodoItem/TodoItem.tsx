import clsx from "clsx";
import {
  TodoItem as ITodoItem,
  TodoItemStatus,
  getTodoItemIsSelectable,
  todoListActions,
} from "../..";
import { FC } from "react";
import { useAppDispatch } from "@/shared/lib";

import styles from "./TodoItem.module.css";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

interface Props {
  className?: string;
  item: ITodoItem;
}

export const TodoItem: FC<Props> = ({ className, item }) => {
  const dispatch = useAppDispatch();
  const { text, status } = item;

  const isSelectable = useSelector((state: StateSchema) =>
    getTodoItemIsSelectable(state, item)
  );

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newStatus = isChecked
      ? TodoItemStatus.COMPLETED
      : TodoItemStatus.ACTIVE;

    newStatus === TodoItemStatus.COMPLETED
      ? dispatch(todoListActions.makeListItemCompleted(item))
      : dispatch(todoListActions.makeListItemActive(item));
  };

  return (
    <>
      <label
        className={clsx(styles.root, className, {
          [styles.disabled]: !isSelectable,
        })}
      >
        {text}
        <input
          type="checkbox"
          disabled={!isSelectable}
          checked={status === TodoItemStatus.COMPLETED}
          onChange={handleToggle}
        />
        <span className={styles.checkmark}></span>
      </label>
    </>
  );
};

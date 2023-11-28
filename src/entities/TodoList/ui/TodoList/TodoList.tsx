import clsx from "clsx";
import styles from "./TodoList.module.css";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { TodoItem as iTodoItem, getTodoList } from "../..";
import { TodoItem } from "../TodoItem/TodoItem";

interface Props {
  className?: string;
}

export const TodoList: FC<Props> = ({ className }) => {
  const classes = clsx(styles.root, className);
  const list = useSelector(getTodoList);

  const groupedByTagName = useMemo(() => {
    return list.reduce((acc, item) => {
      const tagName = item.tagName;
      const currentTagItems = acc[tagName] || [];
      return {
        ...acc,
        [tagName]: [...currentTagItems, item],
      };
    }, {} as Record<string, iTodoItem[]>);
  }, [list]);

  return (
    <div className={classes}>
      <h1 className={styles.title}>My startup progress</h1>
      {Object.entries(groupedByTagName).map(([tagName, items], i) => (
        <div key={tagName} className={styles.tag}>
          <div className={styles.tagHeader}>
            <span className={styles.tagIndex}>{i + 1}</span>
            <h2 className={styles.tagName}>{tagName}</h2>
          </div>
          <div className={styles.items}>
            {items.map((item) => (
              <TodoItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

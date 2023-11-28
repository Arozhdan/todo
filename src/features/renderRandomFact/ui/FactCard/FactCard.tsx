import clsx from "clsx";
import styles from "./FactCard.module.css";
import { FC } from "react";
import { useSelector } from "react-redux";
import { getFact, getFactIsLoading } from "../..";

interface Props {
  className?: string;
}

export const FactCard: FC<Props> = ({ className }) => {
  const classes = clsx(styles.root, className);
  const fact = useSelector(getFact);
  const isLoading = useSelector(getFactIsLoading);
  if (isLoading) return <div>Loading...</div>;
  return <div className={classes}>{fact ? fact.text : null}</div>;
};

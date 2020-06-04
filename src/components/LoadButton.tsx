import React from "react";
import { useTheme, createUseStyles } from "react-jss";
import { Theme } from "../types";

const useStyles = createUseStyles((theme: Theme) => ({
  loadButtonWrapper: {
    width: "80%",
    margin: "10px auto",
    display: "flex",
    alignItems: "center"
  },
  loadButtonLine: {
    backgroundColor: theme.colorPrimary,
    height: 1,
    flex: 1
  },
  loadButton: {
    border: `1px solid ${theme.colorPrimary}`,
    borderRadius: 5,
    color: theme.colorPrimary,
    fontWeight: 600,
    outline: "none",
    margin: "0 10px",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.hoverPrimary,
      color: theme.hoverPrimary
    }
  }
}));

type Props = {
  onClick: () => void
};

const LoadButton: React.FC<Props> = (props) => {
  const { onClick } = props;
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.loadButtonWrapper}>
      <div className={classes.loadButtonLine} />
      <button onClick={onClick} className={classes.loadButton}>Load more posts</button>
      <div className={classes.loadButtonLine} />
    </div>
  );
};

export default LoadButton;
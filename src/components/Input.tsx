import React from "react";
import { useTheme, createUseStyles } from "react-jss";
import util from "../util";

type Theme = {
  colorPrimary: string,
  textLight: string,
  hoverPrimary: string
};

const useStyles = createUseStyles((
  theme: Theme,
  buttonWidth: number = 40,
  buttonSpacing: number = 5,
  inputSpacing: number = 10
) => ({
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    margin: "10px 0"
  },
  input: {
    borderRadius: 5,
    boxShadow: {
      x: 0,
      y: 0,
      color: "black",
      blur: 3
    },
    padding: {
      left: inputSpacing,
      right: buttonWidth + inputSpacing + buttonSpacing,
      top: inputSpacing,
      bottom: inputSpacing
    },
    flex: 1,
    minWidth: 0
  },
  submitButton: {
    position: "absolute",
    right: 0,
    width: buttonWidth,
    height: `calc(100% - ${2*buttonSpacing}px)`,
    marginRight: buttonSpacing,
    borderRadius: 5,
    backgroundColor: theme.colorPrimary,
    color: theme.textLight,
    fontWeight: 600,
    border: "none",
    outline: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.hoverPrimary
    }
  }
}));

type Props = {
  bucketId: string;
};

const Input: React.FC<Props> = (props) => {
  const { bucketId } = props;
  const inputRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const classes = useStyles({ theme });

  const onPost = () => {
    if (inputRef.current && inputRef.current.textContent && bucketId) {
      util.createPost(inputRef.current.textContent, bucketId).then(() => {
        inputRef.current!.textContent = "";
      });
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") e.preventDefault();
  }

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "Enter") onPost();
  };

  return (
    <div className={classes.inputContainer}>
      <div
        className={classes.input}
        contentEditable
        ref={inputRef}
        onKeyDown={onKeyDown}
        onKeyUp={onEnter}
      />
      <button onClick={onPost} className={classes.submitButton}>
        Post
      </button>
    </div>
  );
};

export default Input;
import React from "react";
import { useTheme, createUseStyles } from "react-jss";
import util from "../util";

type Theme = {
  colorPrimary: string,
  textLight: string
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
    outline: "none"
  }
}));

type Props = {
  ipAddress: string;
};

const Input: React.FC<Props> = (props) => {
  const { ipAddress } = props;
  const inputRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const classes = useStyles({ theme });

  const onPost = () => {
    if (inputRef.current && inputRef.current.textContent) {
      util.createPost(inputRef.current.textContent, ipAddress).then(() => {
        inputRef.current!.textContent = "";
      });
    }
  }

  return (
    <div className={classes.inputContainer}>
      <div
        className={classes.input}
        contentEditable
        ref={inputRef}
      />
      <button onClick={onPost} className={classes.submitButton}>
        Post
      </button>
    </div>
  );
};

export default Input;
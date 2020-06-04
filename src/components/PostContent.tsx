import React from "react";
import { useTheme, createUseStyles } from "react-jss";
import { Theme } from "../types";

const useStyles = createUseStyles((theme: Theme) => ({
  postContent: {
    marginTop: theme.topBarHeight,
    padding: 10,
    flex: 1,
    borderRadius: "0px 7px 7px 7px",
    backgroundColor: "white",
    minWidth: 0,
    wordBreak: "break-word",
    boxShadow: {
      x: 0,
      y: 0,
      color: "black",
      blur: 3
    }
  }
}));

type Props = {
  content: string
};

const PostContent: React.FC<Props> = (props) => {
  const { content } = props;
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.postContent}>{content}</div>
  );
};

export default PostContent;
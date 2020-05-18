import React from "react";
import { createUseStyles } from "react-jss";
import PostContent from "./PostContent";
import PostTimeLabel from "./PostTimeLabel";
import TimeContentDivider from "./TimeContentDivider";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    width: "80%"
  }
});

type Props = {
  content: string,
  timestamp: number
};

const Post: React.FC<Props> = (props) => {
  const { content, timestamp } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PostTimeLabel timestamp={timestamp} />
      <TimeContentDivider />
      <PostContent content={content} />
    </div>
  );
};

export default Post;
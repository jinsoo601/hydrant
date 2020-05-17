import React from 'react';
import { useTheme, createUseStyles } from 'react-jss';

type Theme = {
  colorPrimary: string,
  textLight: string,
  textDark: string,
  center: object
}

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex"
  },
  timeLabel: {
    backgroundColor: theme.colorPrimary,
    color: theme.textLight,
    fontSize: 10,
    borderRadius: "5px 0px 5px 5px",
    ...theme.center
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  bar: {
    width: 1,
    backgroundColor: theme.colorPrimary,
    flex: 1
  },
  circle: {
    width: 3,
    height: 3,
    borderRadius: "50%",
    border: `1px solid ${theme.colorPrimary}`
  },
  content: {
    borderRadius: 3,
    backgroundColor: "white",
    boxShadow: {
      x: 0,
      y: 0,
      color: "black",
      blur: 3
    }
  }
}));

type Props = {
  content: string,
  timestamp: number
};

const Post: React.FC<Props> = (props) => {
  const { content, timestamp } = props;
  const theme = useTheme();
  const classes = useStyles({ theme });
  const date = new Date(timestamp);
  const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  return (
    <div style={{ border: "1px solid black" }}>
      <div className={classes.container}>
        <div className={classes.timeLabel}>{timeStr}</div>
        <div className={classes.timeline} >
          <div className={classes.bar} />
          <div className={classes.circle} /> 
          <div className={classes.bar} />
        </div>
        <div className={classes.content}>{content}</div>
      </div>
    </div>
  );
};

export default Post;
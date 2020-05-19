import React from "react";
import { useTheme, createUseStyles } from "react-jss";

type Theme = {
  colorPrimary: string,
  textLight: string,
  center: object,
  topBarHeight: number
};

const useStyles = createUseStyles((theme: Theme) => ({
  timeLabel: {
    marginTop: theme.topBarHeight,
    flex: "0 0 60px",
    height: 20,
    alignSelf: "flex-start",
    backgroundColor: theme.colorPrimary,
    color: theme.textLight,
    fontSize: 10,
    fontWeight: 600,
    borderRadius: "3px 0px 3px 3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));

type Props = {
  timestamp: number
};

const PostTimeLabel: React.FC<Props> = (props) => {
  const { timestamp } = props;
  const date = new Date(timestamp);
  const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.timeLabel}>{timeStr}</div>
  );
};

export default PostTimeLabel;
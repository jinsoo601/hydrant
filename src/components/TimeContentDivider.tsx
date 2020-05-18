import React from "react";
import { useTheme, createUseStyles } from "react-jss";

type Theme = {
  colorPrimary: string,
  topBarHeight: number
};

const useStyles = createUseStyles((
  theme: Theme,
  circleRadius = 3,
  lineThickness = 2
) => ({
  timeline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: {
      left: 5,
      right: 10
    }
  },
  topBar: {
    width: lineThickness,
    height: theme.topBarHeight - circleRadius,
    backgroundColor: theme.colorPrimary
  },
  bottomBar: {
    width: lineThickness,
    backgroundColor: theme.colorPrimary,
    flex: 1
  },
  circle: {
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderRadius: "50%",
    border: `${lineThickness}px solid ${theme.colorPrimary}`
  }
}));

const TimeContentDivider: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.timeline} >
      <div className={classes.topBar} />
      <div className={classes.circle} /> 
      <div className={classes.bottomBar} />
    </div>
  );
};

export default TimeContentDivider;
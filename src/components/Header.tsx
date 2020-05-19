import React from "react";
import { useTheme, createUseStyles } from "react-jss";

type Theme = {
  colorPrimary: string,
  textLight: string
};

const useStyles = createUseStyles((theme: Theme) => ({
  header: {
    flex: "0 0 40px",
    backgroundColor: theme.colorPrimary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.textLight,
    fontWeight: 600
  }
}));

type Props = {
  ipAddress: string
}

const Header: React.FC<Props> = (props) => {
  const { ipAddress } = props;
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.header}>{ipAddress}</div>
  );
}

export default Header;
import styles from "./styles.jsx";
import FooterOption from "../FooterOption";
import TouchableOpacity from "../TouchableOpacity";
import { themeColors } from "../../config.js";

export const Frame = ({
  title,
  headerRight,
  headerHeight,
  children,
  footerLeft,
  footerRight,
}) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.header, height: headerHeight }}>
        <div style={styles.title}>{title}</div>
        <div style={styles.headerRight}>{headerRight}</div>
      </div>
      <div style={styles.content}>{children}</div>
      <div style={{ ...styles.footer, height: headerHeight }}>
        <div style={styles.footerLeft}>{footerLeft}</div>
        <div style={styles.footerRight}>{footerRight}</div>
      </div>
    </div>
  );
};

const PageFrame = ({ headerRight, children }) => {
  return (
    <Frame
      title={"BruinTutors"}
      headerRight={headerRight}
      footerLeft={
        <>
          <FooterOption optionText="Privacy Policy" />
          <FooterOption optionText="Terms of Use" />
        </>
      }
      footerRight={"©2021 BruinTutors.com"}
      children={children}
    />
  );
};

export default PageFrame;

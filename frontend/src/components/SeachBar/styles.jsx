import { themeColors } from "../../config";

export default {
  container: {
    width: 200,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: themeColors.lightgray,
  },
  searchInput: {
    flex: 1,
    margin: 0,
    borderRadius: 0,
    width: "auto",
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
  searchBtn: {
    width: 50,
    margin: 0,
    height: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: themeColors.darkblue,
  },
  filterCard: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: 0,
    backgroundColor: themeColors.lightgray,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: themeColors.darkgray,
  },
  addFilterBtn: {
    margin: 0,
    width: "auto",
    height: "auto",
    margin: 10,
    backgroundColor: "transparent",
    color: themeColors.darkgray,
    fontSize: 20,
  },
  cardText: {
    margin: 5,
    fontWeight: "bold",
    zIndex: 11,
    color: themeColors.black,
  },
  content: {
    overflow: "hidden",
    transition: "height 0.5s",
    alignSelf: "stretch",
    zIndex: 11,
  },
<<<<<<< HEAD
  rating: {
    color: themeColors.yellow,
    fontSize: 18,
    textShadow: "1px 1px 2px #DAA520",
  },
=======
>>>>>>> ace46a877f6a965715231f661b64f1ea5448f8fe
};

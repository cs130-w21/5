import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SeachBar";
import TutorList from "../../components/TutorList";
import { useState } from "react";
const SearchPage = ({ uid, userStore, matchedTutors }) => {
  const history = useHistory();
  const tutors = [];

  // You can pass these to the app drop down as: <AppDropDown onSelect={dropDownHandler} selectedClass={selectedClass} setSelectedClass={setSelectedClass}></AppDropDown>
  const [selectClass, setSelectClass] = useState([]);

  const dropDownHandler = (pickClass) => {
    // set the state to contain the selected class 
    setSelectClass(pickClass);
  }

  matchedTutors.map((tutorId) => tutors.push(userStore[tutorId]));
  return (
    <PageFrame onTitleClick={() => history.push("/profile/" + uid)}>
      <Frame
        style={{
          flexDirection: "row",
          flex: 1,
          alignSelf: "stretch",
          overflow: "auto",
        }}
      >
        <Frame
          style={{
            flexDirection: "column",
            alignSelf: "stretch",
            overflow: "auto",
          }}
        >
          <SearchBar />
        </Frame>
        <Frame
          style={{
            flexDirection: "column",
            alignSelf: "stretch",
            flex: 1,
            overflow: "auto",
            justifyContent: "flex-start",
          }}
        >
          <TutorList tutors={tutors} />
        </Frame>
      </Frame>
    </PageFrame>
  );
};
export default SearchPage;

import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import InfoSection from "../../components/InfoSection";
import MsgSection from "../../components/MsgSection";
import CourseSection from "../../components/CourseSection";
import CalendarSection from "../../components/CalendarSection";
import ContactSection from "../../components/ContactSection";
import { useEffect, useState } from "react";
import { getProfile } from "../../api";

const ProfilePage = ({ match, uid }) => {
  const [profileInfo, setProfileInfo] = useState();
  // Dummy values before fetch 
  const [first_Name, setFirstName] = useState("Joe");
  const [last_Name, setLastName] = useState("Bruin");
  const [display_UID, setDisplayUID] = useState("test");
  const [display_major, setMajor] = useState("All UCLA Major");
  const [display_year, setYear] = useState("4");
  // TODO: We have not set up the rating system 
  const [display_rating, setRating] = useState("3");
  const [display_classes, setClasses] = useState(
    ["CS 111", "COMSCI 131",
    "CS 130",
    "MATH 143",
    "CS 111",
    "CHEM 131",
    "CS 130",
    "PHYSICS 143",
  ],);

  // Get the retreived profile information from the api call 
  const handleGetProfile = async () => {
    const res = await getProfile(uid);
    if (res.error) {
      console.log(res.errMsg);
    } else {
      const data = res.data;
      // dummy values will be updated by the fetch data
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDisplayUID(uid);
      setMajor(data.major);
      setYear(data.year);
      setClasses(data.classes);
    }
  };

  // fetch the data for profile 
  handleGetProfile();

  useEffect(() => {    
    // API fetch data replaced   
    setProfileInfo({
      uid: display_UID,
      firstName: first_Name,
      lastName: last_Name,
      major: display_major,
      year: display_year,
      rating: display_rating,
      classes: display_classes,
    });
  }, []);
  const setProfileUrl = (url) =>
    setProfileInfo({
      ...profileInfo,
      profileUrl: url,
    });
  const isOwner = match.params.id === uid;
  return (
    <PageFrame>
      <Frame
        style={{
          flexDirection: "column",
          margin: "auto",
          overflow: "auto",
        }}
      >
        <Frame
          style={{
            flexDirection: "row",
            margin: "auto",
          }}
        >
          <Frame>
            {profileInfo && (
              <InfoSection
                isOwner={isOwner}
                uid={profileInfo.uid}
                profileUrl={profileInfo.profileUrl}
                setProfileUrl={setProfileUrl}
                firstName={profileInfo.firstName}
                lastName={profileInfo.lastName}
                year={profileInfo.year}
                major={profileInfo.major}
              />
            )}
            <MsgSection />
          </Frame>
          <Frame>
            {profileInfo && <CourseSection classes={profileInfo.classes} />}
            <CalendarSection />
          </Frame>
          <Frame>
            <ContactSection />
          </Frame>
        </Frame>
      </Frame>
    </PageFrame>
  );
};

export default ProfilePage;

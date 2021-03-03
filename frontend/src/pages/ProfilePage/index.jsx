import PageFrame from "../../components/PageFrame";
import Frame from "../../components/Frame";
import InfoSection from "../../components/InfoSection";
import MsgSection from "../../components/MsgSection";
import CourseSection from "../../components/CourseSection";
import CalendarSection from "../../components/CalendarSection";
import ContactSection from "../../components/ContactSection";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProfile } from "../../api";

const ProfilePage = ({ match, uid, userStore, contacts }) => {
  const [profileInfo, setProfileInfo] = useState();
  const [targetUid, setTargetUid] = useState();
  const [msgUid, setMsgUid] = useState();
  const history = useHistory();
  const fetchInfo = async () => {
    /*
    const res = await getProfile(match.params.id)
    if (res.error) {
      console.log(res.errMsg)
    } else {
      const data = res.data
      setProfileInfo(data)
      setTargetUid(data.uid)
    }
    */
    setProfileInfo({
      uid: "test",
      firstName: "Joe",
      lastName: "Bruin",
      major: "Computer Science",
      year: 3,
      rating: 3,
      classes: [
        "CS 111",
        "COMSCI 131",
        "CS 130",
        "MATH 143",
        "CS 111",
        "CHEM 131",
        "CS 130",
        "PHYSICS 143",
        "CS 111",
      ],
      messages: [],
      notifications: [],
    });
    setTargetUid("test");
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const setProfileUrl = (url) => {
    setProfileInfo({
      ...profileInfo,
      profileUrl: url,
    });
  };

  const isOwner = match.params.id === uid;
  if (!profileInfo) {
    return <div></div>;
  } else
    return (
      <PageFrame onTitleClick={() => history.push("/search/")}>
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
            <Frame
              style={{ justifyContent: "flex-start", alignSelf: "stretch" }}
            >
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
              {msgUid && (
                <MsgSection
                  uid={uid}
                  msgUid={msgUid}
                  userStore={userStore}
                  setMsgUid={setMsgUid}
                />
              )}
            </Frame>
            <Frame>
              {profileInfo && <CourseSection classes={profileInfo.classes} />}
              <CalendarSection />
            </Frame>
            <Frame>
              {profileInfo && (
                <ContactSection
                  userStore={userStore}
                  contacts={contacts}
                  setMsgUid={setMsgUid}
                />
              )}
            </Frame>
          </Frame>
        </Frame>
      </PageFrame>
    );
};

export default ProfilePage;

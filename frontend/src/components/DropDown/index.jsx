import Select from "react-select";
import { getClassList } from "../../api";
import Text from "../../components/Text";
import { useState } from "react";

// The array will store the defined subject area
// Once user click a subject, fetch API to get the entire subclass list to display 
const subjectArea = [
  { label: "Art", value: "Art" },
  { label: "American Indian Studies", value: "American Indian Studies" },
  { label: "Anthropology", value: "Anthropology" },
  { label: "Astronomy", value: "Astronomy" }, { label: "Arabic", value: "Arabic" },
  { label: "Communication", value: "Communication" }, { label: "Community Engagement and Social Change", value: "Community Engagement and Social Change" },
  { label: "Chemistry and Biochemistry", value: "Chemistry and Biochemistry" }, { label: "Chicana/o and Central American Studies", value: "Chicana/o and Central American Studies" },
  { label: "Chinese", value: "Chinese" }, { label: "Civil and Environmental Engineering", value: "Civil and Environmental Engineering" },   
  { label: "Conservation of Archaeological and Ethnographic Materials", value: "Conservation of Archaeological and Ethnographic Materials" }, 
  { label: "Dance", value: "Dance" },
  { label: "Design / Media Arts", value: "Design / Media Arts" }, { label: "Dutch", value: "Dutch" },
  { label: "English", value: "English" }, { label: "English as A Second Language", value: "English as A Second Language" },
  { label: "Economics", value: "Economics" }, { label: "Education", value: "Education" },
  { label: "Epidemiology", value: "Epidemiology" }, { label: "Engineering", value: "Engineering" },
  { label: "French", value: "French" }, { label: "Gender Studies", value: "Gender Studies" },
  { label: "Geography", value: "Geography" }, { label: "German", value: "German" },
  { label: "Greek", value: "Greek" }, { label: "Honors Collegium", value: "Honors Collegium" },
  { label: "Hebrew", value: "Hebrew" }, { label: "Hungarian", value: "Hungarian" },
  { label: "History", value: "History" }, { label: "Indonesian", value: "Indonesian" },
  { label: "Iranian", value: "Iranian" }, { label: "Italian", value: "Italian" },
  { label: "Japanese", value: "Japanese" }, { label: "Jewish Studies", value: "Jewish Studies" },
  { label: "Korean", value: "Korean" }, { label: "Lesbian, Gay, Bisexual, Transgender, and Queer Studies", value: "Lesbian, Gay, Bisexual, Transgender, and Queer Studies" },
  { label: "Latin", value: "Latin" }, { label: "Linguistics", value: "Linguistics" },
  { label: "Law", value: "Law" }, { label: "Management", value: "Management" },
  { label: "Medicine", value: "Medicine" }, { label: "Management-Executive MBA", value: "Management-Executive MBA" },
  { label: "Microbiology, Immunology, and Molecular Genetics", value: "Microbiology, Immunology, and Molecular Genetics" }, 
  { label: "Management-Full-Time MBA", value: "Management-Full-Time MBA" },
  { label: "Management-Fully Employed MBA", value: "Management-Fully Employed MBA" }, { label: "Molecular, Cellular, and Integrative Physiology", value: "Molecular, Cellular, and Integrative Physiology" },
  { label: "Mathematics", value: "Mathematics" }, { label: "Music", value: "Music" },
  { label: "Musicology", value: "Musicology" }, { label: "Nursing", value: "Nursing" },
  { label: "Pathology and Laboratory Medicine", value: "Pathology and Laboratory Medicine" }, 
  { label: "Philosophy", value: "Philosophy" },
  { label: "Physics", value: "Physics" }, { label: "Physics and Biology in Medicine", value: "Physics and Biology in Medicine" },
  { label: "Psychology", value: "Psychology" }, { label: "Physiological Science", value: "Physiological Science" },
  { label: "Polish", value: "Polish" }, { label: "Religion, Study of", value: "Religion, Study of" },
  { label: "Russian", value: "Russian" }, { label: "Scandinavian", value: "Scandinavian" },
  { label: "Sociology", value: "Sociology" }, { label: "Semitic", value: "Semitic" },
  { label: "Slavic", value: "Slavic" }, { label: "Spanish", value: "Spanish" },
  { label: "Social Science", value: "Social Science" }, { label: "Statistics", value: "Statistics" },
  { label: "Swahili", value: "Swahili" }, { label: "Thai", value: "Thai" },
  { label: "Turkic Languages", value: "Turkic Languages" }, { label: "Theater", value: "Theater" },
  { label: "Yiddish", value: "Yiddish" },
];

const AppDropDown = () => {

  // Test with some dummy values if selected subject = Art (dummy values)  
  // const entries = ["Art_1A", "Art_1B", "Art_11A", "Art_11B"];

  const [classList, setClassList] = useState([]);

  // How to process above to become the bottom part?
  // Dummy values for testing display 
  // const classes = [{label: "Art_1A", value: "Art_1A"}];

  const handleGetClassList = async (selectedSubject) => {
    const res = await getClassList(selectedSubject);
    if (res.error) {
      console.log(res.errMsg)
    } else {
      const data = res.data;
      const subClasses = data.classList;

      let subclassFromApi = subClasses.map((item) => {
        return {label: item, value: item};
      });

      setClassList(subclassFromApi);
    }
  }

  // TODO: double check if the edit profile is able to grab the input from the second drop down list!!
  return (
    <div style={{ width: "200px" }}>
      {/* <Select options={subjectArea} onChange={(opt) => console.log(opt.label, opt.value)} /> */}
      <Select options={subjectArea} onChange={(opt) => handleGetClassList(opt.label)} />

      <Text>Class List</Text>
      <Select options={classList}></Select>
    </div>
  );
}

export default AppDropDown;



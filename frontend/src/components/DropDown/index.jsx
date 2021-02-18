import Select from "react-select";

// Replace this array with the full class list from UCLA registar
// Dummy value in the array
const classesUCLA = [
  { label: "CS 130", value: "CS 130" },
  { label: "Lin 170", value: "Lin 170" },
  { label: "CS 35L", value: "CS 35L" },
  { label: "Math 170A", value: "Math 170A" },
  { label: "Eng 100", value: "Eng 100" },
  { label: "Chem 100", value: "Chem 100" },
];

function AppDropDown({ onSelect, styles }) {
  return (
    <div style={{ width: 200, ...styles }}>
      <Select
        options={classesUCLA}
        styles={styles}
        onChange={(opt) => onSelect(opt.value)}
      />
    </div>
  );
}

export default AppDropDown;

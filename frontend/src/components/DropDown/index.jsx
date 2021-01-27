// Need to npm install react-select@3.1.0
import Select from 'react-select';
import styles from "./styles";

// Replace this array with the full class list from UCLA later
// Dummy value in the array 
// Style is off 
const classesUCLA = [
  { label: 'CS 130', value: 'CS 130' },
  { label: 'Lin 170', value: 'Lin 170' },
  { label: 'CS 35L', value: 'CS 35L' },
  { label: 'Math 170A', value: 'Math 170A' },
  { label: 'Eng 100', value: 'Eng 100' },
  { label: 'Chem 100', value: 'Chem 100' },
];

const AppDropDown = ({children, style}) => {
    return (
        <Select style={{ ...styles.button, ...style }} 
            options={classesUCLA}>
        </Select>
    )
};

export default AppDropDown;
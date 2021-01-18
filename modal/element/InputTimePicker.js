import Reactimport, { Component } from "react";
import { Input, Text, Button } from "react-native-elements";

 export default InputTimePicker(label, value, func){
     return (
         <Input label={label} inputComponent={(value) => {<Button title={value} ></Button>} } ></Input>
     );
 }
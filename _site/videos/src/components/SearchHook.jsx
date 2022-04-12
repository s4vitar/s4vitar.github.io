/* Deprecated */
import React from "react";
import {Dataset} from "./Dataset";

const NotFound =(p)=> { return (
  <p style={{
    fontSize: "1.5rem",
    fontFamily: "Hack",
  }}
  >
    {p} not found!
  </p>
)};

const SearchHook =()=> {
  const [searchValue, setSearchValue] = React.useState('');

  let searchedText = [];

  if (!searchValue.length >= 1) { 
    searchedText = Dataset; 
  } 
  else {
    searchedText = Dataset.filter(
      (obj)=> {
        const text = obj.name.toLowerCase();
        const searchedText = searchValue.toLowerCase();
      return text.includes(searchedText);
    });
  };

  return {
    searchValue,
      setSearchValue, 
    searchedText,
  } 

}; export {SearchHook, NotFound};
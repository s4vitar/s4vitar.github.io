import React from "react";
import {Dataset} from "./Dataset";
import savi from "@icons/savi.jpg"

const NotFound =(p)=> { return (<>
  <p style={{
    fontSize: "1.5rem",
    fontFamily: "Hack",
  }}
  >
    {p} not found!<br/>
  </p>
  <img width="100px" src={savi}
    style={{
      marginTop: "10px",
      borderRadius: "50%",
    }}
  />
  <h2 style={{
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "red",
  }}>
    SE TENSÓ!
  </h2>
</>)};

const SearchHook =()=> {
  const [searchValue, setSearchValue] = React.useState('');

  let searchedText = [];

  if (!searchValue.length >= 1) { 
    searchedText = Dataset; 
  } 
  else {
    var searchValueLower = searchValue.toLowerCase();

    const removeAccents =(str)=> {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchValueLowerNoAccents = removeAccents(searchValueLower);

    searchedText = Dataset.filter(
      (obj)=> {
      return obj.name.toLowerCase()
        .includes(searchValueLowerNoAccents)       ||

        removeAccents(obj.dificultad.toLowerCase())
          .includes(searchValueLowerNoAccents)     ||

        obj.skills.toLowerCase()
          .includes(searchValueLowerNoAccents)     ||

        obj.like.toLowerCase()
          .includes(searchValueLowerNoAccents)     ||

        obj.so.toLowerCase()
          .includes(searchValueLowerNoAccents);
    });
  };

  return {
    searchValue,
      setSearchValue, 
    searchedText,
  } 

}; export {SearchHook, NotFound};
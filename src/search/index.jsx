import React, { useState, useEffect, useRef } from "react";
import { fields, conditions } from "./fieldsAndOperators";
import cross from "../assets/cross.png";

function Search() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredFields, setFilteredFields] = useState(fields);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let filtered;
    // Filter fields based on query
    if (query) {
      if (
        fields.filter((field) => field.toLowerCase() == query.toLowerCase()) &&
        fields.includes(query.trim())
      ) {
        let filterWithOperaters = conditions.map(
          (con) => `${query.trim()} ${con} `
        );
        filterWithOperaters.unshift(query);
        setFilteredFields(filterWithOperaters);
        setDropdownOpen(true);
      } else {
        filtered = fields.filter((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFields(filtered);
        setDropdownOpen(true);
      }
    } else {
      setFilteredFields(fields);
    }
  }, [query, filters]);

  const handleSelectField = (field) => {
    setQuery(field);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  const addFilter = () => {
    const filterArr = query.split(" ");
    if (filterArr.length > 1) {
      let value = filterArr.filter((itm, index) => index > 1);
      let filVal = {
        key: filterArr[0],
        operator: filterArr[1],
        value: value.join(" "),
      };
      console.log(filVal);
      setFilters((prevFilters) => {
        const updatedFilters = [...prevFilters, filVal];
        return updatedFilters;
      });
      setFilteredFields(fields);
      setQuery("");
      setDropdownOpen(false);
    } else {
      alert("Please enter a proper value!");
    }
  };

  const removeFilter = (filter) => {
    setFilters((pre) => pre.filter((flt) => flt != filter));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="relative w-full  mx-auto mt-10">
      <h1 className="text-center border m-5 p-5 text-xl font-bold">
        Query Filter builder
      </h1>
      <div className="flex items-center">
        <div className="flex w-full h-12 justify-items-center overflow-x-auto text-white border bg-zinc-500 border-gray-300 rounded shadow-sm focus:outline-none ">
          {filters.length
            ? filters.map((fltr, indx) => {
                return (
                  <div
                    key={indx}
                    className="bg-black m-1  border flex justify-between font-thin text-xs rounded-lg"
                  >
                    <span className=" p-1 text-center overflow-hidden">
                      {`${fltr.key} `}{fltr.operator}{` ${fltr.value}`}
                    </span>
                    <button
                      className=" w-4 "
                      onClick={() => removeFilter(fltr)}
                    >
                      <img src={cross} alt="del" className="w-3" />
                    </button>
                  </div>
                );
              })
            : ""}
          <input
            type="text"
            value={query}
            onClick={() => {
              setDropdownOpen(true);
            }}
            onChange={(e) => {
              setDropdownOpen(true);
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addFilter();
              }
            }}
            placeholder="Select Filter : select options from suggested values, for IN/NOT IN operators - press 'Enter' after selecting options"
            className="p-3 w-full text-white border bg-zinc-500 border-zinc-500 rounded shadow-sm focus:outline-none "
          />
          <button
            onClick={addFilter}
            className="w-10  h-11 shadow-sm shadow-white border-l absolute right-0  text-white  bg-zinc-500 rounded  hover:bg-zinc-400"
          >
            +
          </button>
        </div>
      </div>

      {isDropdownOpen && filteredFields.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
          <ul className="max-h-60 overflow-y-auto">
            {filteredFields.map((field, index) => (
              <li
                key={index}
                onClick={(e) => handleSelectField(field)}
                className="cursor-pointer p-3 hover:bg-gray-100"
              >
                {field}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;

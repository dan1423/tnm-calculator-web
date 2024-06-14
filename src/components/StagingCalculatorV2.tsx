// @ts-nocheck
import React, { useState, useEffect } from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import TNMListItemV2 from './TNMListItemV2';

export function StagingCalculatorV2() {
  const [open, setOpen] = React.useState(0);
  const[currentTNMList,setCurrentTNMList] = useState([]);
  const handleTNMClick=(item)=>{
    setCurrentTNMList(item);
  };

  const handleTNMItemClick=(item)=>{
    console.log(item);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  //disease select
  const [diseaseSites, setDiseaseSites] = useState(null);
  const [dropdownValue, setDropdownValue] = useState(null);

  //staging values
  const BASE_URL = "https://dan1423-001-site1.btempurl.com";
  const [stagingUrl, setStagingUrl] = useState("");
  const [stagingData, setStagingData] = useState(null);
  const [items, setItems] = useState([{ label: "loading", value: "...." }]);
  const [listOfStagingValues, setListOfStagingValues] = useState([]);
  const [calculatedStage, setCalculatedStage] = useState("...");

  useEffect(() => {
    fetch("https://dan1423-001-site1.btempurl.com/tnmstaging/diseases")
      .then((response) => response.json())
      .then((data) => {
        setDiseaseSites(data);
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
      });
  }, []);

  const handleDiseaseSelect = (itemValue, index) => {
    setDropdownValue(itemValue);
    setStagingData(null);
    setCalculatedStage("...");
    if (itemValue == null || itemValue == "") return;

    let currentDiseaseUrl = `https://dan1423-001-site1.btempurl.com/tnmstaging/staging-data-items-v2/${itemValue}/1`;
    fetch(currentDiseaseUrl) // Replace 'api' with the actual endpoint to fetch staging data
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setStagingData(data);
        //setItems(data.map(item => ({ label: item.ColumnTitle, value: item.ColumnName })));
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
      });
    setStagingUrl(
      encodeURI(
        `${BASE_URL}/tnmstaging/calculate?diseaseId=${itemValue}&stagingTypeId=1`
      )
    );
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/5 bg-gray-200 p-4">
        <div>
          <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
            Select a Disease Site:
          </label>
          <select
            className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // style={styles.picker}
            value={dropdownValue == null ? "..." : dropdownValue}
            onChange={(event) =>
              handleDiseaseSelect(
                event.target.value,
                event.target.selectedIndex
              )
            }
          >
            <option value="none">None</option>
            {diseaseSites == null ? (
              <option value="">loading...</option>
            ) : (
              diseaseSites.map((item, index) => (
                <option value={item.ajccDiseaseId} key={index}>
                  {item.diseaseTitle}
                </option>
              ))
            )}
          </select>
        </div>
        <Sidebar>
          <Menu>
          {stagingData == null ? (
              <MenuItem>Loading...</MenuItem>
            ) : (
              stagingData.map((item, index) => (
                <MenuItem  key={index} onClick={()=>handleTNMClick(stagingData[index].valueDescList)}>
                {item.columnTitle}
                </MenuItem>
              ))
            )}
            {/* {stagingData == null ? (
              <MenuItem>Loading...</MenuItem>
            ) : (
              stagingData.map((item, index) => (
                <SubMenu label={item.columnTitle} key={index}>
                  {stagingData[index].valueDescList.map((item2, index2) => (
                    <MenuItem key={index2}>{item2.validValueId} - {item2.validValue} </MenuItem>
                  ))}
                </SubMenu>
              ))
            )} */}
          </Menu>
        </Sidebar>
      </div>
      <div className="w-4/5 bg-gray-100 p-4 overflow-auto">
      {currentTNMList.length==0?(<p>...</p>):(
        currentTNMList.map((item2, index2) => (
          <div key={index2} className=" hover:bg-sky-700 cursor-pointer" onClick={()=>handleTNMItemClick(item2)}>
             <TNMListItemV2 key ={index2} prop={item2}/>
          </div>
            //  <TNMListItemV2 key ={index2} prop={item2} onClick={()=>handleTNMItemClick(item2)}/>
          ))
      )}
      </div>
    </div>
  );
}

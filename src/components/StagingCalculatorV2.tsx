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
  const[currentTNMList,setCurrentTNMList] = useState([]);

  //disease select
  const [diseaseSites, setDiseaseSites] = useState(null);
  const [dropdownValue, setDropdownValue] = useState(null);

  //staging values
  const BASE_URL = "https://dan1423-001-site1.btempurl.com";
  const [stagingUrl, setStagingUrl] = useState("");
  const [stagingData, setStagingData] = useState(null);
  const[currentStagingDataIndex,setCurrentStagingDataIndex]=useState(-1);
  const [stagingDataItems,setStagingDataItems]=useState(null);
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


  const handleTNMClick=(index)=>{
    setCurrentStagingDataIndex(index);
    setCurrentTNMList(stagingDataItems[index]);
  };

  const handleTNMItemClick=(currentItem)=>{
    let currentColumnName = stagingData[currentStagingDataIndex].columnName;
    const newList = stagingData.map((item,index) => {
      if (index === currentStagingDataIndex) {
        const updatedItem = {
          ...item,
          selectedValidValueId: currentItem.validValueId,
          selectedValidValue:currentItem.validValue
        };
        return updatedItem;
      }
      return item;
    });

    setStagingData(newList);
    let obj = { ColumnName: currentColumnName, ValidValue: currentItem.validValue };
    handleStagingCriteriaSelect(obj);
  };


  
  const handleStagingCriteriaSelect = (obj) => {
    const updateList = (list = [], updatedObject) => {
        const index = list.findIndex(item => item.ColumnName === updatedObject.ColumnName);
        if (index !== -1) {
          list.splice(index, 1, updatedObject);
        } else {
          list.push(updatedObject);
        }
        return list;
      }
  
  
      let list = listOfStagingValues;
      list = updateList(list, obj);
      setListOfStagingValues(list);
  
      let partialUrl = stagingUrl;
      list.forEach((item, index) => {
        partialUrl += `&${item.ColumnName}=${item.ValidValue}`;
      });
      fetch(partialUrl)
        .then(response => response.text())
        .then(data => {
          if (data.includes('The given data does not a produce a stage')) {
           setCalculatedStage('...');
           return;
          }
          setCalculatedStage(data);
        })
        .catch(error => {
          console.error('Error fetching dropdown data:', error);
        });
};

  
  const handleDiseaseSelect = (itemValue, index) => {
    setDropdownValue(itemValue);
    setStagingData(null);
    setCalculatedStage("...");
    
    if (itemValue == null || itemValue == "") return;

    let currentDiseaseUrl = `https://dan1423-001-site1.btempurl.com/tnmstaging/staging-data-items-v2/${itemValue}/1`;
    fetch(currentDiseaseUrl) // Replace 'api' with the actual endpoint to fetch staging data
      .then((response) => response.json())
      .then((data) => {
        setStagingData(data);
        
        let simpArr = [];
        data.forEach(element => {
          simpArr.push(element.valueDescList);
        });
        setStagingDataItems(simpArr);  
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
    <div>
      <nav class="w-full fixed top-0 z-50 grid  place-items-center text-2xl font-bold bg-blue-700 text-white">{calculatedStage==="..."?"Staging Result Goes Here...":"Staging Result : "+calculatedStage}</nav>
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
                <div  key={index} className="hover:bg-blue-700 hover:text-white">
                    <MenuItem  key={index} onClick={()=>handleTNMClick(index)}>
                <span className="font-bold">{item.columnTitle}</span>
                {item.selectedValidValueId==null?"":","}
                <span  className="italic ml-2 mr-2">{item.selectedValidValueId==null?"":item.selectedValidValueId+" -"}</span>
                 <span className="italic"> {item.selectedValidValue==null?"":item.selectedValidValue}</span>
                </MenuItem>
                </div>
             
              ))
            )}
            
          </Menu>
         
        </Sidebar>
      </div>
      <div className="w-4/5 bg-gray-100 p-4 overflow-auto">
      {currentTNMList.length==0?(<p>...</p>):(
        currentTNMList.map((item2, index2) => (
          <div key={index2} className="hover:bg-blue-700 hover:text-white cursor-pointer rounded-lg shadow-xl" onClick={()=>handleTNMItemClick(item2)}>
             <TNMListItemV2 key ={index2} prop={item2}/>
          </div>
          ))
      )}


      </div>
    </div>
    </div>
   
  );
}

// @ts-nocheck
import React, { use, useState,useEffect } from 'react';
import customStyle from "../styles/style.module.css"

const StagingValueRow = ({ prop = null, handleStagingCriteriaSelect }) => {

  if(prop == null)return(<div></div>);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownLabel, setDropdownLabel] = useState(null);

  useEffect(() => {
    setDropdownValue(null);
    setDropdownLabel(null);
  }, [prop]);


  const handleValueChange = (itemValue, index) => {
    setDropdownValue(itemValue);
    if(itemValue=="none"){
      return;
    } 
    index = index - 1;
    setDropdownLabel(prop.valueDescList[index].descr);
    let obj = { ColumnName: prop.columnName, ValidValue: itemValue };
    handleStagingCriteriaSelect(obj);
  };
  return (
    <div style={styles.container} >
      <div style={{ flex: 2,paddingRight:20}} className={customStyle.column}>
        <p style={styles.textSize}>{prop == null ? '' : prop.columnTitle}</p>
      </div>
      <div style={{ flex: 10}} className={customStyle.column}>
        <div>
          <select
          className='outline-double bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          style={{width: '100%'}}
            value={dropdownValue == null ? '' : dropdownValue}
            onChange={(event) => handleValueChange(event.target.value, event.target.selectedIndex)}
          >
            <option value="none">None</option>
            {prop == null ? (
              <option value="none"></option>
            ) : (
              prop.valueDescList.map((item, index) => (
                <option value={item.validValue} key={index}>
                  {item.descr}
                </option>
              ))
            )}
          </select>
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center',height:'80%' }}>
          
          <p style={{overflow:'auto',marginTop:2,backgroundColor: '#191970',height:100,padding:10,color:'#fff'}}>
            {dropdownLabel == null
              ?<i style={{color:'red'}}>select criteria from dropdown above</i> 
              : dropdownLabel}
          </p>
        </div>
      </div>
      <div style={{flex:1,paddingLeft:30}} className={customStyle.column}>
        <p style={styles.textSize}>{dropdownValue == null ? '...' : dropdownValue}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
     marginBottom: 50,
    fontSize: 15,
    justifyContent: 'space-between',

  },
  selectedRow: {
    backgroundColor: '#e6f3ff',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fafafa',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  textSize:{
    fontSize: 20
  }
};

export default StagingValueRow;

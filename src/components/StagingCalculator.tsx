// @ts-nocheck
import React, { useState, useEffect } from 'react';
import StagingValueRow from './StagingValueRow';

const StagingCalculator = () => {

    //disease select
    const [diseaseSites, setDiseaseSites] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);

    //staging values
    const BASE_URL = 'https://dan1423-001-site1.btempurl.com';
    const [stagingUrl, setStagingUrl] = useState('');
    const [stagingData, setStagingData] = useState(null);
    const [items, setItems] = useState([{ label: 'loading', value: '....' }]);
    const [listOfStagingValues, setListOfStagingValues] = useState([]);
    const [calculatedStage, setCalculatedStage] = useState('...');


    useEffect(() => { 
        fetch('https://dan1423-001-site1.btempurl.com/tnmstaging/diseases')
            .then(response => response.json())
            .then(data => {
                setDiseaseSites(data);
            })
            .catch(error => {
                console.error('Error fetching dropdown data:', error);
            });
    }, []);

    const handleDiseaseSelect = (itemValue, index) => {
        setDropdownValue(itemValue);
        setStagingData(null);
        setCalculatedStage('...');
        if(itemValue == null || itemValue == '')return;
       
        let currentDiseaseUrl = `https://dan1423-001-site1.btempurl.com/tnmstaging/staging-data-items-v2/${itemValue}/1`;
        fetch(currentDiseaseUrl) // Replace 'api' with the actual endpoint to fetch staging data
            .then(response => response.json())
            .then(data => {
                setStagingData(data);
                //setItems(data.map(item => ({ label: item.ColumnTitle, value: item.ColumnName })));
            })
            .catch(error => {
                console.error('Error fetching dropdown data:', error);
            });
             setStagingUrl( encodeURI(`${BASE_URL}/tnmstaging/calculate?diseaseId=${itemValue}&stagingTypeId=1`));
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

    return (
        <div className='container mx-auto'>
            <div>
                <label  className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>Select a Disease Site:</label>
                <select className='block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    // style={styles.picker}
                    value={dropdownValue == null ? '...' : dropdownValue}
                    onChange={(event) => handleDiseaseSelect(event.target.value,event.target.selectedIndex)}
                >
                      <option value="none">None</option>
                    {diseaseSites == null ? (
                        <option value="">loading...</option>
                    ) :
                    diseaseSites.map((item, index) => (
                            <option value={item.ajccDiseaseId} key={index}>
                                {item.diseaseTitle}
                            </option> 
                        ))
                    }
                </select>

            </div>
            <div className='mt-2'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 10,backgroundColor:'cyan'}}>
                    <div style={{ flexDirection: 'row' }}>
                        <div  style={{ display: 'flex',fontSize:20}}>
                            <div style={{ flexDirection: 'column',marginRight:5 }}>Staging Result:</div>
                            <div style={{ flexDirection: 'column',fontWeight:'bolder' }}>{calculatedStage == null ? 'test' : calculatedStage}</div>
                        </div>
                        {/* <span style={{ fontSize: 20, marginRight: 2 }}>Staging Result:</span>
                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>{calculatedStage == null ? '...' : calculatedStage}</span> */}
                    </div>
                </div>

                <div style={{ margin: 20 }}>
                    {stagingData == null ? (
                       
                        <StagingValueRow />
                    ) : (
                        stagingData.map((item, index) => (
                            <StagingValueRow key={index} prop={item} handleStagingCriteriaSelect={handleStagingCriteriaSelect} />
                        ))
                    )}
                </div>
            </div>

        </div>

    );
};

export default StagingCalculator;

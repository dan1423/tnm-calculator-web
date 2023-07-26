
import React, { useState, useEffect } from 'react';
import StagingValueRow from './StagingValueRow';

const StagingValues = ({ route }) => {
  const BASE_URL = 'https://dan1423-001-site1.btempurl.com';
  const selectedValue = route.params.AJCCDiseaseId;
  const [stagingData, setStagingData] = useState(null);
  const [items, setItems] = useState([{ label: 'loading', value: '....' }]);
  const [listOfStagingValues, setListOfStagingValues] = useState([]);
  const [calculatedStage, setCalculatedStage] = useState('...');

  const stagingUrl = encodeURI(`${BASE_URL}/tnmstaging/calculate?diseaseId=${selectedValue}&stagingTypeId=1`);

  const handleStagingCriteriaSelect = (obj) => {
    // ... Same code as before ...
    // (handleStagingCriteriaSelect function remains unchanged)
    // ...
  };

  useEffect(() => {
    fetch(`https://dan1423-001-site1.btempurl.com/tnmstaging/staging-data-items-v2/${selectedValue}/1`) // Replace 'api' with the actual endpoint to fetch staging data
      .then(response => response.json())
      .then(data => {
        setStagingData(data);
        setItems(data.map(item => ({ label: item.ColumnTitle, value: item.ColumnName })));
      })
      .catch(error => {
        console.error('Error fetching dropdown data:', error);
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 10 }}>
        <div style={{ flexDirection: 'row' }}>
          <span style={{ fontSize: 20, marginRight: 2 }}>Staging Result:</span>
          <span style={{ fontSize: 20, fontWeight: 'bold' }}>{calculatedStage == null ? '...' : calculatedStage}</span>
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
  );
};

export default StagingValues;

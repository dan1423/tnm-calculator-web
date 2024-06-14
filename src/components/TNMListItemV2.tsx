// @ts-nocheck
import React, { useState, useEffect } from "react";
import customStyle from "../styles/style.module.css"

function TNMListItemV2(prop=null) {
  return (
    <div style={styles.container} >
      <div style={{ flex: 2,paddingRight:20}} className={customStyle.column}>
        <p style={styles.textSize}>{prop == null ? '' : prop.prop.validValueId}</p>
      </div>
      <div style={{ flex: 10}} className={customStyle.column}>
       
        <div style={{ justifyContent: 'center', alignItems: 'center',height:'80%' }}>
          
          <p style={{overflow:'auto',marginTop:2,backgroundColor: '#191970',height:100,padding:10,color:'#fff'}}>
            {prop.prop.descr}
          </p>
        </div>
      </div>
      <div style={{flex:1,paddingLeft:30}} className={customStyle.column}>
        <p>{prop.prop.validValue}</p>
      </div>
    </div>
  )
}
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
export default TNMListItemV2
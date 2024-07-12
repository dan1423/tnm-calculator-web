// @ts-nocheck
import React, { useState, useEffect } from "react";
import customStyle from "../styles/style.module.css"

function TNMListItemV3(prop=null) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
      <div className="bg-blue-900 text-white pl-2">{prop == null ? '' : prop.prop.validValueId}</div>
      <div  className="bg-blue-500 text-white pl-2">{prop.prop.validValue} </div>
      </div>
      <div>
      {prop.prop.descr}
      </div>
    </div>
  )
}

export default TNMListItemV3;
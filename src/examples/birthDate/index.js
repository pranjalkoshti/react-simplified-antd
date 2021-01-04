import React, { Component, Fragment, useState } from "react";
import BirthDateComp from '../../components/birthDate';


const BirthDateCompDemo=()=>{

    return(
        <div style={{width:'100%',margin:'auto', padding:'20px',marginTop:'40px'}}>
          <h2>Table with Form</h2>
          <BirthDateComp
            fieldName={'birthDate'}
            date={'2021-01-10'}
            onChange={(val) => {
                console.log(val)
            }} />
        </div>

        
    )
}

export default BirthDateCompDemo;
import React, { Component, Fragment, useState } from "react";
import TableWithForm from '../index';
import * as fields from '../../form/demo/fields';
import { Form } from 'antd';

const TableWithFormDemo=()=>{
  const [form] = Form.useForm();
  const [data, setdata] = useState([{fName:'abc',lName:'ab',emailId:'abc'}]);

    return(
        <div style={{width:'100%',margin:'auto', padding:'20px',marginTop:'40px'}}>
          <h2>Table with Form</h2>
          <TableWithForm
            fields={[...fields.fName, ...fields.mName, ...fields.lName, ...fields.email]}
            checkDuplicateItem={true}
            uniqueId={'emailId'}
            initialData={data}
            onChange={(data) => {
              setdata(data)
            }}
            onError={(err)=>{
              console.log(err)
            }}
            showDeleteAction={true}
            actions={()=>{
              
            }}
        />
        </div>

        
    )
}

export default TableWithFormDemo;
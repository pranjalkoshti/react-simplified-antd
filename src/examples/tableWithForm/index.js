import React, { Component, Fragment, useState } from "react";
import TableWithForm from '../../components/tableWithForm';
import * as fields from '../form/fields';
import { Form } from 'antd';

const TableWithFormDemo=()=>{
  const [form] = Form.useForm();
  const [data, setdata] = useState([{fName:'abc',lName:'ab',emailId:'abc'}]);

    return(
        <div style={{width:'100%',margin:'auto', padding:'20px',marginTop:'40px'}}>
          <h2>Table with Form</h2>
          <TableWithForm
            fields={[...fields.fName, ...fields.mName, ...fields.lName, ...fields.email]}
            formColumns={4}
            checkDuplicateItem={true}
            uniqueId={'emailId'} // == this should be name of unique field being used in data 
            initialData={data}
            onChange={(data) => {
              setdata(data)
            }}
            onError={(err)=>{
              console.log(err)
            }}
            formAlign="MODAL" // ---- 'MODAL' || 'INLINE'
            showDeleteAction={true}
            showEditAction={true}
        />
        </div>

        
    )
}

export default TableWithFormDemo;
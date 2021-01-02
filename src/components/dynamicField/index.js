
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Row, Col, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
let layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const DynamicFieldSet = (props) => {
  const [form] = Form.useForm()
  let mainField = props.field;
  const [option, setoption] = useState(null)
  let main=mainField[0].name

  useEffect(() => {
    form.setFieldsValue({
      response:mainField[0].initialValue
    })
  }, []);
  const rules = [{ required: true }];
  // console.log('props',props)
  return (
    <Form.List name={mainField[0].name} rules={rules} >
    {(fields, { add, remove ,move}) => {
    
      //  console.log('fields',fields)
      return (
        <div>
          {fields.map((field, index) => (
            <Row key={field.key} gutter={14}>
              <Col span={12}>
                <Form.Item
                  name={[field.name, "response"]}
                  fieldKey={[field.fieldKey, "response"]}
                  // initialValue={mainField[0].initialValue[index].response}
                  // initialValue={[field.initialValue,"response"]}
                  rules={rules}
                >
                  {mainField[0].values ?
                  option != null && option == 'between' ? 
                  
                  <Input.Group compact>
                  <Form.Item
                    name={[field.name, 'response','from']}
                    noStyle
                    rules={[{ required: true, message: 'From value is required' }]}
                  >
                   <InputNumber style={{ width: '50%' }} placeholder="From" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'response','to']}
                    noStyle
                    rules={[{ required: true, message: 'To value is required' }]}
                  >
                   <InputNumber style={{ width: '50%' }} placeholder="To" />
                  </Form.Item>
                </Input.Group>
                  :
                  <InputNumber placeholder="Response" style={{width:'100%'}}/>
                  :
                  <Input placeholder="Response" />
                  }
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={[field.name, "summary"]}
                  fieldKey={[field.fieldKey, "summary"]}
                  // initialValue={[field.initialValue,"summary"]}
                  rules={rules}
                >
                  {mainField[0].values ?
                   <Select 
                   onChange={(val)=>{
                    //  setoption(val)
                   }}
                   style={{ width:'100%'}}>
                   {mainField[0].values.map((o)=>{
                     return(
                       <Select.Option value={o.value}>{o.title}</Select.Option>
                     )
                   })
                   }
                 </Select>:
                  <Input placeholder="summary" />
                 }
                </Form.Item>
              </Col>
              <Col flex="none" span={2}>
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                add();
              }}
              style={{ width: "100%" }}
            >
              <PlusOutlined /> Add field
            </Button>
          </Form.Item>
        </div>
      );
    }}
  </Form.List>
   
  );
};
export default DynamicFieldSet
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DynamicFieldFormItem from './dynamicFieldFormItem';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
    }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 20,
      offset: 4
    }
  }
};
let layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

const DynamicFieldSet = props => {
  const [form] = Form.useForm();
  let mainField = props.field && props.field[0] ? props.field[0] : null;
  const [option, setoption] = useState(null);
  useEffect(() => {
    form.setFieldsValue({
      response: mainField.initialValue
    });
  }, []);
  return /*#__PURE__*/React.createElement(Form.List, {
    name: mainField.name
  }, (fields, {
    add,
    remove,
    move
  }) => {
    return /*#__PURE__*/React.createElement("div", null, fields.map((field, index) => /*#__PURE__*/React.createElement("div", {
      key: field.key,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
      }
    }, mainField.fields.map(f => {
      return (
        /*#__PURE__*/
        // <Form.Item
        //   {...formItemLayout}
        //   labelAlign={'left'}
        //   style={{ flex: 1, margin:'5px 1px' }}
        //   label={index === 0 ? f.label : ''}
        //   name={[field.name, f.name]}
        //   fieldKey={[field.fieldKey, f.name]}
        //   rules={[{ required: f.required, message: f.message }]}
        // >
        // <InputNumber style={{ width:'100%' }} placeholder={f.placeholder} />
        // </Form.Item>
        React.createElement(DynamicFieldFormItem, {
          fieldKey: [field.fieldKey, f.name],
          f: f,
          index: index,
          name: [field.name, f.name]
        })
      );
    }), /*#__PURE__*/React.createElement(MinusCircleOutlined, {
      style: {
        margin: '10px'
      },
      className: "dynamic-delete-button",
      onClick: () => {
        remove(field.name);
      }
    })) // <Row key={field.key} gutter={14}>
    //   <Col span={12}>
    //     <Form.Item
    //       name={[field.name, "response"]}
    //       fieldKey={[field.fieldKey, "response"]}
    //       // initialValue={mainField.initialValue[index].response}
    //       // initialValue={[field.initialValue,"response"]}
    //       rules={rules}
    //     >
    //       {mainField.values ?
    //       option != null && option == 'between' ? 
    //       <Input.Group compact>
    //       <Form.Item
    //         name={[field.name, 'response','from']}
    //         noStyle
    //         rules={[{ required: true, message: 'From value is required' }]}
    //       >
    //        <InputNumber style={{ width: '50%' }} placeholder="From" />
    //       </Form.Item>
    //       <Form.Item
    //         name={[field.name, 'response','to']}
    //         noStyle
    //         rules={[{ required: true, message: 'To value is required' }]}
    //       >
    //        <InputNumber style={{ width: '50%' }} placeholder="To" />
    //       </Form.Item>
    //     </Input.Group>
    //       :
    //       <InputNumber placeholder="Response" style={{width:'100%'}}/>
    //       :
    //       <Input placeholder="Response" />
    //       }
    //     </Form.Item>
    //   </Col>
    //   <Col span={10}>
    //     <Form.Item
    //       name={[field.name, "summary"]}
    //       fieldKey={[field.fieldKey, "summary"]}
    //       // initialValue={[field.initialValue,"summary"]}
    //       rules={rules}
    //     >
    //       {mainField.values ?
    //        <Select 
    //        onChange={(val)=>{
    //         //  setoption(val)
    //        }}
    //        style={{ width:'100%'}}>
    //        {mainField.values.map((o)=>{
    //          return(
    //            <Select.Option value={o.value}>{o.title}</Select.Option>
    //          )
    //        })
    //        }
    //      </Select>:
    //       <Input placeholder="summary" />
    //      }
    //     </Form.Item>
    //   </Col>
    //   <Col flex="none" span={2}>
    //     <MinusCircleOutlined
    //       className="dynamic-delete-button"
    //       onClick={() => {
    //         remove(field.name);
    //       }}
    //     />
    //   </Col>
    // </Row>
    ), /*#__PURE__*/React.createElement(Form.Item, null, /*#__PURE__*/React.createElement(Button, {
      type: "dashed",
      onClick: () => {
        add();
      },
      style: {
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(PlusOutlined, null), " Add field")));
  });
};

export default DynamicFieldSet;
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Divider } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col, Upload, Radio, Select, DatePicker } from 'antd';
import validateFields, { FormProps } from 'antd/lib/form';
import DynamicFieldSet from '../dynamicField';
import BirthDateComp from '../birthDate';
import moment from 'moment'; // import { gutter, calculateSpan } from '../commonImports/responsiveSettings';
// import PhoneInput from 'react-phone-input-2'

const {
  Option
} = Select;
const {
  RangePicker
} = DatePicker;
const dateFormat = 'YYYY/MM/DD'; // direction - optional 
// columns - optional

const tailLayout = {
  wrapperCol: {
    offset: 20,
    span: 4
  }
};

const onFinish = (values, props) => {
  // console.log('Success:', values);
  if (props.setFormValues && props.handleSubmit) {
    props.setFormValues(values);
    props.handleSubmit(values);
  }
};

const onFinishFailed = (errorInfo, props) => {
  console.log('Failed:', errorInfo);

  if (props.handleError) {
    props.handleError(errorInfo);
  }
}; // const fields = [
//   {
//     type:'input',
//     label: 'Username',
//     name:'username',
//     required:true,
//     message:'Please input username',
//     custValidation:[{
//     }]
//   },
//   {
//     type:'input',
//     label: 'Email',
//     name:'userEmail',
//     required:true,
//     message:'Please input email',
//     custValidation:[{
//     }]
//   },
//   {
//     type:'password',
//     label: 'Password',
//     name:'password',
//     required:true,
//     message:'Please input password',
//     custValidation:[{
//     }]
//   },
//   {
//     type:'input',
//     label: 'Username',
//     name:'username',
//     required:false,
//     message:'Please input username',
//     custValidation:[{
//     }]
//   },
//   {
//     type:'upload',
//     label: 'Photo Upload',
//     name:'userPhoto',
//     required:true,
//     message:'Please input email',
//     custValidation:[{
//     }]
//   },
//   {
//     type:'checkbox',
//     label: 'Remember Me',
//     name:'remember',
//     required:false,
//     message:'Please input password',
//     custValidation:[{
//     }]
//   }
// ]
// const initialValues = {
//   password:'password',
//   userEmail:'abc@gmail.com',
//   remember:true
// }


const callCustValidation = form => {
  form.validateFields().then(values => {
    console.log(values);
  }).catch(errorInfo => {
    console.log(errorInfo);
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { password: ['username'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  });
};

const CustomForm = props => {
  const [form] = Form.useForm();
  const [uploadList, setuploadList] = useState(props.photoArr ? props.photoArr : []);
  const [uploadListPicture, setuploadListPicture] = useState(props.photoArr ? props.photoArr : []); // validateFields(props)

  let span = 24; // console.log(form)

  if (props.columns && props.columns == 2) {
    span = 12;
  }

  if (props.columns && props.columns == 3) {
    span = 8;
  }

  if (props.columns && props.columns == 4) {
    span = 6;
  }

  let layout = props.layout ? props.layout : {
    labelCol: {
      span: 24
    },
    wrapperCol: {
      span: 24
    }
  };

  if (props.direction && props.direction == 'HORIZONTAL') {
    layout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
  }

  const uploadButton = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ant-upload-text"
  }, "Upload"));

  const uploadButtonPicture = a => /*#__PURE__*/React.createElement(Button, {
    disabled: a
  }, /*#__PURE__*/React.createElement(UploadOutlined, null), " Upload");

  const handleUploadChange = file => {
    // console.log(file)
    setuploadList(file.fileList);
  };

  const handleUploadChangePicture = file => {
    // console.log(file)
    setuploadListPicture(file.fileList);
  };

  const onFeildChange = (val, type) => {
    // console.log('props.....',props)
    if (props.onChangeMob) {
      props.onChangeMob(val, type);
    }
  };

  const renderElement = p => {
    let style = {
      width: '100%'
    };

    if (p.width) {
      style.width = p.width;
    }

    let elemType = p.type;
    let elem = /*#__PURE__*/React.createElement(Input, {
      disabled: props.disabled ? props.disabled : false,
      style: style,
      placeholder: p.placeholder != undefined ? p.placeholder : p.name
    });

    if (p.prefix) {
      elem = /*#__PURE__*/React.createElement(Input, {
        disabled: props.disabled ? props.disabled : false,
        addonBefore: p.prefix,
        style: style,
        placeholder: p.placeholder != undefined ? p.placeholder : p.name
      });
    }

    switch (elemType) {
      case 'checkbox':
        elem = p.values ? /*#__PURE__*/React.createElement(Checkbox.Group, null, p.values.map(m => {
          return /*#__PURE__*/React.createElement(Checkbox, {
            value: m
          }, m);
        })) : /*#__PURE__*/React.createElement(Checkbox, {
          value: p.name
        }, p.option != undefined ? p.option : p.label);
        break;

      case 'password':
        elem = /*#__PURE__*/React.createElement(Input.Password, {
          placeholder: p.name
        });
        break;

      case 'mobile':
        elem =
        /*#__PURE__*/
        // <PhoneInput country={'in'} placeholder={p.placeholder} onChange={(val, type) => onFeildChange(val, type)} />
        React.createElement(Input, {
          placeholder: p.name
        });
        break;

      case 'upload':
        elem = /*#__PURE__*/React.createElement(Upload, {
          name: "avatar",
          listType: "picture-card",
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
          className: "avatar-uploader",
          defaultFileList: uploadList // showUploadList={false}
          // beforeUpload={beforeUpload}
          ,
          onChange: handleUploadChange
        }, uploadList.length >= (p.limit ? p.limit : 0) ? null : uploadButton);
        break;

      case 'upload-picture':
        elem = /*#__PURE__*/React.createElement(Upload, {
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
          name: "avatar",
          listType: "picture",
          className: "avatar-uploader" // showUploadList={false}
          ,
          defaultFileList: uploadListPicture //  fileList={uploadList}
          // beforeUpload={beforeUpload}
          ,
          onChange: handleUploadChangePicture
        }, uploadListPicture.length >= (p.limit ? p.limit : 0) ? uploadButtonPicture(true) : uploadButtonPicture(false));
        break;

      case 'radio':
        elem = /*#__PURE__*/React.createElement(Radio.Group, null, p.values && p.values.map(o => {
          return /*#__PURE__*/React.createElement(Radio, {
            value: o.toUpperCase()
          }, o);
        }));
        break;

      case 'select':
        elem = /*#__PURE__*/React.createElement(Select, {
          style: {
            width: p.width ? p.width : '100%'
          }
        }, p.values && p.values.map(o => {
          // console.log(typeof o)
          return /*#__PURE__*/React.createElement(Option, {
            value: o.toUpperCase()
          }, o);
        }));
        break;

      case 'multiselect':
        elem = /*#__PURE__*/React.createElement(Select, {
          mode: "multiple",
          placeholder: p.label,
          style: {
            width: p.width ? p.width : '100%'
          }
        }, p.values && p.values.map(o => {
          return /*#__PURE__*/React.createElement(Option, {
            value: o.value,
            key: o.value
          }, o.label);
        }));
        break;
      // case 'multi':
      //   elem = (
      //     <DynamicFieldSet field={p} />)
      //   break;

      case 'datepicker':
        elem = /*#__PURE__*/React.createElement(DatePicker, {
          onChange: (date, val) => {
            if (props.onChange) {
              props.onChange(date, val);
            }
          },
          format: dateFormat,
          style: {
            width: '100%'
          }
        });
        break;

      case 'daterangepicker':
        elem = /*#__PURE__*/React.createElement(RangePicker, {
          onChange: (date, val) => {
            if (props.onChange) {
              props.onChange(date, val);
            }
          },
          format: dateFormat,
          style: {
            width: '100%'
          }
        });
        break;

      case 'datepicker':
        elem = /*#__PURE__*/React.createElement(DatePicker, {
          onChange: val => {
            if (props.onChange) {
              props.onChange(val);
            }
          },
          format: dateFormat,
          style: {
            width: '100%'
          }
        });
        break;

      case 'inputGroup':
        elem = /*#__PURE__*/React.createElement(DatePicker, {
          onChange: val => {
            if (props.onChange) {
              props.onChange(val);
            }
          },
          format: dateFormat,
          style: {
            width: '100%'
          }
        });
        break;

      case 'textarea':
        elem = /*#__PURE__*/React.createElement(Input.TextArea, {
          placeholder: p.placeholder ? p.placeholder : p.name
        });
        break;

      case 'birthDate':
        elem = /*#__PURE__*/React.createElement(BirthDateComp, {
          fieldName: p.name,
          date: props.form ? props.form.getFieldValue(p.name) : '',
          onChange: val => {
            if (props.form) {
              props.form.setFieldsValue({
                [p.name]: moment(val).format('YYYY-MM-DD')
              });
            }
          }
        });
        break;

      case 'dynamicFieldSet':
        elem = /*#__PURE__*/React.createElement(DynamicFieldSet, {
          field: [p]
        });

      default:
    }

    return elem;
  };

  return (
    /*#__PURE__*/
    //   <Form
    //     {...layout}
    //     name="basic"
    //     initialValues={props.initialValues}
    //     onFinish={(values)=>{
    //       onFinish(values,props)}}
    //     onFinishFailed={(errorInfo)=>{
    //       onFinishFailed(errorInfo, props)}}
    // >
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, {
      gutter: 32
    }, props.fields && props.fields.map(p => {
      // console.log('phjgjh',p)
      let elem = renderElement(p);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, {
        span: span // xs={calculateSpan(span, 'xs')} 
        // sm={calculateSpan(span, 'sm')} 
        // md={calculateSpan(span, 'md')} 
        // lg={calculateSpan(span, 'lg')} 
        // xl={calculateSpan(span, 'xl')} 
        // xxl={calculateSpan(span, 'xxl')}

      }, /*#__PURE__*/React.createElement(Form.Item, _extends({
        colon: false,
        labelAlign: "right"
      }, layout, {
        label: p.showlabel == undefined || p.showlabel != undefined && p.showlabel == true ? p.label : null,
        name: p.name // valuePropName={'checked'}
        ,
        rules: [{
          required: p.required,
          message: p.message ? p.message : p.placeholder ? `please input ${p.placeholder}` : ''
        }, ({
          getFieldValue
        }) => ({
          validator: (rule, value) => {
            if (value) {
              // console.log('p.custValidation && p.custValidation[0]',p.custValidation && p.custValidation[0])
              if (p.custValidation && p.custValidation[0] && p.custValidation[0].type == 'regx') {
                if (!value.match(p.custValidation[0].validator)) {
                  return Promise.reject(`${p.custValidation[0].message}`);
                }
              }
            }

            return Promise.resolve(); // console.log('value')
          }
        }) // ({ getFieldValue }) => ({
        //   validator(rule, value ,cb) {
        //     // console.log(rule,value,cb)
        //     return Promise.resolve();
        //     // if (!value || getFieldValue('password') === value) {
        //     //   return Promise.resolve();
        //     // }
        //     // return Promise.reject('The two passwords that you entered do not match!');
        //   },
        // }),
        ]
      }), elem)), p.divider && /*#__PURE__*/React.createElement(Divider, null));
    })), props.render ? props.render() : null)
  );
};

export default CustomForm;
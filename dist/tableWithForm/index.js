import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Row, Col, Upload, Checkbox, message, Select, Popconfirm } from 'antd'; // import Highlighter from 'react-highlight-words';

import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomForm from '../form'; // import { layout } from '../commonImports/import1';

import moment from 'moment';
const {
  Option
} = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
}

const TableWithForm = props => {
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setsearchedColumn] = useState('');
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState([]);
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState({});
  const [selectedItem, setselectedItem] = useState(null);
  const [custForm] = Form.useForm();
  let dd = props.initialData ? props.initialData.length : 0;
  useEffect(() => {
    if (props.initialData) {
      let arr = props.initialData.map((item, i) => {
        item.key = i;
        return item;
      });
      setdata(arr);
    } // setinitial(props.dynamicData.length)

  }, [dd]);

  const imagePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setpreviewImage(file.url || file.preview);
    setpreviewVisible(true);
  };

  const onFinish = values => {
    let arr = [...data];
    values.key = data.length;

    if (props.checkDuplicateItem && props.checkDuplicateItem == true && props.uniqueId) {
      let uniqueId = props.uniqueId;
      let flag = arr.find(a => a[uniqueId] == values[uniqueId]);

      if (flag) {
        props.onError('DUPLICATE_ENTRY_EXCEPTION');
      } else {
        if (selectedItem == null) {
          addItem(values);
        } else {
          editItem(values);
        }
      }
    } else {
      if (selectedItem == null) {
        addItem(values);
      } else {
        editItem(values);
      }
    }
  };

  const addItem = item => {
    let arr = [...data];
    arr.push({ ...item
    });
    custForm.resetFields();
    setvisible(false);
    setdata(arr);

    if (props.onChange) {
      props.onChange(arr);
    }
  };

  const deleteItem = index => {
    let arr = [...data];
    arr.splice(index, 1);
    setdata(arr);
    setvisible(false);

    if (props.onChange) {
      props.onChange(arr);
    }
  };

  const editItem = item => {
    let arr = [...data];
    let index = arr.find(a => a.key == item.key);

    if (index != -1) {
      arr.splice(index, 1, item);
      setdata(arr);
      setvisible(false);

      if (props.onChange) {
        props.onChange(arr);
      }
    }

    setselectedItem(null);
    custForm.resetFields();
  };

  let a = [];
  let columns = props.fields.map(p => {
    if (p.type == "datepicker") {
      return {
        title: p.label,
        dataIndex: p.name,
        key: p.name,
        // width: 150,
        render: text => {
          var dateString = moment(text).format("DD-MM-YYYY");
          return /*#__PURE__*/React.createElement("span", null, dateString);
        }
      };
    }

    if (p.type == "upload") {
      return {
        title: p.label,
        dataIndex: p.name,
        key: p.name,
        // width: 150,
        render: text => {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Upload, {
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            className: "docmentView",
            listType: "picture-card",
            defaultFileList: text && text.bucket ? [text] : text.fileList,
            onPreview: imagePreview,
            onRemove: () => {
              return false;
            }
          }), /*#__PURE__*/React.createElement(Modal, {
            visible: previewVisible,
            footer: null,
            onCancel: () => {
              setpreviewVisible(false);
            }
          }, /*#__PURE__*/React.createElement("img", {
            alt: "inside page image",
            style: {
              width: '100%'
            },
            src: previewImage
          })));
        }
      };
    }

    return {
      title: p.label,
      dataIndex: p.name,
      key: p.name,
      // width: 150,
      render: (text, record) => {
        return /*#__PURE__*/React.createElement("p", {
          style: {
            marginBottom: '0px'
          }
        }, text ? text : '-');
      } // ...this.getColumnSearchProps(p.name),

    };
  });

  if (props.showEditAction) {
    a.push({
      title: 'Edit',
      dataIndex: 'edit',
      render: (text, record) => /*#__PURE__*/React.createElement(Button, {
        onClick: () => {
          setselectedItem(record);
          setvisible(true);
          custForm.setFieldsValue({ ...record
          });
        }
      }, /*#__PURE__*/React.createElement(EditOutlined, null))
    });
  }

  ;

  if (props.showDeleteAction) {
    a.push({
      title: 'Delete',
      dataIndex: 'delete',
      render: (text, record) => /*#__PURE__*/React.createElement(Popconfirm, {
        placement: "topLeft",
        title: 'Are you sure ?',
        onConfirm: () => {
          deleteItem(record.key);
        },
        okText: "Yes",
        cancelText: "No"
      }, /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(DeleteOutlined, null)))
    });
  }

  ;

  const renderForm = () => {
    return /*#__PURE__*/React.createElement(Form, {
      form: custForm // {...layout}
      // initialValues={selectedItem != null ? {...selectedItem} : {}}
      ,
      onFinish: values => {
        onFinish(values);
      },
      onFinishFailed: errorInfo => {
        console.log(errorInfo);
      }
    }, /*#__PURE__*/React.createElement(CustomForm, {
      columns: props.formColumns ? props.formColumns : 3,
      fields: props.fields
    }), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      htmlType: "submit",
      style: {
        marginRight: 10
      }
    }, "Save"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setvisible(false);
      }
    }, "Cancel"));
  };

  let colarr = [...columns, ...a];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, {
    style: {
      marginBottom: '20px'
    }
  }, props.formAlign && props.formAlign == 'INLINE' ? /*#__PURE__*/React.createElement(Col, {
    span: 24
  }, renderForm()) : /*#__PURE__*/React.createElement(Col, {
    span: 6,
    offset: 18,
    style: {
      textAlign: 'right',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => {
      setvisible(true);
    }
  }, /*#__PURE__*/React.createElement(PlusOutlined, null), "Add"))), /*#__PURE__*/React.createElement(Table, {
    columns: colarr,
    dataSource: data,
    size: "small"
  }), !props.formAlign || props.formAlign == 'MODAL' && /*#__PURE__*/React.createElement(Modal, {
    title: "Add Details",
    destroyOnClose: true,
    visible: visible,
    onOk: () => {
      setvisible(false);
      setselectedItem(null);
      custForm.resetFields();
    },
    onCancel: () => {
      // ========= DEBUG - on cancel form values are not resetting 
      setvisible(false);
      setselectedItem(null);
      custForm.resetFields();
    },
    width: '80%',
    footer: false
  }, renderForm()));
};

export default TableWithForm;
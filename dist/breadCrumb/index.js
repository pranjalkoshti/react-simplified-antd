import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd'; // import { Link } from 'react-router-dom';

const {
  SubMenu
} = Menu;
const {
  Header,
  Content,
  Sider
} = Layout;

const MainBraidcrumb = props => {
  let arr = [];

  if (props.breadCrumb) {
    arr = props.breadCrumb;
  }

  return /*#__PURE__*/React.createElement(Breadcrumb, {
    style: {
      marginBottom: 10
    }
  }, arr.map(item => {
    // if(item.to == null){
    //   return(
    //         <Breadcrumb.Item>{item.title}</Breadcrumb.Item>
    //   )
    // }
    // return(
    //   <Link to={item.to}>
    //       <Breadcrumb.Item>{item.title}</Breadcrumb.Item>
    //   </Link>
    // )
    return /*#__PURE__*/React.createElement(Breadcrumb.Item, null, item.title);
  }));
};

export default MainBraidcrumb;
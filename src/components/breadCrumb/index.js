import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
// import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MainBraidcrumb=(props)=>{
  let arr = [];
  if(props.breadCrumb){
    arr = props.breadCrumb;
  }
    return(
        <Breadcrumb style={{ marginBottom: 10 }}>
          {arr.map((item)=>{
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
            return (
         
                    <Breadcrumb.Item>{item.title}</Breadcrumb.Item>
              
            )
          })}
      </Breadcrumb>
    )
}

export default MainBraidcrumb
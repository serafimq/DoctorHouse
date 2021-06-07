import React from 'react'
import style from './NavProfile.module.css'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import {
  CalendarOutlined,
  HistoryOutlined,
  FileTextOutlined,
  CompassOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

const NavProfile = ({setVisibleComponents}) => {

  const [mode, setMode] = React.useState('inline');
  const [theme, setTheme] = React.useState('light');
  const id = useSelector(state => state.user.id)
  return (
    <>
      <br />
      <br />
      <Menu
        className={style.menu}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
      >
        <Menu.Item onClick={()=> setVisibleComponents(0)} className={style.item} key="1" icon={<CalendarOutlined/>}>
        <div >Календарь</div>
          {/* <Link className={style.link} to={`/homepage/${id}`} >Календарь</Link> */}
        </Menu.Item>
        <Menu.Item onClick={()=> setVisibleComponents(1)} className={style.item} key="2" icon={<HistoryOutlined />}>
          <div >История</div>
          {/* <Link to={`/homepage/history/${id}`}>История</Link> */}
        </Menu.Item>
        <Menu.Item className={style.item} key="3" icon={<FileTextOutlined />}>
          Курс лечения
        </Menu.Item>
        <Menu.Item onClick={()=> setVisibleComponents(3)} className={style.item} key="4" icon={<CompassOutlined />}>
        <div >Карта</div>
          {/* <Link to={`/homepage/map/${id}`}>Карта</Link> */}
        </Menu.Item>
      </Menu>
    </>

  )
}

export default NavProfile


import React from 'react'
import style from './NavBar.module.css'
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'
import { signout } from '../../redux/actionCreators/userAC';
import { useDispatch, useSelector } from 'react-redux';
import { clearAvatar } from '../../redux/actionCreators/avatarAC';
import { clearHistory } from '../../redux/actionCreators/historyAC';
import { clearEvents } from '../../redux/actionCreators/eventsAC';
import { clearDoctor } from '../../redux/actionCreators/doctorAC';


export default function NavBar() {
  const { Header } = Layout;
  const id = useSelector(state => state.user.id)

  const dispatch = useDispatch()

  const deleteHandler = async (id) => {
    dispatch(signout(id))
    dispatch(clearEvents())
    dispatch(clearAvatar())
    dispatch(clearHistory())
    dispatch(clearDoctor())
  }

  const isAuth = useSelector(state => state.user.isAuth)

  return (
    isAuth ?
    <Layout className="layout">
      <Header className={style.header}>
      <div className={style.logo} >
        <Link to='/'> <img className={style.logoImg} src="https://image.flaticon.com/icons/png/512/1659/1659303.png" alt="" /> 
          <span className={style.dh}>DH</span> 
          
          <span className={style.ouse} >ouse</span>
        </Link>
      </div >
      <div className={style.menu} >
          <Menu mode="horizontal" defaultSelectedKeys={['0']} >
          <Menu.Item key="0"><Link to='/'>Главная</Link></Menu.Item>
          <Menu.Item key="1"><Link onClick={() => deleteHandler(id)} to='/'>Выйти</Link></Menu.Item>
          <Menu.Item key="2"><Link to={`/homepage/${id}`}>Личный кабинет</Link></Menu.Item>
        </Menu>
      </div >
      </Header>
    </Layout>
    :
    <Layout className="layout">
      <Header className={style.header}>
      <div className={style.logo} >
        <Link to='/'> <img className={style.logoImg} src="https://image.flaticon.com/icons/png/512/1659/1659303.png" alt="" /> 
          <span className={style.dh}>DH</span> 
          
          <span className={style.ouse} >ouse</span>
        </Link>
      </div >
        <div className={style.menu} >
        <Menu mode="horizontal" defaultSelectedKeys={['0']} >
          <Menu.Item key="0"><Link to='/'>Главная</Link></Menu.Item>
          <Menu.Item key="1"><Link to='/signup'>Регистрация</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/signin'>Авторизация </Link></Menu.Item>
        </Menu>
          </div >
      </Header>
    </Layout>
  )
}

import React, { useState } from 'react'
import style from './PersonalArea.module.css'
import { Row, Col } from 'antd';
import CalendarPage from './CalendarPage/CalendarPage';
import CardProfile from './CardProfile/CardProfile';
import History from '../../History/History';
import MapPage from '../../MapPage/MapPage';
import { AdminRoom } from './AdminRoom/AdminRoom';



const PersonalArea = () => {

  const [visibleComponents, setVisibleComponents] = useState(0)

  return (
    <>
      <div className={style.calendar}>
        <Row>
          <Col className={style.right_col} span={18} push={6}>
            {visibleComponents === 0 && <CalendarPage /> }
            {visibleComponents === 1 && <History /> }
            {visibleComponents === 3 && <MapPage /> }
            {visibleComponents === 4 && <AdminRoom /> }
            {/* {visibleComponents === 4 && <CalendarPage /> } */}
          </Col>
          <Col className={style.left_col} span={6} pull={18}>
            <CardProfile setVisibleComponents={setVisibleComponents}/>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default PersonalArea

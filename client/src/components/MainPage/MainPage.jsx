import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import style from './MainPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setAllDoctorThunk, sortDoctors,  } from '../../redux/actionCreators/doctorsAC'
import CardsDoctor from './CardsDoctor/CardsDoctor';


export default function MainPage() {
  const doctors = useSelector(state => state.doctors)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAllDoctorThunk())
  }, [])

  const [sortedField, setSortedField] = useState(false)
  const handleSort = (e, sorted) => {
   
    dispatch(sortDoctors(e.target.value, sorted))
    setSortedField(!sortedField);
  }

  return (
    <Row className={style.main_page}>
      <Col  className={style.colCentre}>
        <div className={style.input_sort}>
          
          <span className={style.span}><input onChange={(e) => handleSort(e, sortedField)} type='radio' name='sort' value='spec' ></input> По специализации </span>
          <span className={style.span}><input onChange={(e) => handleSort(e, sortedField)} type='radio' name='sort' value='feedBack' ></input> По рейтингу</span>
          <span className={style.span}><input onChange={(e) => handleSort(e, sortedField)} type='radio' name='sort' value='price' ></input> По стоимости приёма</span>
        </div>
        <Row justify="center">
          <Col className={style.card_doc} justify="center">
            {doctors.map(item => item.approved ? <CardsDoctor
              id={item._id}
              key={item._id}
              item={item}
            />
              :
              ''
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}


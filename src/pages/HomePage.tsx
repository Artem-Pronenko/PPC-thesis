import React, {useContext} from 'react'
import TestList from 'components/TestList'
import DropDown from 'components/dropDown/DropDown'
import testSVG from 'assets/icons/default_test_logo.svg'
import userAvatar from 'assets/image/user.png'
import {BoySvg, DropArrowSvg} from 'constant/icons'
import {FirebaseContextProps} from 'types/firebaseTypes'
import {FirebaseContext} from 'index'

const testList = [
  {
    testName: 'Программирование',
    testSubtitle: 'Описание',
    endTime: new Date(1, 1, 1),
    logo: testSVG,
    id: Math.random(),
  },
  {
    testName: 'Программирование',
    testSubtitle: 'Описание',
    endTime: new Date(1, 1, 1),
    logo: testSVG,
    id: Math.random()
  },
]

const dropList = [
  {
    text: 'Мой профиль',
    path: '/profile',
  },
  {
    text: 'Что-то еще',
    path: '/',
  },
]

const HomePage = () => {
  const {firebase, auth, user, db} = useContext<FirebaseContextProps>(FirebaseContext)

  return (
    <div className="home flew-wrapper">
      <div className="left-content">
        <div className="banner">
          <div className="banner__text">
            <h2 className="banner__title">Привет {user?.displayName}</h2>
            <span className="banner-subtitle">Удачного прохождения тестов!)</span>
          </div>
          <div className="banner__image">
            <BoySvg/>
          </div>
        </div>
        <div>
          <h3>Активные тесты</h3>
          <TestList testList={testList}/>
        </div>
      </div>
      <div className="right-content">
        <nav>
          <ul className="right-content__navigation">
            <li>
              <form role="search" className="search-form">
                <input className="search-input" type="search" placeholder="Название теста..." required/>
                <button className="search-form-button" type="submit">Go!</button>
              </form>
            </li>
            <li className="user-button">
              <DropDown dropList={dropList}>
                <div className="user-button__avatar">
                  <img src={user?.photoURL ?? userAvatar} alt="user avatar"/>
                </div>
                <DropArrowSvg className="user-button__icon"/>
              </DropDown>
            </li>
          </ul>
        </nav>
        <div className="banners">
          <div className="banner test-info">
            <span className="test-info__number">11</span>
            <h4 className="test-info__title">Тестов пройдено</h4>
          </div>
          <div className="banner test-info">
            <span className="test-info__number">2</span>
            <h4 className="test-info__title">Тестов осталось</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

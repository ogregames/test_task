import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
  render() {
    return (
      <div className='container'>
          <div className='err-mes'>
            "Ищет пользователь, ищет милиция, но... нигде не найти мне эту страницу..."
          </div>
          <div className="err-server">- Одинокий сервер -</div>
          <div className='col-md-12'>
            Вернуться на <Link to='/'>главную</Link>?
          </div>
      </div>
    )
  }
}

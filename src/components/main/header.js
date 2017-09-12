import React from 'react'

const Header = ({ username }) => {
  console.log('THIS IS HEADERS PROPS: ', username)

  return (
    <div>
      <h1>Hi my name is {username}</h1>
    </div>
  )
}

export default Header

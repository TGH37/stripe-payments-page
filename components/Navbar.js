import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-left justify-content-center text-center">
        <div className="navbar-brand">Logo</div>
      </div>
      <div className="container-md justify-content-center text-center">
        <ul className="navbar-nav text-capitalize">
          <li className="nav-item"><a className="nav-link active" href="#">product</a></li> 
          <li className="nav-item"><a className="nav-link" href="#">subscription</a></li>
          <li className="nav-item"><a className="nav-link" href="#">course</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

import React, { useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

function Navbar() {
  const router = useRouter()
  
  const parsePathname = pathnameString => {
    if(pathnameString === '/') return pathnameString
    const splitString = pathnameString.split('/');
    return splitString.filter(element => element !== '');
  }

  const findActiveTab = defaultPathnameRoot => {
    const pathnameRoot = parsePathname(router.pathname)[0]
    return pathnameRoot === '/' ? defaultPathnameRoot : pathnameRoot
  }
  const [activeTab, setActiveTab] = useState(findActiveTab('product'));

  let hasActiveTabBeenSet = false;
  const clickHandler = ({ target }) => setActiveTab(target.name)

  const checkActive = tabName => {
    if(!hasActiveTabBeenSet && tabName === activeTab) {
      hasActiveTabBeenSet = true
      return 'active'
    }
    return
  }
  
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-left justify-content-center text-center">
        <div className="navbar-brand">Logo</div>
      </div>
      <div className="container-md justify-content-center text-center">
        <ul className="navbar-nav text-capitalize">
          <li className="nav-item" ><Link href="/"            ><a className={`nav-link ${checkActive('product')}`}       name="product"      onClick={e => clickHandler(e)}>product</a></Link></li> 
          <li className="nav-item" ><Link href="/subscription" ><a className={`nav-link ${checkActive('subscription')}`}  name="subscription" onClick={e => clickHandler(e)}>subscription</a></Link></li>
          <li className="nav-item" ><Link href="/course"       ><a className={`nav-link ${checkActive('course')}`}        name="course"       onClick={e => clickHandler(e)}>course</a></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

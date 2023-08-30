import React,{} from 'react'
function Header() {
  return (
    <>
  {/* ***** Header Area Start ***** */}
  <header className="header-area header-sticky">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            {/* ***** Logo Start ***** */}
            <a href="index.html" className="logo">
              <img src=".././assets/images/logo.png" alt="" />
            </a>
            {/* ***** Logo End ***** */}
            {/* ***** Search End ***** */}
            <div className="search-input">
              <form id="search" action="#">
                <input
                  type="text"
                  placeholder="Type Something"
                  id="searchText"
                  name="searchKeyword"
                  onKeyPress="handle"
                />
                <i className="fa fa-search" />
              </form>
            </div>
            {/* ***** Search End ***** */}
            {/* ***** Menu Start ***** */}
            <ul className="nav">
              <li>
                <a href="index.html" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="browse.html">Browse</a>
              </li>
              <li>
                <a href="details.html">Details</a>
              </li>
              <li>
                <a href="streams.html">Streams</a>
              </li>
              <li>
                <a href="profile.html">
                  Profile <img src="../assets/images/profile-header.jpg" alt="" />
                </a>
              </li>
            </ul>
            <a className="menu-trigger">
              <span>Menu</span>
            </a>
            {/* ***** Menu End ***** */}
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* ***** Header Area End ***** */}
</>

  );
}

export default Header;

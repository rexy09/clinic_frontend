import {  NavLink } from "react-router-dom";

function Layout({ children }) {
    const activeNavLink = ({ isActive }) => {
      return isActive ? "nav-link active" : "nav-link text-white";
    }; 
  return (
    <div className="">
      <div className="row w-100">
        <div className="" style={{ width: "280px", float: "left" }}>
          <div
            className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
            style={{ width: "280px", minHeight: "100vh" }}
          >
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-4">Clinic</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink className={activeNavLink} to="/">
                  Register
                </NavLink>
                {/* <a href="#" className="nav-link active" aria-current="page"></a> */}
              </li>
              <li>
                <NavLink className={activeNavLink} to="/visits">
                  Visits
                </NavLink>
              </li>
              <li>
                <NavLink className={activeNavLink} to="/patients">
                  Patients
                </NavLink>
              </li>
            </ul>
            {/* <hr /> */}
            {/* <div className="dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <strong>mdo</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="col">
          <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 ">
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
              >
                <span className="fs-4"></span>
              </a>

              <ul className="nav nav-pills">
                {/* <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Features
                  </a>
                </li> */}
              </ul>
            </header>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

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

import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [patients, setPatients] = useState([]);
  const notifyError = (text) => toast.error(text);
  const notifySuccess = (text) => toast.success(text);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setDOB("");
    setGender("");
  };
  const fetchPatients = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/list/patients",
    })
      .then(function (response) {
        setPatients(response.data.results);
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
  };

  useEffect(() => {
    fetchPatients();
  },[]);

  const handleChange = (selectedOption) => {
    setGender(selectedOption.value);
  };

  const handleSubmit = (event) => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/add/patient",
      data: {
        first_name: firstName,
        last_name: lastName,
        dob: dob,
        gender: gender,
      },
    })
      .then(function (response) {
        notifySuccess(response.data.message);
         clearForm();
         fetchPatients();
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
    event.preventDefault();
   
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <hr />
      <ToastContainer />
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                First name <span className="text-danger">*</span>
              </label>
              <input
                onChange={(ev) => {
                  setFirstName(ev.target.value);
                }}
                value={firstName}
                type="text"
                className="form-control"
                placeholder="first name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Last name <span className="text-danger">*</span>
              </label>
              <input
                onChange={(ev) => {
                  setLastName(ev.target.value);
                }}
                value={lastName}
                type="text"
                className="form-control"
                placeholder="last name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                DOB <span className="text-danger">*</span>
              </label>
              <input
                onChange={(ev) => {
                  setDOB(ev.target.value);
                }}
                value={dob}
                type="date"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Gender <span className="text-danger">*</span>
              </label>
              <Select options={options} onChange={handleChange} required />
            </div>

            <div className="d-flex flex-row justify-content-between mt-4">
              <div className="">
                <button
                  onClick={clearForm}
                  type="button"
                  className="btn btn-secondary"
                >
                  Clear
                </button>
              </div>
              <div className="">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {patients ? (
                <>
                  {patients.map((patient, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {patient.first_name} {patient.last_name}
                      </td>
                      <td>{patient.gender}</td>
                      <td>
                        {moment(patient.created_at).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div>loading...</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Register;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Patients() {
  const notifyError = (text) => toast.error(text);
  const [date, setDate] = useState("");


  const [visits, setVisits] = useState([]);
  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = () => {
    console.log(date);
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/list/visits?date=${date}`,
    })
      .then(function (response) {
        setVisits(response.data.results);
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
  };
  const fetchVisitsFilter = (date) => {
    console.log(date);
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/list/visits?date=${date}`,
    })
      .then(function (response) {
        setVisits(response.data.results);
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
  };

  const ageCalculator = (value) => {
    var today = new Date();
    var birthData = new Date(value);
    var age = today.getFullYear() - birthData.getFullYear();
    return age;
   
  };
  const bmiStatus = (value) => {
    if (value < 18.5) {
      return "Underweight";
    } else if (18.5 <= value && value < 25) {
      return "Normal";
    } else if ((value) => 25) {
      return "Overweight";
    }
  };

  return (
    <div className="container">
      <h1>Patients</h1>
      <hr />
      <ToastContainer />
      <div className="row justify-content-end">
        <div className="col-2">
          <div className="mb-3">
            <input
              onChange={(ev) => {
                setDate(ev.target.value);
                fetchVisitsFilter(ev.target.value);
              }}
              value={date}
              type="date"
              className="form-control"
              
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Age</th>
                <th scope="col">BMI Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {visits ? (
                <>
                  {visits.map((visit, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {visit.patient.first_name} {visit.patient.last_name}
                      </td>
                      <td>{ageCalculator(visit.patient.dob)}</td>
                      <td>{bmiStatus(visit.bmi)}</td>
                      <td>{visit.date}</td>
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

export default Patients;

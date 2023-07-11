import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Visits() {
  const [date, setDate] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(null);
  const [health, setHealth] = useState(null);
  const [onDiet, setOnDiet] = useState(null);
  const [takingDrugs, setTakingDrugs] = useState(null);
  const [comment, setComment] = useState("");

  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [patient, setPatient] = useState(null);
  const notifyError = (text) => toast.error(text);
  const notifySuccess = (text) => toast.success(text);
  let patientsList = [];

  const clearForm = () => {
    setDate("");
    setHeight(0);
    setWeight(0);
    setBMI(null);
    setHealth(null);
    setOnDiet(null);
    setTakingDrugs(null);
    setComment(null);
    setPatient(null);
  };

  const fetchPatients = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/list/patients",
    })
      .then(function (response) {
        response.data.results.forEach((element) => {
          patientsList.push({
            value: `${element.id}`,
            label: `${element.first_name} ${element.last_name}`,
          });
        });
        setPatients(patientsList);
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
  };
  const fetchVisits = () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/list/visits",
    })
      .then(function (response) {
        setVisits(response.data.results);
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
  };

  useEffect(() => {
    fetchPatients();
    fetchVisits();
  }, []);

  const handleChange = (selectedOption) => {
    setPatient(selectedOption);
  };
  const bmiCalculator = () => {
    try {
      var meter = parseFloat(height) * 0.01;
      var bmiValue = parseFloat(weight + 0.0) / (meter * meter);
      setBMI(bmiValue.toFixed(1));
    } catch (error) {
      setBMI(0);
    }
  };

  const handleSubmit = (event) => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/add/visit",
      data: {
        patient: patient.value,
        date: date,
        height: height,
        weight: weight,
        bmi: bmi,
        health: health,
        on_diet: onDiet,
        taking_drugs: takingDrugs,
        comment: comment,
      },
    })
      .then(function (response) {
        notifySuccess(response.data.message);
        clearForm();
        fetchVisits();
      })
      .catch((err) => {
        notifyError("Error something went wrong!");
      });
    event.preventDefault();
  };
  return (
    <div className="container">
      <h1>Visits</h1>
      <hr />
      <ToastContainer />

      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Patient <span className="text-danger">*</span>
              </label>
              <Select
                value={patient}
                options={patients}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                onChange={(ev) => {
                  setDate(ev.target.value);
                }}
                value={date}
                type="date"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Height (cm)</label>
              <input
                onChange={(ev) => {
                  setHeight(ev.target.value);
                  bmiCalculator();
                }}
                value={height}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Weight (kg)</label>
              <input
                onChange={(ev) => {
                  setWeight(ev.target.value);
                  bmiCalculator();
                }}
                step={"0.01"}
                value={weight}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">BMI</label>
              <input
                value={bmi}
                type="number"
                className="form-control"
                readOnly
                required
              />
            </div>
            {bmi != null ? (
              <>
                {bmi <= 25 ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">General Health?</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="good"
                          checked={health === "good"}
                          onChange={(ev) => {
                            setHealth(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">Good</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="poor"
                          checked={health === "poor"}
                          onChange={(ev) => {
                            setHealth(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">Poor</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Have you ever been on a diet to loose weight?
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="yes"
                          checked={onDiet === "yes"}
                          onChange={(ev) => {
                            setOnDiet(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="no"
                          checked={onDiet === "no"}
                          onChange={(ev) => {
                            setOnDiet(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    <textarea
                      onChange={(ev) => {
                        setComment(ev.target.value);
                      }}
                      value={comment}
                      className="form-control"
                      rows="3"
                      required
                    ></textarea>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label">General Health?</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="good"
                          checked={health === "good"}
                          onChange={(ev) => {
                            setHealth(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">Good</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="poor"
                          checked={health === "poor"}
                          onChange={(ev) => {
                            setHealth(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">Poor</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Are you currently taking any drugs?
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="yes"
                          checked={takingDrugs === "yes"}
                          onChange={(ev) => {
                            setTakingDrugs(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="no"
                          checked={takingDrugs === "no"}
                          onChange={(ev) => {
                            setTakingDrugs(ev.target.value);
                          }}
                          required
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Comments</label>
                      <textarea
                        onChange={(ev) => {
                          setComment(ev.target.value);
                        }}
                        value={comment}
                        className="form-control"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div></div>
            )}

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
                <th scope="col">Age</th>
                <th scope="col">BMI (kg/m2)</th>
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
                      <td>{visit.patient.dob}</td>
                      <td>{visit.bmi}</td>
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

export default Visits;

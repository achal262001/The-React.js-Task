import React, { useState, useEffect } from "react";
import axios from "axios";
import "./API.css";

const API_URL =
  "https://navirego-interview-mc3narrsb-volodymyr-matselyukh.vercel.app/api/letters/";

const APICallsComponent = () => {
  const [responses, setResponses] = useState(new Array(7).fill(""));
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  useEffect(() => {
    function number() {
      for (let i = 0; i < 7; i++) {
        fetchData(i);
      }
    }
    const fetchData = async (number) => {
      try {
        const response = await axios.get(`${API_URL}${number}`);
        setResponses((prevResponses) => {
          const updatedResponses = [...prevResponses];
          //   console.log(response)''
          if (response.data.letter == "") {
            console.log("API is null");
          } else {
            const temp = updatedResponses[number] + response.data.letter;
            updatedResponses[number] = temp.slice(-30);
          }
          return updatedResponses;
        });
      } catch (error) {
        if (error.response && error.response.status === 418) {
          console.log("Error: It's Error (Status Code 418)");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    const interval = setInterval(number, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckboxChange = (index) => {
    setSelectedCheckbox(index);
  };

  return (
    <div className="app-container">
      <h1>Latest 30 Characters:</h1>
      <div>
        <ul>
          {responses.map((responses, index) => (
            <li key={index} className="checkbox-item">
              <label>
                <input
                  type="checkbox"
                  value={index}
                  checked={selectedCheckbox === index}
                  onChange={() => handleCheckboxChange(index)}
                />
                Checkbox {index + 1}
              </label>
            </li>
          ))}
        </ul>
        {selectedCheckbox !== null && (
          <div>
            <h2>Response:</h2>
            <p>{responses[selectedCheckbox]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default APICallsComponent;

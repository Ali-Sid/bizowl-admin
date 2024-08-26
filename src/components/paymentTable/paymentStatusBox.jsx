import React, { useState, useEffect } from "react";
import "./paymentStatusBox.css";
import table_icon1 from "./assets/table_icon1.png";
import dropdown_arrow from "./assets/dropdown_arrow.png";
import { clientDB } from "config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const PaymentStatusBox = () => {
  const [prUsers, setPrUsers] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const prUsersRef = collection(clientDB, "prUsers");
    const unsubscribePrUsers = onSnapshot(prUsersRef, (snapshot) => {
      const prUsersData = snapshot.docs.map((doc) => doc.data());
      setPrUsers(prUsersData);
    });

    const quotationsRef = collection(clientDB, "quotations");
    const unsubscribeQuotations = onSnapshot(quotationsRef, (snapshot) => {
      const quotationsData = snapshot.docs.map((doc) => doc.data());
      console.log("Quotations data:", quotationsData);
      setQuotations(quotationsData);
    });

    return () => {
      unsubscribePrUsers();
      unsubscribeQuotations();
    };
  }, []);

  useEffect(() => {
    const filteredData = [...prUsers, ...quotations];
    setFilteredData(filteredData);
  }, [prUsers, quotations]);

  return (
    <div className="paymentStatusBox">
      <div className="table-top">
        <p className="top-heading">Payment Status</p>
        <div className="filters">
          <div className="filter-1">
            <p>10</p>
            <img src={dropdown_arrow} />
          </div>
          <div className="filter-2">
            <div className="filter2-1">
              <img className="table_icon1" src={table_icon1} />
              <p>Past 15 days</p>
              <img className="dropdown_arrow" src={dropdown_arrow} />
            </div>
            <div className="filter-date">
              <p>17 Jan 2023</p>
              <p>to</p>
              <p>08 Feb 2024</p>
            </div>
          </div>
        </div>
      </div>
      <div className="table-content">
        <table>
          <tr>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Date & Time</p>
            </th>
            <th>
              <p>Mobile No</p>
            </th>
            <th>
              <p>Service</p>
            </th>
            <th>
              <p>Final $</p>
            </th>
            <th>
              <p>Status</p>
            </th>
          </tr>
          {filteredData.map((data) => (
            <tr key={data.id}>
              <td className="Cell">
                <div className="cell-icon"></div>
                <p>{data.fullName || data.firstName + " " + data.lastName}</p>
              </td>
              <td>
                <p>{data.date || "N/A"}</p>
              </td>
              <td>
                <p>{data.phone}</p>
              </td>
              <td>
                <p>
                  {(data.pressReleaseReady && "Press Release") ||
                    (data.services ? data.services : "")}
                </p>
              </td>
              <td>
                <p>{data.budget ? "₹" + data.budget : ""}</p>
              </td>
              <td>
                <p
                  className={data.status === "Success" ? "Success" : "Failure"}
                >
                  {data.status || "Pending"}
                </p>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="table-end">
        <div className="tableBtn">
          <p>Back</p>
        </div>
        <p>Page 1 of 6</p>
        <div className="tableBtn">
          <p>Next</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusBox;

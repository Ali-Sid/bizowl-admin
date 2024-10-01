import React, { useState, useEffect } from "react";
import "./paymentStatusBox.css";
import table_icon1 from "./assets/table_icon1.png";
import dropdown_arrow from "./assets/dropdown_arrow.png";
import { collection, onSnapshot } from "firebase/firestore";
import { Flex } from "@chakra-ui/react";
import { primaryDB } from "config/firebase";
import IdeaValidationPaymentStatus from "./ideaValidationPaymentStatus";

const PaymentStatusBox = () => {
  const [paymentUsers, setPaymentUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const paymentUsersRef = collection(primaryDB, "paymentData");
    const unsubscribePaymentUsers = onSnapshot(paymentUsersRef, (snapshot) => {
      const paymentUsersData = snapshot.docs.map((doc) => doc.data());
      setPaymentUsers(paymentUsersData);
    });

    return () => {
      unsubscribePaymentUsers();
    };
  }, []);

  useEffect(() => {
    setFilteredData(paymentUsers);
  }, [paymentUsers]);

  return (
    <>
      <Flex
        mt="2rem"
        backgroundColor="#FFFFFF"
        minHeight="15rem"
        borderRadius="2rem"
        boxShadow="0px 4px 38px 0px #407BFF26"
      >
        <div className="paymentStatusBox">
          <div className="table-top">
            <p className="top-heading">Payment Status</p>
            <div className="filters">
              <div className="filter-1">
                <p>10</p>
                <img src={dropdown_arrow} alt="Dropdown" />
              </div>
              <div className="filter-2">
                <div className="filter2-1">
                  <img
                    className="table_icon1"
                    src={table_icon1}
                    alt="Table Icon"
                  />
                  <p>Past 15 days</p>
                  <img
                    className="dropdown_arrow"
                    src={dropdown_arrow}
                    alt="Dropdown"
                  />
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
              <thead>
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
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                ) : (
                  filteredData.map((data) => (
                    <tr key={data.orderId}>
                      <td className="Cell">
                        <div className="cell-icon"></div>
                        <p>{data.bookingDetails?.fullName || "N/A"}</p>
                      </td>
                      <td>
                        <p>
                          {data.timestamp
                            ? new Date(
                                data.timestamp.seconds * 1000
                              ).toLocaleString()
                            : "N/A"}
                        </p>
                      </td>
                      <td>
                        <p>{data.bookingDetails?.contact || "N/A"}</p>
                      </td>
                      <td>
                        <p>{data.service || "N/A"}</p>
                      </td>
                      <td>
                        <p>{data.amount ? "₹" + data.amount : "N/A"}</p>
                      </td>
                      <td>
                        <p
                          className={
                            data.paymentStatus === "success"
                              ? "Success"
                              : "Failure"
                          }
                        >
                          {data.paymentStatus || "Pending"}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
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
      </Flex>
      <IdeaValidationPaymentStatus />
    </>
  );
};

export default PaymentStatusBox;

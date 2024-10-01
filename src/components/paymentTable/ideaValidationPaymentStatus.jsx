import React, { useState, useEffect } from "react";
import "./paymentStatusBox.css";
import table_icon1 from "./assets/table_icon1.png";
import dropdown_arrow from "./assets/dropdown_arrow.png";
import { collection, onSnapshot } from "firebase/firestore";
import { Flex } from "@chakra-ui/react";
import { primaryDB } from "config/firebase";
import IdeaValidationDetailsModal from "./utils/ideaValidationDetailsModal";

const IdeaValidationPaymentStatus = () => {
  const [paymentUsers, setPaymentUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); // State to hold selected user details

  useEffect(() => {
    const paymentUsersRef = collection(primaryDB, "idea-validation-payments");
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

  const handleOpenModal = (userDetails) => {
    console.log(userDetails); // Log the user details being passed
    setSelectedUserDetails(userDetails); // Set the selected user details
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUserDetails(null); // Clear the selected user details
  };

  return (
    <Flex
      mt="2rem"
      backgroundColor="#FFFFFF"
      minHeight="15rem"
      borderRadius="2rem"
      boxShadow="0px 4px 38px 0px #407BFF26"
    >
      <div className="paymentStatusBox">
        <div className="table-top">
          <p className="top-heading">Idea Validation Payment Status</p>
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
                  <p>Payment ID</p>
                </th>
                <th>
                  <p>Status</p>
                </th>
                <th>
                  <p>Action</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              ) : (
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <td className="Cell">
                      <div className="cell-icon"></div>
                      <p>{data.contactDetails?.fullName || "N/A"}</p>
                    </td>
                    <td>
                      <p>
                        {data.createdAt
                          ? new Date(
                              data.createdAt.seconds * 1000
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                    </td>
                    <td>
                      <p>{data.contactDetails?.phone || "N/A"}</p>
                    </td>
                    <td>
                      <p>{data.paymentId || "N/A"}</p>
                    </td>
                    <td>
                      <p
                        className={
                          data.status === "success"
                            ? "Success"
                            : "Failure"
                        }
                      >
                        {data.status || "Pending"}
                      </p>
                    </td>
                    <td>
                      <button onClick={() => handleOpenModal(data)}>
                        View Details
                      </button>
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
      <IdeaValidationDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        details={selectedUserDetails ? {
          email: selectedUserDetails.contactDetails.email,
          competitors: selectedUserDetails.ideaDetails.competitors,
          ideaAbout: selectedUserDetails.ideaDetails.ideaAbout,
          marketResearch: selectedUserDetails.ideaDetails.marketResearch,
          problemSolved: selectedUserDetails.ideaDetails.problemSolved,
          targetAudience: selectedUserDetails.ideaDetails.targetAudience,
          timeline: selectedUserDetails.ideaDetails.timeline,
        } : {}}
      />
    </Flex>
  );
};

export default IdeaValidationPaymentStatus;

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

const IdeaValidationDetailsModal = ({ isOpen, onClose, details }) => {
  if (!details) {
    return null; // Return null if no details are provided
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Idea Validation Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Email</Text>
                <Text style={{ fontWeight: "bold" }}>Industry</Text>
                <Text style={{ fontWeight: "bold" }}>Service Type</Text>
                <Text style={{ fontWeight: "bold" }}>Service Category</Text>
                <Text style={{ fontWeight: "bold" }}>Timeline</Text>
                <Text style={{ fontWeight: "bold" }}>Budget</Text>
                <Text style={{ fontWeight: "bold" }}>Project Requirements</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%",
                }}
              >
                <Text>{details?.email}</Text>
                <Text>{details?.competitors}</Text>
                <Text>{details?.ideaAbout}</Text>
                <Text>{details?.marketResearch}</Text>
                <Text>{details?.problemSolved}</Text>
                <Text>{details?.targetAudience}</Text>
                <Text>{details?.timeline}</Text>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IdeaValidationDetailsModal;
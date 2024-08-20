import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { partnerDB } from "config/firebase"; // Adjust the path as necessary

const PartnerAssignmentModal = ({ isOpen, onClose, partners, rowData }) => {
  const [selectedPartners, setSelectedPartners] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedPartners((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleAssign = async () => {
    const batch = [];
    selectedPartners.forEach((partnerId) => {
      const partner = partners.find((p) => p.uid === partnerId);
      if (partner) {
        const data = {
          rowData: rowData,
          partner: partner,
        };
        batch.push(addDoc(collection(partnerDB, "assignments"), data));
      }
    });

    try {
      await Promise.all(batch);
      console.log("Assignments added to Firebase successfully");
    } catch (error) {
      console.error("Error adding assignments to Firebase:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="fullWidth">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Partners</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple" colorScheme="teal" size="md" w="full">
            <Thead>
              <Tr>
                <Th>Select</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Industry</Th>
                <Th>Service</Th>
              </Tr>
            </Thead>
            <Tbody>
              {partners.map((partner, index) => (
                <Tr key={partner.uid}>
                  <Td>
                    <Checkbox
                      isChecked={selectedPartners.includes(partner.uid)}
                      onChange={() => handleCheckboxChange(partner.uid)}
                    />
                  </Td>
                  <Td>{partner.firstName}</Td>
                  <Td>{partner.lastName}</Td>
                  <Td>{partner.industry}</Td>
                  <Td>{partner.service}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAssign}>
            Assign
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PartnerAssignmentModal;

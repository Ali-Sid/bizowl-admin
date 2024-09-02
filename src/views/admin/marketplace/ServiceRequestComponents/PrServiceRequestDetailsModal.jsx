// ServiceRequestDetailsModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useToast,
  ModalFooter,
  ModalBodyProps,
  VStack,
  HStack,
  Input,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { partnerDB } from "config/firebase";

const PrServiceRequestDetailsModal = ({ isOpen, onClose, details }) => {
  const toast = useToast();
  const [notified, setNotified] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState([]);

  const handlePartnerSelection = (isChecked, partnerId) => {
    if (isChecked) {
      setSelectedPartners([...selectedPartners, partnerId]);
    } else {
      setSelectedPartners(selectedPartners.filter((id) => id !== partnerId));
    }
  };

  if (!details) {
    return null;
  }

  const handleNotifyPartner = async () => {
    try {
      const serviceRequestRef = doc(
        partnerDB,
        "quotations",
        details?.original?.id
      );
      const partnerCollection = collection(partnerDB, "partners");
      // const partners = await getDocs(query(partnerCollection, where('industry', '==', details?.original?.projectType?.trim())));
      const partnersQuery = query(
        partnerCollection,
        where("services", "==", details?.original?.services.trim())
      );
      const partnersSnapshot = await getDocs(partnersQuery);
      // const partnerIds = partnersSnapshot.docs.map((doc) => doc.id);
      // await updateDoc(serviceRequestRef, {
      //   status: "Notified",
      //   notifiedPartners: partnerIds,
      // });
      // setNotified(true);
      // onClose();
      // toast({
      //   description: "Partner Notified Successfully",
      //   status: "success",
      //   position: "top",
      //   duration: 1000,
      //   isClosable: true,
      // });

      // fetchAndDisplayPartners()
      const partnerList = partnersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartnerList(partnerList);

      setNotified(true);
      onClose();
      toast({
        description: "Partner Notified Successfully",
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating document: ", error.message);
    }
  };

  const fetchAndDisplayPartners = async () => {
    if (notified) {
      const partnerCollection = collection(partnerDB, "partners");
      const partnersQuery = query(
        partnerCollection,
        where("services", "==", details?.original?.services.trim())
      );
      const partnersSnapshot = await getDocs(partnersQuery);
      const partners = partnersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartnerList(partners);
    }
  };

  const handleAssignPartners = async () => {
    try {
      const serviceRequestRef = doc(
        partnerDB,
        "quotations",
        details?.original?.id
      );

      await updateDoc(serviceRequestRef, {
        assignedPartners: selectedPartners,
      });

      toast({
        description: "Partners Assigned Successfully",
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error assigning partners: ", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>PR Service Request Details</ModalHeader>
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
                <Text style={{ fontWeight: "bold" }}>Business Name</Text>
                <Text style={{ fontWeight: "bold" }}>Email</Text>
                <Text style={{ fontWeight: "bold" }}>Language</Text>
                <Text style={{ fontWeight: "bold" }}>Network</Text>
                <Text style={{ fontWeight: "bold" }}>Press Release Purpose</Text>
                <Text style={{ fontWeight: "bold" }}>Press Release Ready</Text>
                <Text style={{ fontWeight: "bold" }}>Target Audience</Text>
                <Text style={{ fontWeight: "bold" }}>Website</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%",
                }}
              >
                <Text>{details?.original.business}</Text>
                <Text>{details?.original.email}</Text>
                <Text>{details?.original.language}</Text>
                <Text>{details?.original.network}</Text>
                <Text>{details?.original.pressReleasePurpose}</Text>
                <Text>{details?.original.pressReleaseReady}</Text>
                <Text>{details?.original.targetAudience}</Text>
                <Text>{details?.original.website}</Text>
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <Button
                colorScheme="blue"
                mt={4}
                onClick={handleNotifyPartner}
                disabled={details?.original?.status == "Notified"}
              >
                {details?.original?.status == "Notified"
                  ? "Notified"
                  : "Notify Partner"}
              </Button>
              <Button colorScheme="green" mt={4} ml={4}>
                Update Client
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mt={4}
            onClick={handleNotifyPartner}
            disabled={details?.original?.status === "Notified"}
          >
            {details?.original?.status === "Notified"
              ? "Notified"
              : "Notify Partner"}
          </Button>
          {notified && (
            <VStack spacing={2}>
              {partnerList.length > 0 ? (
                partnerList.map((partner) => (
                  <HStack key={partner.id}>
                    <Input
                      type="checkbox"
                      value={partner.id}
                      onChange={(e) =>
                        handlePartnerSelection(e.target.checked, partner.id)
                      }
                    />{" "}
                    {/* Add Checkbox */}
                    <Text>{partner.name}</Text>
                    {/* Display other partner details */}
                  </HStack>
                ))
              ) : (
                <Text>No partners found for this service.</Text>
              )}
              <Button
                colorScheme="green"
                mt={4}
                ml={4}
                onClick={handleAssignPartners}
                disabled={!selectedPartners.length}
              >
                Assign
              </Button>
            </VStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrServiceRequestDetailsModal;

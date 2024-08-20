// DetailsModal.js
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { collection, getDocs } from "firebase/firestore";
  import { partnerDB } from "config/firebase";
  import PartnerAssignmentModal from "./PartnerAssignmentModal";
  
  const DetailsModal = ({ isOpen, onClose, rowData }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [partners, setPartners] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState([rowData]);
  
    useEffect(() => {
      const fetchPartners = async () => {
        const partnersCollectionRef = collection(partnerDB, 'partners');
        const snapshot = await getDocs(partnersCollectionRef);
        const fetchedPartners = snapshot.docs.map(doc => ({
        ...doc.data(),
          id: doc.id,
        }));
        setPartners(fetchedPartners);
      };
  
      fetchPartners();
    }, []);
  
    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display detailed information about the row */}
            <Text>
              <b>Budget:</b> {rowData.budget}
            </Text>
            <Text>
              <b>Geo Target:</b> {rowData.geoTarget}
            </Text>
            <Text>
              <b>Industry:</b> {rowData.industry}
            </Text>
            <Text>
              <b>Language:</b> {rowData.language}
            </Text>
            <Text>
              <b>Phone:</b> {rowData.phone}
            </Text>
            <Text>
              <b>Press Re;ease:</b> {rowData.pressReleasePurpose}
            </Text>
            <Text>
              <b>Requirements:</b> {rowData.requirements}
            </Text>
            <Text>
              <b>Start Date:</b> {rowData.startDate}
            </Text>
            <Text>
              <b>Timeline:</b> {rowData.timeLine}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={toggleDrawer}>
              Assign Partners
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
          <PartnerAssignmentModal isOpen={drawerOpen} onClose={toggleDrawer} partners={partners} rowData={rowData} selectedCustomer={selectedCustomer} />
        </ModalContent>
      </Modal>
    );
  };
  
  export default DetailsModal;
  
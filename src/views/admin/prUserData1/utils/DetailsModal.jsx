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
                <Text style={{ fontWeight: "bold" }}>Budget</Text>
                <Text style={{ fontWeight: "bold" }}>Geo Target</Text>
                <Text style={{ fontWeight: "bold" }}>Industry</Text>
                <Text style={{ fontWeight: "bold" }}>Language</Text>
                <Text style={{ fontWeight: "bold" }}>Phone</Text>
                <Text style={{ fontWeight: "bold" }}>Press Release</Text>
                <Text style={{ fontWeight: "bold" }}>Requirements</Text>
                <Text style={{ fontWeight: "bold" }}>Start Date</Text>
                <Text style={{ fontWeight: "bold" }}>Timeline</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%",
                }}
              >
                <Text>{rowData.budget}</Text>
                <Text>{rowData.geoTarget}</Text>
                <Text>{rowData.industry}</Text>
                <Text>{rowData.language}</Text>
                <Text>{rowData.phone}</Text>
                <Text>{rowData.pressReleasePurpose}</Text>
                <Text>{rowData.requirements}</Text>
                <Text>{rowData.startDate}</Text>
                <Text>{rowData.timeLine}</Text>
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <Button
                colorScheme="blue"
                mt={4}
                // onClick={handleNotifyPartner}
                // disabled={details?.original?.status == "Notified"}
              >
                {/* {details?.original?.status == "Notified"
                  ? "Notified"
                  : "Notify Partner"} */}
                  Notify Partner
              </Button>
              <Button colorScheme="green" mt={4} ml={4}>
                Update Client
              </Button>
            </div>
          </div>
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
  
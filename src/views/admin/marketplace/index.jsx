import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import AdminServiceRequestTable from "./ServiceRequestComponents/AdminServiceRequestTable";
import QuotationUpdateModal from "./ServiceRequestComponents/QuotationUpdateModal";
import ServiceRequests from "./ServiceRequestComponents/AdminServiceRequestTable";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "config/firebase";

// Assets
import webdev from "assets/img/nfts/webdev.jpg";
import digital from "assets/img/nfts/digital.jpg";
import graphic from "assets/img/nfts/graphic.jpg";
import market from "assets/img/nfts/market.jpg";
import ad from "assets/img/nfts/ad.jpg";
import biz from "assets/img/nfts/biz.jpg";
// import Nft1 from "assets/img/nfts/Nft1.png";
// import Nft2 from "assets/img/nfts/Nft2.png";
// import Nft3 from "assets/img/nfts/Nft3.png";
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Nft5 from "assets/img/nfts/Nft5.png";
// import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import Test from "../prUserData1";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  return (
    <Box>
      {/* Main Fields */}
      <ServiceRequests />
    </Box>
  );
}

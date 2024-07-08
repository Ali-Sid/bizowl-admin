import Card from 'components/card/Card';
import { HSeparator } from 'components/separator/Separator';
import React from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';


const CustomCard = ({card}) => {
    return (
        // eslint-disable-next-line no-dupe-keys
        <Card width="18%" bgColor={card?.bgColor} style={{boxShadow:"#E5A8CC", marginBottom:"2rem"}} boxShadow={card?.shadow}>
           <Box style={{height:"30px",width:"30px", borderRadius:"50%"}} backgroundColor={card?.iconBackgroundColor}>

            <Flex alignItems="center" justifyContent="center" marginTop="0.3rem" color="#fff" fontWeight="bold" fontSize="1.25rem">{card?.icon}</Flex>
           </Box>
            <Text color="#263238" fontWeight="bold" fontSize="1.25rem" lineHeight={2}>{card?.amount}</Text>
            <Text color="#263238" fontWeight="500" fontSize="15px">{card?.title}</Text>
            <Text color={card?.messageColor} fontSize="10px">{card?.message}</Text>
        </Card>
    )
}
export default CustomCard;
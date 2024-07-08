// QuotationUpdateModal.js
import React, { useState } from 'react';

const QuotationUpdateModal = ({ onClose, onSubmit }) => {
  const [updatedPrice, setUpdatedPrice] = useState('');

  const handleSubmit = () => {
    // Validate and submit the updated price
    onSubmit(updatedPrice);
    // Close the modal
    onClose();
  };

  return (
    <div>
      <h2>Update Quotation</h2>
      <label>
        Updated Price:
        <input
          type="text"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuotationUpdateModal;

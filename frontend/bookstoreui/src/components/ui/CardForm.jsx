import { useEffect, useState } from "react";

function CardForm({ details, updateCardDetails }) {

  const [ cardDetails, setCardDetails ] = useState({ ...details });

  // Handle validity and style of card number.
  function handleCardNoValue(value) {
    let valueLength = value.length - 1;

    if (value[valueLength] === " ") {
      value = value.substring(0, valueLength);
    };

    valueLength = value.length - 1;
    if (valueLength === 4 || valueLength === 9 || valueLength === 14) {
      const temp = value[valueLength];
      value = value.substring(0, valueLength) + " " + temp;
    };

    return value;
  }

  // Handle validity and style of card expiry.
  function handleExpiryValue(value) {
    let valueLength = value.length - 1;

    if (value[valueLength] === "/") {
      value = value.substring(0, valueLength);
    }

    valueLength = value.length - 1;
    if ((valueLength) === 2) {
      const temp = value[valueLength];
      value = value.substring(0, 2) + "/" + temp;
    };

    return value;
  }

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    let valueLength = value.length - 1;

    // Emptying the field.
    if (valueLength < 0) {
      setCardDetails({ ...cardDetails, [name]: value });
      return;
    };

    if (name === 'expiry') {

      // Expiry can only have 6 characters ( +1 for '/' ).
      if (valueLength > 6) return;

      // Handle style and validity of expiry value.
      value = handleExpiryValue(value);
    } else if (name === 'cvv') {

      // CVV has only 3 characters.
      if (valueLength > 2) {
        return;
      }
    } else if (name === 'cardno') {

      // Card no has only 16 characters ( +3 spaces)
      if (valueLength > 18) return;

      // Handle style and validity of card no value.
      value = handleCardNoValue(value);
    }

    // Recheck length of value.
    valueLength = value.length - 1;

    // Do not allow characters input.
    if ((value[valueLength] !== " " || value[valueLength] !== "/") && isNaN(value[valueLength])) return;

    setCardDetails({ ...cardDetails, [name]: value });
  };

  useEffect(() => {
    updateCardDetails(cardDetails);
  }, [cardDetails]);

  return (
    <div className="bg-green-400/50 border-2 border-black rounded-md p-2 mb-2">
      <p className="mb-2 underline">Card Information</p>
      <div className="w-full gap-2 flex border-2 border-black rounded-md p-2 mb-2">
        <label className="flex-1 text-left border-r-2 border-black pr-4 md:pr-0" htmlFor="cardno">Card No.</label>
        <input className="flex-1/2 focus:outline-none" id="cardno" placeholder="0000 0000 0000 0000" type="text" autoComplete="off" name="cardno" onChange={handleCardChange} value={cardDetails.cardno} />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-2">
        <div className="lg:w-1/3 flex gap-2 justify-between items-center border-2 border-black rounded-md px-2">
          <label className="text-left flex-1 border-r-2 border-black lg:pr-4" htmlFor="cvv">CVV</label>
          <input className="w-full flex-1/2 focus:outline-none p-2" placeholder="000" id="cvv" type="text" name="cvv" autoComplete="off" onChange={handleCardChange} value={cardDetails.cvv} />
        </div>
        <div className="flex-1/4 flex items-center gap-2 border-2 border-black rounded-md px-2">
          <label className="flex-1 text-left border-r-2 border-black pr-2" htmlFor="expiry">Expiry</label>
          <input className="flex-1/2 focus:outline-none p-2" id="expiry" type="text" placeholder="MM/YYYY" name="expiry" autoComplete="off" onChange={handleCardChange} value={cardDetails.expiry} />
        </div>
      </div>
    </div>
  );
};

export default CardForm;
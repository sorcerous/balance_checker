import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const baseURL =
  "https://api.covalenthq.com/v1/1/address/TOKEN/balances_v2/?key=ckey_73930347c3fe427e83a938e7e3c";

const BalanceForm = () => {
  const [checkBalance, setBalance] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [listItem, setListItem] = useState<any>([]);
  const [responseObj, setResponseObj] = useState<any>([]);
  const [isLoading, setLoading] = useState(true)

  // Display all data on button click
  const handleSubmit = () => {
    setBalance(true);
    var re = /TOKEN/gi; 
    var formattedURL = baseURL.replace(re, inputToken); 
    getBalance(formattedURL);
  };

  // Clear all input fields and data
  const handleClear = () => {
    setBalance(false);
    setInputToken("");
  };

  // use the onChangeSubmit : if input field is blank, so button will desable or after removing the input text button will also disable.
  const onChangeSubmit = (event: any) => {
    setInputToken(event.currentTarget.value);
    console.log(inputToken);
  };

  useEffect(() => {
    if(responseObj === null){
      console.log(responseObj);
      setListItem(null);
    }else{
      setListItem(responseObj.data);
    }
}, [responseObj]);

  // use the axios for fetch all data.
  const getBalance = (formattedURL:string) => {
    axios
      .get(formattedURL)
      .then((response) => {
        if (response.status === 200 && response.data.error === false) {
          console.log(response);
          setResponseObj(response);
        }else{
          setResponseObj(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setResponseObj(null);
      });
  };

  return (
    <div>
      <div className="heading">
        <h1>Wallet Checker</h1>
      </div>
      <div className="formField">
        <label>
          Wallet Address :
          <input
            type="text"
            name="address"
            required={true}
            value={inputToken}
            onChange={(event) => onChangeSubmit(event)}
          />
        </label>
      </div>
      <div className="submitButton">
        <button onClick={handleSubmit}>
          Check Balances
        </button>
        <button
          className="clearButton"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div className="submitButton">
        {/* Display all data when click the checkBalance button */}
        {checkBalance && listItem ? (
          <>
            <div>
              <h4>Address : {listItem.data.address}</h4>
              <h4>Updated at : {listItem.data.updated_at}</h4>
              <h4>Next update at : {listItem.data.updated_at}</h4>
              <h4>Currency : {listItem.data.quote_currency}</h4>
            </div>
            <div className="drawLine" />
            <div className="rowData">
              {/* Display all Lists item   */}
              {listItem.data.items.map((item: any) => {
                return (
                  <>
                    <p>
                      <b>Token Name :</b> {item.contract_name}
                    </p>
                    <p>
                      <b>Address:</b> {item.contract_address}
                    </p>
                    <p>
                      <b>Balnce</b> {item.balance}
                    </p>
                    <p>
                      <b>Rate</b> {item.quote_rate}
                    </p>
                    <div className="drawLine" />
                  </>
                );
              })}
            </div>  
          </>
        ) : (
          <div className="noData">
            <h4>Please enter correct address and click on 'Check Balance'.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export { BalanceForm };

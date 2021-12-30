import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const baseURL =
  "https://api.covalenthq.com/v1/1/address/demo.eth/balances_v2/?key=ckey_docs";

const BalanceForm = () => {
  const [checkBalance, setBalance] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [listItem, setListItem] = useState<any>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  // Display all data on button click
  const handleSubmit = () => {
    setBalance(true);
  };

  // Clear all input fields and data
  const handleClear = () => {
    setBalance(false);
    setInputToken("");
  };

  // use the onChangeSubmit : if input field is blank, so button will desable or after removing the input text button will also disable.
  const onChangeSubmit = (event: any) => {
    setInputToken(event.target.value);
    inputToken.length > 1 ? setIsEnabled(false) : setIsEnabled(true);
  };

  // first time get the data from getBalance function.
  useEffect(() => {
    getBalance();
  }, []);

  // use the axios for fetch all data.
  const getBalance = () => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        if (response.status === 200) {
          setListItem(response?.data);
        }
      })
      .catch((error) => {
        console.log(error);
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
        <button disabled={isEnabled} onClick={handleSubmit}>
          Check Balances
        </button>
        <button
          className="clearButton"
          disabled={isEnabled}
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
              <h4> Address : {listItem.data.address}</h4>
              <h4> Updated at : {listItem.data.updated_at}</h4>
              <h4> Next update at : {listItem.data.updated_at}</h4>
              <h4>Currency : {listItem.data.quote_currency}</h4>
            </div>
            <div className="drawLine" />
            <div className="rowData">
              {/* Display all Lists item   */}
              {listItem.data.items.map((item: any) => {
                return (
                  <>
                    <p>
                      <b> Token Name :</b> {item.contract_name}
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
            <h1>No data found.</h1>
            <h4>please click the check balance button and get all data</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export { BalanceForm };

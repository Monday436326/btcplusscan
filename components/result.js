import moment from "moment";
import PropTypes from 'prop-types'; // Import PropTypes
import React, { useState } from "react";

const SearchResults = ({result}) => {

  const [showTable, setShowTable] = useState(true);
  const [showSecondTable, setShowSecondTable] = useState(false);

  if (!Array.isArray(result?.result)) {
    return (
      <section className="bg-gray-900 p-4 rounded">
        <p className="text-red-500">Invalid data format</p>
      </section>
    );
  }

  const handleShowTable = () => {
    setShowTable(!showTable);
    setShowSecondTable(false); // Close the second table when showing the first one
  };

  const handleShowSecondTable = () => {
    setShowSecondTable(!showSecondTable);
    setShowTable(false); // Close the first table when showing the second one
  };

  return(
    <section>
      {/* Rectangular box above the table */}
      <section className="flex justify-between mx-4">
  <section className="bg-black p-8 w-[35%] rounded-lg mb-4 shadow-md">
    <h3 className="text-white text-lg font-bold mb-4">Overview</h3>
    <section className="text-gray-300">
      <span className="block mb-3">BTC Balance</span>
      <span className="text-blue-300">
      Ξ {(result?.balance / 1e18)} BTC
      </span>
    </section>
    <section className="text-gray-300 mt-3">
      <span className="block mb-3">BTC Value</span>
      <span className="text-blue-300">
      ${((result?.balance / 1e18) * result?.ethValue).toFixed(2)} (@ {result?.ethValue}/ETH)
      </span>
    </section>
  </section>

  <section className="bg-black p-8 w-[30%] rounded-lg mb-4 shadow-md">
    <h3 className="text-white text-lg font-bold mb-4">More info</h3>
    <section className="text-gray-300">
      <span className="block mb-3">LAST TXN SENT</span>
      <span className=" text-blue-300">
      {result?.result[0]?.hash?.slice(0, 16)}... (from {moment.unix(result?.result[0]?.timeStamp).fromNow()})
      </span>
    </section>
  </section>

  <section className="bg-black p-8 w-[30%] rounded-lg mb-4 shadow-md">
    <h3 className="text-white text-lg font-bold mb-4">Multi chain</h3>
    <section className="text-gray-300">
      <span className="block mb-3">Multi Chain address</span>
      <span className="text-blue-300">------------</span>
    </section>
  </section>
</section>
      <button
        className="bg-blue-400 text-black py-1 px-2 rounded-lg mt-4 ml-4"
        onClick={handleShowTable}
      >
        {showTable ? "Transaction " : "Transaction"}
      </button> 

      <button
        className="bg-blue-400 text-black py-1 px-2 rounded-lg mt-4 ml-4"
        onClick={handleShowSecondTable}
      >
        {showSecondTable ? "TokenTransfer" : "Token Transfer"}
      </button>

      {/* Table section */}
      {showTable &&
      <section className="bg-grey-1000 p-4 rounded">
        <p className="text-white">
          Latest 20 transactions 
        </p>

        <table className="w-full mt-4 border border-gray-800 rounded">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="py-2 px-4">Transaction Hash</th>
              <th className="py-2 px-4">Method</th>
              <th className="py-2 px-4">Block</th>
              <th className="py-2 px-4 text-blue-100">Age</th>
              <th className="py-2 px-4">From</th>
              <th></th>
              <th className="py-2 px-4">To</th>
              <th className="py-2 px-4">Value</th>
              <th className="py-2 px-4 text-blue-100">Txn Fee</th>
            </tr>
          </thead>
          <tbody>
            {result?.result.map((txn) => (
              <tr key={txn?.hash} className="text-white border-b border-gray-800">
                <td className="py-2 px-4 text-blue-300">{txn?.hash?.slice(0, 16)}...</td>
                <td>
                  <span className="text-gray-300">
                    {txn?.methodId ? txn?.methodId : "Unknown"}
                  </span>
                </td>
                <td className="py-2 px-4 text-blue-300">{txn?.blockNumber}</td>
                <td>{moment.unix(txn?.timeStamp).fromNow()}</td>
                <td>
                  {`${txn.from.slice(0, 8)}...${txn?.from.slice(-8)}`}
                </td>
                <td></td>
                <td className="py-2 px-4 text-blue-300">
                  {`${txn?.to?.slice(0, 8)}...${txn.to.slice(-8)}`}
                </td>
                <td>{(txn?.value / 10 ** 18).toFixed(5)} BTC</td>
                <td>{(txn?.gasPrice / 10 ** 18).toFixed(12)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>}

      {showSecondTable &&
      <section className="bg-grey-1000 p-4 rounded">
        <p className="text-white">
        Latest 20 ERC-20 Token Transfer Events
        </p>

        <table className="w-full mt-4 border border-gray-800 rounded">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="py-2 px-4">Txn Hash</th>
              <th className="py-2 px-4 text-blue-100">Age</th>
              <th className="py-2 px-4">From</th>
              <th></th>
              <th className="py-2 px-4">To</th>
              <th className="py-2 px-4">Value</th>
              <th className="py-2 px-4 text-blue-100">Token</th>
            </tr>
          </thead>
          <tbody>
            {result.ERC.map((txn) => (
              <tr key={txn.hash} className="text-white border-b border-gray-800">
                <td className="py-2 px-4 text-blue-300">{txn?.hash?.slice(0, 16)}...</td>
            
                <td>{moment.unix(txn?.timeStamp).fromNow()}</td>
                <td>
                  {`${txn?.from?.slice(0, 8)}...${txn.from.slice(-8)}`}
                </td>
                <td></td>
                <td className="py-2 px-4 text-blue-300">
                  {`${txn?.to?.slice(0, 8)}...${txn.to.slice(-8)}`}
                </td>
                <td>{(txn?.value / 10 ** 18).toFixed(5)} BTC</td>
                <td>{txn?.tokenName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>}
    </section>
  );
};

SearchResults.propTypes = {
  result: PropTypes.shape({
    result: PropTypes.array,
    balance: PropTypes.number,
    ethValue: PropTypes.number,
    ERC: PropTypes.array
  })
};
export default SearchResults;

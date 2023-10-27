import React, { useEffect } from "react";
import { useState } from "react";
import classNames from 'classnames';
import "./App.css";


const taxbrackets = [
  { id: 0, data: "$0 - $18,200" },
  { id: 1, data: "$18,201 - $45,000" },
  { id: 2, data: "$45,001 - $120,000" },
  { id: 3, data: "$120,001 - $180,000" },
  { id: 4, data: "$180,001+" },
]
const taxrates = [
  ["0%"],
  ["Nil + 19% of the excess over $18,200"],
  ["$5,092 + 32.5% of the excess over $45,000"],
  ["$29,467 + 37% of the excess over $120,000"],
  ["$51,667 + 45% of the excess over $180,000"]
]


const App = () => {
  const [purchase, setpurchase] = useState("");
  const [sale, setsale] = useState("");
  const [expense, setexpense] = useState("");
  const [shortterm, setshortterm] = useState(false);
  const [longterm, setlongtterm] = useState(false);
  const [taxind, settaxind] = useState(0);
  const [capitalgains, setcapitalgains] = useState(0);
  const [longTermDiscount, setlongTermDiscount] = useState(0);
  const [netCapitalGains, setnetCapitalGains] = useState(0);
  const [finaltax, setfinaltax] = useState(0);

  const handlePurchase = (e) => {
    setpurchase(e.target.value);
  }
  const handleSale = (e) => {
    setsale(e.target.value)
  }
  const handleExpense = (e) => {
    setexpense(e.target.value)
  }
  const handleTaxIndex = (e) => {
    settaxind(e.target.value);
    calculate();
  }
  const calculate = () => {
    let saleprice = parseInt(sale);
    let purchaseprice = parseInt(purchase);
    let expenseprice = parseInt(expense);
    setcapitalgains(saleprice - purchaseprice - expenseprice);
    if (capitalgains >= 0) {
      setlongTermDiscount(capitalgains / 2);
    }
    if (shortterm) {
      setnetCapitalGains(capitalgains);
    } else {
      setnetCapitalGains(capitalgains - longTermDiscount);
    }
    if (taxind === "0") {
      console.log(taxind)
      setfinaltax(0);
    } else if (taxind === "1") {
      let x = 19 * netCapitalGains / 100
      setfinaltax(x);
    } else if (taxind === "2") {
      let x = 32.5 * netCapitalGains / 100
      setfinaltax(x);
    } else if (taxind === "3") {
      let x = 37 * netCapitalGains / 100
      setfinaltax(x);
    } else if (taxind === "4") {
      let x = 45 * netCapitalGains / 100
      setfinaltax(x);
    }

  }

  return (
    <div className="frame">
      <div className="frame-wrapper">
        <div className="div">
          <p className="text-wrapper">Free Crypto Tax Calculator Australia</p>
          <div className="div-2">
            <div className="div-3">
              <div className="div-4">
                <div className="text-wrapper-2">Financial Year</div>
                <div className="div-wrapper">
                  <div className="frame-wrapper-2">
                    <div className="div-5">
                      <div className="text-wrapper-3">FY 2023-24</div>
                      <img className="vector" alt="Vector" src="/Vector.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-4">
                <div className="text-wrapper-2">Country</div>
                <div className="div-6">
                  <div className="frame-wrapper-3">
                    <div className="div-7">
                      <div className="div-8">
                        <img
                          className="emojione-flag-for"
                          alt="Emojione flag for"
                          src="/emojione-flag-for-australia.svg"
                        />
                        <div className="text-wrapper-4">Australia</div>
                      </div>
                      <img className="vector" alt="Vector" src="/Vector.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hr" />
            <div className="div-9">
              <div className="div-10">
                <p className="text-wrapper-5">Enter purchase price of Crypto</p>
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">$ <input type="text" value={purchase} onChange={(e) => handlePurchase(e)} /></div>
                </div>
              </div>
              <div className="div-10">
                <p className="text-wrapper-5">Enter sale price of Crypto</p>
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">$  <input type="text" value={sale} onChange={(e) => handleSale(e)} /></div>
                </div>
              </div>
            </div>
            <div className="div-9">
              <div className="div-10">
                <div className="text-wrapper-5">Enter your Expenses</div>
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">$ <input type="text" value={expense} onChange={(e) => handleExpense(e)} /></div>
                </div>
              </div>
              <div className="div-10">
                <div className="text-wrapper-6">Investment Type</div>
                <div className="div-11">
                  <div className="div-12" onClick={() => calculate()}>
                    <div className={classNames('component', { 'component-active': shortterm })} onClick={() => { setshortterm(true); setlongtterm(false); }}>
                      <div className={classNames('trading', { 'trading-active': shortterm })}>Short Term</div>
                      {shortterm && <img className="img" alt="Frame" src="/mdi_tick.svg" />}
                    </div>
                    <div className="element-months">&lt; 12 months</div>
                  </div>
                  <div className="div-12" onClick={() => calculate()}>
                    <div className={classNames('component-2', { 'component2-active': longterm })} onClick={() => { setlongtterm(true); setshortterm(false); }}>
                      <div className={classNames('trading-2', { 'trading2-active': longterm })}>Long Term</div>
                      {longterm && (<img className="img-2" alt="Frame" src="/mdi_tick.svg" />)}
                    </div>
                    <div className="element-months">&gt; 12 Months</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-13">
              <div className="div-10">
                <div className="text-wrapper-6">Select Your Annual Income</div>
                <div className="div-14" onClick={() => calculate()}>
                  <div className="text-wrapper-7">
                    <select className="text-wrapper-7 sel" onChange={(e) => handleTaxIndex(e)} >

                      {
                        taxbrackets.map((e) => {
                          return (
                            <>
                              <option key={e.id} value={e.id}>{e.data}</option>
                            </>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="emojione-flag-for">
                    {/* <img alt="Arrowdown" src="/arrow.svg"/>*/}
                  </div>
                </div>
              </div>
              <div className="div-15">
                <div className="text-wrapper-8">Tax Rate</div>
                <div className="p" >{taxrates[taxind]}</div>
              </div>
            </div>
            {longterm && (<div className="div-9">
              <div className="div-10">
                <div className="text-wrapper-5">Capital gains amount</div>
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">$  <input type="number" value={capitalgains} disabled /></div>
                </div>
              </div>
              <div className="div-10">
                <div className="text-wrapper-5">Discount for long term gains</div>
                <div className="div-wrapper-2">
                  <div className="text-wrapper-3">${(capitalgains >= 0) ? netCapitalGains : 0}</div>
                </div>
              </div>
            </div>)}
            <div className="div-16">
              <div className="div-17">
                <p className="text-wrapper-9">Net Capital gains tax amount</p>
                <div className="text-wrapper-10">${(netCapitalGains >= 0 && !isNaN(netCapitalGains)) ? netCapitalGains : 0}</div>
              </div>
              <div className="div-18">
                <p className="text-wrapper-9">The tax you need to pay*</p>
                <div className="text-wrapper-11">${(finaltax >= 0 && !isNaN(finaltax)) ? finaltax : 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;

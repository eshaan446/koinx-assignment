import React from 'react'
import { useState,useEffect } from "react";
import "../App.css";
import classNames from 'classnames';
import Cleave from "cleave.js/react";
import taxbrackets from '../data.js/taxbrackets'
import taxrates from '../data.js/taxrates'
import countries from '../data.js/countries'
import flags from '../data.js/flags'
import years from '../data.js/years'
import Faq from './Faq';

const currecysigndata=['$','₹']
const Calculator = () => {
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
    const [countryid, setcountryid] = useState(0);
    const [currencysign,setcurrencysign]=useState('$');
  
    useEffect(() => {
      if (taxind === 0) {
        setfinaltax(0);
      } else if (taxind === 1) {
        let x = shortterm ? (19 * netCapitalGains) / 100 : (19 * longTermDiscount) / 100;
        setfinaltax(x);
      } else if (taxind === 2) {
        let x = shortterm ? (32.5 * netCapitalGains) / 100 : (32.5 * longTermDiscount) / 100;
        setfinaltax(x);
      } else if (taxind === 3) {
        let x = shortterm ? (37 * netCapitalGains) / 100 : (37 * longTermDiscount) / 100;
        setfinaltax(x);
      } else if (taxind === 4) {
        let x = shortterm ? (45 * netCapitalGains) / 100 : (45 * longTermDiscount) / 100;
        setfinaltax(x);
      }
    }, [netCapitalGains, longTermDiscount, taxind, shortterm]);
    
  
    const getNumericValue = (formattedValue) => {    
      return parseFloat(formattedValue.replace(/,/g, ""));
    };
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
      settaxind(parseInt(e.target.value));
      calculate();
  
    }
    const calculate = () => {
      if (purchase !== "" && sale !== "" && expense !== "") {
        let saleprice = getNumericValue(sale);
        let purchaseprice = getNumericValue(purchase);
        let expenseprice = getNumericValue(expense);
        setcapitalgains((saleprice - purchaseprice) - expenseprice);
        if (capitalgains > 0) {
          setlongTermDiscount(capitalgains / 2);
        }
        if (longterm) {
          setTimeout(()=>
          setnetCapitalGains((capitalgains - longTermDiscount))

          ,2000)
          
        } else {
          setnetCapitalGains(capitalgains);
        }
      }
  
    }
    return (
      <>
        <div className="frame">
          <div className="frame-wrapper">
            <div className="div">
              <p className="text-wrapper">Free Crypto Tax Calculator {countries[countryid].country}</p>
              <div className="div-2">
                <div className="div-3">
                  <div className="div-4">
                    <div className="text-wrapper-2">Financial Year</div>
                    <div className="div-wrapper">
                      <div className="frame-wrapper-2">
                        <div className="div-5">
                          <div className="text-wrapper-3">
                            <select className="text-wrapper-4 sel">
                              {years.map((e) => {
                                return (
                                  <>
                                    <option>{e}</option>
                                  </>
                                )
                              })}
                            </select>
                          </div>
  
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
                              src={flags[countryid]}
                            />
                            <div>
                              <select className="text-wrapper-4 sel" onChange={(e) => setcountryid(e.target.value)}>
                                {countries.map((e) => {
                                  return (
                                    <>
                                      <option value={e.id}>{e.country}</option>
                                    </>
                                  )
                                })}
                              </select>
                            </div>
                          </div>
  
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
                      <div className="text-wrapper-3">{currecysigndata[countryid]} <Cleave className="input" options={{ numeral: true }} value={purchase} onChange={(e) => handlePurchase(e)} /></div>
                    </div>
                  </div>
                  <div className="div-10">
                    <p className="text-wrapper-5">Enter sale price of Crypto</p>
                    <div className="div-wrapper-2">
                      <div className="text-wrapper-3">{currecysigndata[countryid]} <Cleave className="input" options={{ numeral: true }} value={sale} onChange={(e) => handleSale(e)} /></div>
                    </div>
                  </div>
                </div>
                <div className="div-9">
                  <div className="div-10">
                    <div className="text-wrapper-5">Enter your Expenses</div>
                    <div className="div-wrapper-2">
                      <div className="text-wrapper-3">{currecysigndata[countryid]} <Cleave className="input" options={{ numeral: true }} value={expense} onChange={(e) => handleExpense(e)} /></div>
                    </div>
                  </div>
                  <div className="div-10">
                    <div className="text-wrapper-6">Investment Type</div>
                    <div className="div-11">
                      <div className="div-12">
                        <div className={classNames('component', { 'component-active': shortterm })} onClick={() => { setshortterm(true); setlongtterm(false); }}>
                          <div className={classNames('trading', { 'trading-active': shortterm })}>Short Term</div>
                          {shortterm && <img className="img" alt="Frame" src="/mdi_tick.svg" />}
                        </div>
                        <div className="element-months">&lt; 12 months</div>
                      </div>
                      <div className="div-12">
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
                            taxbrackets.map((e,id) => {
                              return (
                                <>
                                  {/* <option key={e.id} value={e.id}>{currecysigndata[countryid]}&nbsp;{e.data1} { (e.data2!=="") ? `${currecysigndata[countryid]} ${e.data2}`:""}</option> */}
                                  <option key={e.id} value={e.id}>{e.data.replaceAll('$',currecysigndata[countryid])}</option>
                                </>
                              )
                            })
                          }
                        </select>
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
                      <div className="text-wrapper-3">{currecysigndata[countryid]}  <Cleave className="input" options={{ numeral: true }} value={capitalgains} disabled /></div>
                    </div>
                  </div>
                  <div className="div-10">
                    <div className="text-wrapper-5">Discount for long term gains</div>
                    <div className="div-wrapper-2">
                      <div className="text-wrapper-3">{currecysigndata[countryid]}   <Cleave className="input" options={{ numeral: true }} value={(capitalgains > 0) ? netCapitalGains : 0} disabled />
  
                        { }</div>
                    </div>
                  </div>
                </div>)}
                <div className="div-16">
                  <div className="div-17">
                    <p className="text-wrapper-9">Net Capital gains tax amount*</p>
                    { (purchase !=="" && netCapitalGains===0) && <span>Loading</span>}
                    <div className="text-wrapper-10">{currecysigndata[countryid]}{(netCapitalGains >= 0 && !isNaN(netCapitalGains)) ? netCapitalGains : 0}</div>
                  </div>
                  <div className="div-18">
                    <p className="text-wrapper-9">The tax you need to pay*</p>
                    { (purchase !=="" && netCapitalGains===0) && <span>Loading</span>}
                    <div className="text-wrapper-11">{currecysigndata[countryid]}{(finaltax >= 0 && !isNaN(finaltax)) ? finaltax : 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <Faq/>
      </>
    );
}

export default Calculator
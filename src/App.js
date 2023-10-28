import React from "react";
import { useState } from "react";
import classNames from 'classnames';
import "./App.css";
import Cleave from "cleave.js/react";


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
const faq = [
  { id: 1, question: "How are cryptocurrencies taxed in Australia?", answer: "The Australian Taxation Office (ATO) regards cryptocurrency as both property, which is subject to Capital Gains Tax (CGT), and income, which is subject to Income Tax. CGT applies when you sell, trade, gift, or make purchases using cryptocurrency. On the other hand, Income Tax applies when you receive cryptocurrency as payment for services, work, mining, staking, or other activities. To simplify tax calculations, consider using a free crypto tax calculator for Australia." },
  { id: 2, question: "What’s the difference between long-term and short-term capital gains?", answer: "The distinction between long-term and short-term capital gains lies in the duration of ownership. When you own an asset, such as cryptocurrency, for more than 12 months, any gains from its sale are categorised as long-term. These long-term gains often receive a 50% discount on the capital gains tax (CGT). In contrast, if you hold the asset for 12 months or less, the gains are considered short-term, and they are taxed at your regular income tax rate." },
  { id: 3, question: "Do I have to pay tax on crypto-to-crypto transactions?", answer: "Yes, according to the ATO, when you trade one cryptocurrency for another, like NFTs, stablecoins, or tokens, it's seen as selling one asset to buy another, and any profit you make from this exchange is subject to Capital Gains Tax. To compute taxes for crypto-to-crypto transactions, you must determine the fair market value of your coins in AUD at both the acquisition and disposal times. However, this can be challenging because many exchanges use cryptocurrency as the standard for valuation." },
  { id: 4, question: "Can the ATO track crypto?", answer: "The Australian Taxation Office (ATO) possesses strong tracking capabilities for cryptocurrency transactions. Since 2014, they've been gathering data on crypto activities, including KYC info from exchanges and wallets. The ATO's data matching program, active since 2019, lets them access data from service providers like Binance and CoinJar, covering personal details and transaction specifics. Since 2020, the ATO has been notifying Australian crypto investors to report holdings to avoid penalties." },
  { id: 5, question: "What is the best crypto tax calculator for Australia?", answer: "KoinX is a crypto tax platform that makes it easy to calculate tax on crypto transactions. It also provides portfolio insights of all crypto exchange accounts combined, making it a valuable tool for chartered accountants and VDA Investors alike." },
  { id: 6, question: "Do I have to pay tax if I lose money trading crypto?", answer: "In Australia, when your cryptocurrency loses value, it's classified as a capital loss. This means you won't have to pay taxes on that loss. It's a way to offset any gains you might have made in other investments for tax purposes." },
  { id: 7, question: "Is using a crypto tax calculator safe?", answer: "KoinX provides a reliable crypto tax calculator that can assist you in determining your tax obligations for cryptocurrency transactions. This tool accurately tracks your portfolio on your preferred exchange and computes your gains or losses based on the crypto amounts and prices involved." },
  { id: 8, question: "Which exchanges do you support?", answer: "KoinX seamlessly integrates with a wide array of exchanges, including Binance, CoinSpot, MEXC, Bybit, Coinbase, Kraken, and numerous others. It effortlessly consolidates cryptocurrency transactions from over 180+ chains, exchanges, and wallets, presenting them in a user-friendly unified dashboard." },
  { id: 9, question: "Do I have to pay tax if I transfer crypto from one wallet to another?", answer: "Transferring cryptocurrency from one wallet to another that you own in Australia is not subject to tax, as it is not recognised as a taxable event, and capital gains tax is not triggered. Nevertheless, it's essential to keep detailed records of these transfers, particularly if you are utilising automated crypto tax software like KoinX. KoinX, as a reliable crypto tax software, can streamline the process, making it easier to maintain accurate and efficient tax records and reporting while ensuring compliance with Australian tax regulations." },
  { id: 10, question: "How do I use a cryptocurrency tax calculator?", answer: "In order to use a cryptocurrency tax calculator, you need to input information about your cryptocurrency transactions. After you enter your information, the cryptocurrency tax calculator will calculate the gain or loss on every transaction.This includes:1. The financial year you want to calculate your taxes for.2. The country you want to calculate your taxes for.3. The purchase price of the coin.4. The sale price of the coin." },
  {
    id: 11, question: "How do I use a cryptocurrency tax calculator?",
    answer: "In order to use a cryptocurrency tax calculator, you need to input information about your cryptocurrency transactions. After you enter your information, the cryptocurrency tax calculator will calculate the gain or loss on every transaction. This includes: 1. The financial year you want to calculate your taxes for. 2. The country you want to calculate your taxes for. 3. The purchase price of the coin. 4. The sale price of the coin."
  },
  {
    id: 12, question: "How do I lower my cryptocurrency taxes?",
    answer: "Here are the top 6 strategies for lowering your cryptocurrency taxes in Australia: 1. Hold for over 12 months- Hold your crypto for more than 12 months to qualify for a 50% long-term CGT discount to reduce your tax liability. 2. Offset gains with losses- Offset capital gains with capital losses from cryptocurrency, reducing your overall tax burden. 3. Claim tax deductions- Explore opportunities to claim significant deductions on your regular income if you're a trader or running a crypto business. 4. Use crypto tax tools- Employ crypto tax software like KoinX or seek help from a crypto tax specialist to streamline calculations and ensure compliance. 5. Donate to charities- Donate cryptocurrency to registered charities since it’s not a taxable event, and claim deductions on the donated amount. 5. Full disclosure- Be transparent and disclose all your crypto transactions to the ATO to avoid penalties for hiding trading activities."
  }
]

const countries = [
  { id: 0, country: "Australia" },
  { id: 1, country: "United States" },
  { id: 2, country: "United Kingdom" },
  { id: 3, country: "Canada" },
  { id: 4, country: "Germany" },
  { id: 5, country: "Japan" },
  { id: 6, country: "South Korea" },
  { id: 7, country: "France" },
  { id: 8, country: "India" },
  { id: 9, country: "Russia" },
  { id: 10, country: "China" },
  { id: 11, country: "Singapore" },
];

const flags=[
  "/emojione-flag-for-australia.svg",
  "/usa.svg","/uk.svg","/canada.svg","/germany.svg","/japan.svg","/southkorea.svg","/france.svg","/india.svg","/russia.svg",
  "/china.svg","/singapore.svg"
]
const years = ["FY 2023-24", "FY 2022-23"];


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
  const [countryid, setcountryid] = useState(0);

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
    settaxind(e.target.value);
    calculate();
  }
  const calculate = () => {
    let saleprice = getNumericValue(sale);
    let purchaseprice = getNumericValue(purchase);
    let expenseprice = getNumericValue(expense);
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
                    <div className="text-wrapper-3">$ <Cleave className="input" options={{ numeral: true }} value={purchase} onChange={(e) => handlePurchase(e)} /></div>
                  </div>
                </div>
                <div className="div-10">
                  <p className="text-wrapper-5">Enter sale price of Crypto</p>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$  <Cleave className="input" options={{ numeral: true }} value={sale} onChange={(e) => handleSale(e)} /></div>
                  </div>
                </div>
              </div>
              <div className="div-9">
                <div className="div-10">
                  <div className="text-wrapper-5">Enter your Expenses</div>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$ <Cleave className="input" options={{ numeral: true }} value={expense} onChange={(e) => handleExpense(e)} /></div>
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
                    <div className="text-wrapper-3">$  <Cleave className="input" options={{ numeral: true }} value={capitalgains} disabled /></div>
                  </div>
                </div>
                <div className="div-10">
                  <div className="text-wrapper-5">Discount for long term gains</div>
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-3">$   <Cleave className="input" options={{ numeral: true }} value={(capitalgains >= 0) ? netCapitalGains : 0} disabled />

                      { }</div>
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

      <div className="frame">
        <div className="frame-wrapper">
          <p className="text-wrapper">Frequently Asked Questions</p>
          <div>
            {faq.map((e) => {
              return (
                <>
                  <p className="text-wrapper-small">{e.id}.&nbsp;{e.question}</p>
                  <p className="">{e.answer}</p>
                </>
              )

            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;

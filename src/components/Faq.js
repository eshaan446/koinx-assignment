import React from 'react'
import '../App.css'
import faq from '../data.js/faq'

const Faq = () => {
  return (
    <>
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
  )
}

export default Faq
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getDateUser } from "../../Redux/Actions/Home";
import Cards from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import style from './wall-etCard.module.css'
const WalletCard = () => {
  const user = useSelector(state => state.homeReducer.User);
  const dispatch = useDispatch();
  
  let [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender === true) {
      dispatch(getDateUser());
      setFirstRender(firstRender = !firstRender)
    }
  }, [firstRender, dispatch]);

  const card = user ? user.card : null

  //COPY CARD 
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <div>
      {card ?
        <div className={style.conteiner}>
          <Cards
            number={card.number}
            name={card.name}
            expiry={card.expiry}
            cvc={card.cvc}
            focused={card.name}
            
          />
          <div>
            <h4 id="number">Number of credit or debit Card:</h4>
            <div className={style.centeringCopy}>
            <input
              id='cardNumber'
              ref={textAreaRef}
              value={card.number} 
              className={style.inputs}/> {
                document.queryCommandSupported('copy') &&
                // <div>
                  <div className={style.copiedSuccessCard}>
                <FontAwesomeIcon
                className={style.inputCVUCopy}
                onClick={copyToClipboard}
                icon={faCopy}
                id='show_hide' />
                {copySuccess}
                  </div>
              // </div>
            }
            </div>
            <hr />
          </div>
          <div>
            <h4 id="name">Cardholder's Name:</h4>
            <h4>{card.name} </h4>
            <hr />
          </div>
          <div>
            <h4 id="expiry">Expiration date:</h4>
            <h4>{card.expiry} </h4>
            <hr />
          </div>
          <div>
            <h4 id="cvc">CVC</h4>
            <h4>{card.cvc} </h4>
            <hr />
          </div>
          
            {/* <label htmlFor='cardNumber'> Copy the card number </label>
            <input
              id='cardNumber'
              ref={textAreaRef}
              value={card.number} 
              className={style.inputs}/>
            {
              document.queryCommandSupported('copy') &&
              <div>
                <FontAwesomeIcon
                  onClick={copyToClipboard}
                  icon={faCopy}
                  id='show_hide' />
                {copySuccess}
              </div>
            } */}
         
        </div> : <img
            src="https://mesadepartes.munilosolivos.gob.pe/img/loading.gif"
            alt="LoadingGif"
            className={style.loadingGifDA}
          />}
    </div>
  );
}

export default WalletCard;

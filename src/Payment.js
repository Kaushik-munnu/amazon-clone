import React,{useEffect, useState} from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import {useStateValue} from "./StateProvider";
import {Link,useHistory} from "react-router-dom";
import {CardElement, useStripe, useElements, Elements} from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "./reducer";
import axios from 'axios';


function Payment() {
  const [{basket,user},dispatch] =useStateValue();
  const history=useHistory();

  const  stripe = useStripe();
  const elements = useElements(); // these are hooks

  const [succeeded,setSucceeded] = useState(false);
  const [processing,setProcessing] =useState("");


  const [error,setError] = useState(null);
  const[disabled,setDisabled]= useState(true);
  const [clientSecret,setClientSecret]=useState(true); // it gives client secret before to stripe before proceeding to any transaction

  useEffect( () => {
    // generate the special stripe secret which allows us to charge  a customer
    const getClientSecret= async () => {
      const response = await axios({
        method:'post',
        // stripe expects the total in a currencies subnits
        url:`/payments/create/total=${getBasketTotal(basket) *100}` // if we are doing in dollars then *100

      });
      setClientSecret(response.data.clientSecret) // in this useEffect we have written whenever the basket changes it wil make this request and it will update special stripe secret to take the correct amount from customer

    }

    getClientSecret();


  },[basket])

  const handleSubmit = async (event) => {
    // do all the facy stripe stuff

    event.preventDefault();
    setProcessing(true);
    
    const payload = await stripe.confirmCardPayment(clientSecret, { // clientSecret will how much we will charge
      payment_method: {
        card:elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      //paymentIntent=payment confirmation

      setSucceeded(true);
      setError(null);
      setProcessing(false)

      history.replaceState('/orders ') // it will push order page ,we use replace instead of push because we don't want to come to the payment page
    })

  }

  const handleChange = event => {
    //Listen for changes in the CardElement
    // display any errors as customer types their card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message:"");
  }
  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
        Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery address</h3>
            </div>
        
          <div className='payment__address'>
              <p>{user?.email}</p>
              <p>Qtr-199</p>
              <p>Sector-3/A</p>
              <p>Near Shopping center</p>
              <p>Bokaro Steel City</p>
              <p>Jharkhand</p>
          </div>
        </div>
        <div className='payment__section'>
            <div className='payment__title'>
                <h3> Review items and delivery </h3>
            </div>
            <div className='payment__items'>
                {basket.map(item => (
                  <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  
                  />
              


                ))}
            </div>
          </div>  
        <div className='payment__section'>
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
                  <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange}/>

                    <div className='payment__priceContainer'>
                      <CurrencyFormat
                        renderText={(value) => (
                          <>
                            <h3>Order Total:{value}</h3>
                          </>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)} // Part of the homework
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <button disabled={processing || disabled || succeeded}>
                          <span>{processing ? <p>Processing</p> :"Buy Now"}</span>
                      </button>
                    </div>

                    {error && <div>{error}</div>}
                  </form>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Payment
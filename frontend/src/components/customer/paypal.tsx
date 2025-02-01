import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const PayPalPayment: React.FC = () => {

  const initialUsername: string | undefined = Cookies.get('user_name');
  const [username, setUsername] = useState<string | undefined>(initialUsername);

  const initialOptions: any = {
    'client-id': 'AdB4sXWK35VVUgRmBjY9Mz1XlrDQdcRKm_JDBkZh7qWWyBZEilzzzOw7Ekkq9Zp7KRra1JiSCXZo2edZ', 
    currency: 'USD',
  };

  const [completed, setCompleted] = useState<boolean>(false);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '10.00', 
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      setCompleted(true);
      // Handle successful payment, e.g., display a success message
      console.log('Transaction completed by ' + details.payer.name.given_name);

      if (username) {
        update_order_status(username);
      } else {
        console.error('Username is undefined');
      }
    });
  };

  function update_order_status(username: string): void {
   
    axios.put(`http://localhost:5000/orders/change_status/${username}`)
      .then((response) => {
        console.log('Order status updated successfully');
        window.location.href="/customer/dashboard";
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        // Handle errors, if needed
      });
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      {!completed ? (
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      ) : (
        <div>
          <h2>Payment Completed!</h2>
        </div>
      )}
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;

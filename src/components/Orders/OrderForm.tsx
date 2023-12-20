// components/Orders/OrderForm.tsx

import React, { useState, type ChangeEvent, type FormEvent } from 'react'

interface FormData {
  itemName: string
  quantity: number
  price: number
  customerName: string
  customerPhoneNumber: string
  deliveryAddress: string
  orderNumber: string
  dateAndTime: string
  deliveryOption: 'directHandoff' | 'leaveOnDoorstep'
  packageOrderType: 'bronze' | 'silver' | 'gold' | 'platinum'
  labelType: 'physical' | 'digital' | 'amazonQR'
  paymentMethod: 'visa' | 'mastercard' | 'debitCard'
  promoCode: string
  upgradeOption: 'unlimited' | 'noUpgrade'
  description: string
  status:
    | 'Driver received'
    | 'Driver on the way'
    | 'Driver delivered to post office'
    | 'Delivered'
    | 'Cancelled'
  bigFile: Buffer
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    itemName: '',
    quantity: 0,
    price: 0,
    customerName: '',
    customerPhoneNumber: '',
    deliveryAddress: '',
    orderNumber: '',
    dateAndTime: '',
    deliveryOption: 'directHandoff',
    packageOrderType: 'bronze',
    labelType: 'physical',
    paymentMethod: 'visa',
    promoCode: '',
    upgradeOption: 'noUpgrade',
    description: '',
    status: 'Driver received',
    bigFile: Buffer.from(''), // Initialize with an empty buffer
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          bigFile: Buffer.from(reader.result as ArrayBuffer),
        }))
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // TODO: Perform any additional validation if needed

    // Send the form data to the backend API for insertion into the database
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Order submitted successfully!')
          // Optionally, you can reset the form or navigate to another page
          // setFormData({ itemName: '', quantity: 0, price: 0, customerName: '', deliveryAddress: '' });
        } else {
          console.error('Failed to submit order:', response.statusText)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... (existing form fields) */}
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="Driver received">Driver received</option>
          <option value="Driver on the way">Driver on the way</option>
          <option value="Driver delivered to post office">
            Driver delivered to post office
          </option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </label>
      <br />
      <label>
        Big File:
        <input type="file" name="bigFile" onChange={handleFileChange} />
      </label>
      <br />
      {/* Add similar labels for other fields as needed */}
      {/* ... (existing form fields) */}
      <label>
        Item Name:
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Customer Name:
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Customer Phone Number:
        <input
          type="tel"
          name="customerPhoneNumber"
          value={formData.customerPhoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Delivery Address:
        <input
          type="text"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <br />
      <label>
        Delivery Option:
        <select
          name="deliveryOption"
          value={formData.deliveryOption}
          onChange={handleInputChange}
        >
          <option value="directHandoff">Direct Handoff</option>
          <option value="leaveOnDoorstep">Leave on Doorstep</option>
        </select>
      </label>
      <br />
      <label>
        Package Order Type:
        <select
          name="packageOrderType"
          value={formData.packageOrderType}
          onChange={handleInputChange}
        >
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
        </select>
      </label>
      <br />
      <label>
        Label Type:
        <select
          name="labelType"
          value={formData.labelType}
          onChange={handleInputChange}
        >
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
          <option value="amazonQR">Amazon QR Code</option>
        </select>
      </label>
      <br />
      <label>
        Payment Method:
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="visa">Visa</option>
          <option value="mastercard">MasterCard</option>
          <option value="debitCard">Debit Card</option>
        </select>
      </label>
      <br />
      <label>
        Promo Code:
        <input
          type="text"
          name="promoCode"
          value={formData.promoCode}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Upgrade Option:
        <select
          name="upgradeOption"
          value={formData.upgradeOption}
          onChange={handleInputChange}
        >
          <option value="unlimited">Upgrade to Unlimited</option>
          <option value="noUpgrade">No Upgrade</option>
        </select>
      </label>
      <br />
      {formData.labelType === 'digital' || formData.labelType === 'amazonQR' ? (
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
      ) : null}
      <br />
      {/* ... (similar labels for other fields) */}
      {/* ... (existing form fields) */}

      <button type="submit">Submit Order</button>
    </form>
  )
}

export default OrderForm

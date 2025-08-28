import { usePayment } from '@/context/PaymentContext'
import React, { useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const PaymentMethod = () => {
  const {
    paymentOptions,
    selectedPayment,
    setSelectedPayment
  } = usePayment()

  useEffect(() => {
    if (!selectedPayment && paymentOptions.length > 0) {
      setSelectedPayment(paymentOptions[0])
    }
  }, [paymentOptions, selectedPayment, setSelectedPayment])

  return (
    <RadioGroup
      value={selectedPayment?.code}
      onValueChange={(value) => {
        const chosen = paymentOptions.find((p) => p.code === value)
        setSelectedPayment(chosen)
      }}
    >
      {paymentOptions.map((payment) => (
        <div key={payment.code} className={`flex items-center justify-between space-x-3 p-2 border rounded ${(selectedPayment && selectedPayment.code == payment.code) ? 'bg-[var(--primary)]/20' : ''}`}>
          <label htmlFor={payment.code} className="flex-1 cursor-pointer text-sm">
            {payment.name}
          </label>
          <RadioGroupItem value={payment.code} id={payment.code} />
        </div>
      ))}
    </RadioGroup>
  )
}

export default PaymentMethod

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51234567890abcdef') // Demo key - replace with real key

interface StripePaymentProps {
  classType: 'private' | 'group' | 'offline'
  amount: number // in cents
  onSuccess: (paymentIntent: any) => void
  onCancel: () => void
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      '::placeholder': {
        color: '#9ca3af',
      },
      backgroundColor: 'transparent',
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: true,
}

function CheckoutForm({ classType, amount, onSuccess, onCancel }: StripePaymentProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const classInfo = {
    private: { name: 'Private Class', description: 'One-on-one English lesson' },
    group: { name: 'Group Class', description: 'Small group English lesson' },
    offline: { name: 'Offline Package', description: 'Self-study materials' }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentStatus('processing')
    setErrorMessage(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setIsProcessing(false)
      setPaymentStatus('error')
      setErrorMessage('Card element not found')
      return
    }

    try {
      // In a real implementation, you would:
      // 1. Call your backend to create a PaymentIntent
      // 2. Get the client_secret from your backend
      // 3. Confirm the payment with Stripe

      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate a successful payment
      const mockPaymentIntent = {
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        amount: amount,
        currency: 'usd',
        status: 'succeeded',
        client_secret: 'pi_test_client_secret'
      }

      setPaymentStatus('success')
      toast.success('Payment successful! You will receive a confirmation email shortly.')

      setTimeout(() => {
        onSuccess(mockPaymentIntent)
      }, 1500)

    } catch (error) {
      console.error('Payment failed:', error)
      setPaymentStatus('error')
      setErrorMessage('Payment failed. Please try again.')
      toast.error('Payment failed. Please try again.')
    }

    setIsProcessing(false)
  }

  if (paymentStatus === 'success') {
    return (
      <Card className="border-green-500/20 bg-green-500/10">
        <CardContent className="p-8 text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold text-green-500">Payment Successful!</h3>
          <p className="text-muted-foreground">
            Your {classInfo[classType].name.toLowerCase()} has been booked successfully.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <CardDescription>
          Complete your booking for {classInfo[classType].name} - ${(amount / 100).toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="p-4 bg-secondary/20 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{classInfo[classType].name}</span>
            <span className="font-bold">${(amount / 100).toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground">{classInfo[classType].description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Element */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Card Information</label>
            <div className="p-4 border border-border rounded-lg bg-background/50">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Demo Notice */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode:</strong> This is a demonstration. No real payment will be processed.
              Use any test card number like 4242 4242 4242 4242.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || isProcessing}
              className="flex-1 glow-effect"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ${(amount / 100).toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>🔒 Your payment information is secure and encrypted</p>
          <p>Powered by Stripe - Industry-leading payment security</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StripePayment(props: StripePaymentProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  )
}

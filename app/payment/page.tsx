'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Download, Copy, Check, X, QrCode, AlertCircle, Wallet, Smartphone, CreditCard } from 'lucide-react';
import QRCode from 'qrcode';
import { showToast } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-context';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

// Payment timer duration in seconds (5 minutes)
const PAYMENT_TIMER_SECONDS = 300;

type PaymentTimerProps = {
  initialSeconds: number;
  onTimeout: () => void;
  orderId: string;
  amount: number;
};

function PaymentTimer({ initialSeconds, onTimeout, orderId, amount }: PaymentTimerProps) {
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds);
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      setIsExpired(true);
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onTimeout]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const progress = (secondsLeft / initialSeconds) * 100;

  if (isExpired) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <X className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-red-600">Payment Time Expired</h3>
        <p className="mt-2 text-sm text-red-500">
          The payment timer has expired. Please place a new order to complete your payment.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-orange-50 p-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-orange-600" />
        <span className="text-lg font-bold text-orange-700">Payment Time Remaining</span>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="text-5xl font-bold text-gray-900">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="h-3 w-full rounded-full bg-orange-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <p className="mt-3 text-center text-sm text-orange-600">
        Complete your payment within {minutes}m {seconds}s
      </p>
    </div>
  );
}

type QRPaymentProps = {
  orderId: string;
  amount: number;
  upiId?: string;
};

function QRPaymentSection({ orderId, amount, upiId = 'loknathartcenter@upi' }: QRPaymentProps) {
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string>('');
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(true);
  const [merchantName, setMerchantName] = React.useState('Lokenath Art Center');

  React.useEffect(() => {
    async function loadMerchantSettings() {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('business_name')
          .limit(1)
          .single();

        if (data?.business_name) {
          setMerchantName(data.business_name);
        }
      } catch (err) {
        console.log('Using default merchant name');
      }
    }
    loadMerchantSettings();
  }, []);

  React.useEffect(() => {
    async function generateQR() {
      setIsGenerating(true);
      try {
        // Create UPI payment string
        // Format: pa=merchant@upi&pn=Merchant Name&am=Amount&tn=OrderId
        const encodedName = encodeURIComponent(merchantName);
        const upiString = `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&tn=${orderId}&cu=INR`;

        const dataUrl = await QRCode.toDataURL(upiString, {
          width: 250,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });

        setQrCodeUrl(dataUrl);
      } catch (err) {
        console.error('QR Code generation error:', err);
        showToast({
          title: 'Error generating QR code',
          description: 'Please try again or use manual payment',
        });
      } finally {
        setIsGenerating(false);
      }
    }

    generateQR();
  }, [orderId, amount, upiId]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `payment-${orderId}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({
      title: 'QR Code Downloaded',
      description: 'Scan the QR code with your UPI app to complete payment',
      variant: 'success',
    });
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast({
      title: 'UPI ID Copied',
      description: upiId,
      variant: 'success',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-center text-white">
        <p className="text-sm font-medium opacity-90">Pay Amount</p>
        <p className="mt-1 text-4xl font-bold">{formatPrice(amount)}</p>
        <p className="mt-1 text-sm opacity-80">Order ID: {orderId}</p>
      </div>

      {/* QR Code Section */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <QrCode className="h-5 w-5 text-orange-500" />
            Scan & Pay
          </h3>
          <Button
            onClick={handleDownload}
            disabled={!qrCodeUrl || isGenerating}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download QR
          </Button>
        </div>

        <div className="flex justify-center">
          {isGenerating ? (
            <div className="flex h-[250px] w-[250px] items-center justify-center rounded-xl bg-gray-100">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            </div>
          ) : qrCodeUrl ? (
            <div className="relative rounded-xl bg-white p-4 shadow-inner">
              <img
                src={qrCodeUrl}
                alt="Payment QR Code"
                className="h-[250px] w-[250px]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-xl">
                <div className="rounded-lg bg-white/90 px-3 py-1 text-xs font-medium text-gray-600">
                  {formatPrice(amount)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[250px] w-[250px] items-center justify-center rounded-xl bg-gray-100">
              <p className="text-sm text-gray-400">Failed to generate QR</p>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Open any UPI app and scan this QR code to pay
        </p>
      </div>

      {/* UPI ID Manual Copy */}
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="mb-2 text-sm font-medium text-gray-600">Or pay manually to UPI ID:</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 rounded-lg bg-white px-4 py-3 text-sm font-mono text-gray-800 shadow-sm">
            {upiId}
          </code>
          <Button
            onClick={handleCopyUPI}
            variant="outline"
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="rounded-2xl bg-blue-50 p-4">
        <h4 className="flex items-center gap-2 font-bold text-blue-700">
          <AlertCircle className="h-4 w-4" />
          How to Pay
        </h4>
        <ol className="mt-3 space-y-2 text-sm text-blue-600">
          <li className="flex gap-2">
            <span className="shrink-0 font-bold">1.</span>
            <span>Download the QR code or copy UPI ID</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold">2.</span>
            <span>Open your UPI app (GPay, PhonePe, Paytm, etc.)</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold">3.</span>
            <span>Scan QR or enter UPI ID and amount ({formatPrice(amount)})</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold">4.</span>
            <span>Complete payment and note your transaction ID</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold">5.</span>
            <span>Enter transaction ID in the order confirmation</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const orderId = searchParams.get('orderId') || '';
  const amount = Number(searchParams.get('amount')) || 0;
  const itemsParam = searchParams.get('items');
  const paymentMethod = searchParams.get('method') || 'UPI';

  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [paymentStatus, setPaymentStatus] = React.useState<'pending' | 'completed' | 'expired'>('pending');
  const [transactionId, setTransactionId] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [timerKey, setTimerKey] = React.useState(0);
  const [upiId, setUpiId] = React.useState('loknathartcenter@upi');

  // Fetch UPI ID from database
  React.useEffect(() => {
    async function fetchUpiId() {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('upi_id')
          .limit(1)
          .single();

        if (data?.upi_id) {
          setUpiId(data.upi_id);
        }
      } catch (err) {
        console.log('Using default UPI ID');
      }
    }
    fetchUpiId();
  }, []);

  React.useEffect(() => {
    if (itemsParam) {
      try {
        setCartItems(JSON.parse(decodeURIComponent(itemsParam)));
      } catch (e) {
        console.error('Failed to parse cart items:', e);
      }
    }
  }, [itemsParam]);

  const handleTimeout = React.useCallback(() => {
    setPaymentStatus('expired');
    showToast({
      title: 'Payment Time Expired',
      description: 'Please place a new order',
      variant: 'destructive',
    });
  }, []);

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) {
      showToast({
        title: 'Enter Transaction ID',
        description: 'Please enter your UPI transaction ID after payment',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Update order in database
      const { data: orderRow, error: orderReadError } = await supabase.from('store_orders').select('order_data').eq('id', orderId).single();
      if (orderReadError) { console.error(orderReadError); showToast({ title: 'Unable to load order', description: orderReadError.message, variant: 'destructive' }); throw orderReadError; }
      const { error } = await supabase
        .from('store_orders')
        .update({ order_data: { ...orderRow.order_data, paymentStatus: 'Completed', paymentReference: transactionId.trim() } })
        .eq('id', orderId)
        .select();

      if (error) {
        console.error('Failed to update order:', error);
        showToast({ title: 'Payment confirmation failed', description: error.message, variant: 'destructive' });
        throw error;
      }

      // Save purchase records
      if (user) {
        for (const item of cartItems) {
          const { error: purchaseError } = await supabase.from('purchases').insert({
            order_id: orderId,
            account_id: user.id,
            product_id: item.id,
            product_name: item.name,
            product_price: item.price,
            quantity: item.quantity,
            total_price: item.price * item.quantity,
            payment_method: paymentMethod,
            payment_status: 'Completed',
          }).select();
          if (purchaseError) { console.error(purchaseError); showToast({ title: 'Unable to record purchase', description: purchaseError.message, variant: 'destructive' }); throw purchaseError; }
        }
      }

      setPaymentStatus('completed');

      // Clear cart
      localStorage.removeItem('loknath-store-cart');

      showToast({
        title: 'Payment Successful',
        description: 'Your order has been confirmed!',
        variant: 'success',
      });

      // Redirect to orders page
      setTimeout(() => {
        router.push('/account/orders');
      }, 2000);

    } catch (error) {
      console.error('Payment confirmation error:', error);
      showToast({
        title: 'Payment Confirmation Failed',
        description: 'Please contact support',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('pending');
    setTimerKey((k) => k + 1);
    setTransactionId('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Redirect if no order info
  React.useEffect(() => {
    if (!orderId || !amount) {
      router.push('/store');
    }
  }, [orderId, amount, router]);

  if (!orderId || !amount) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="container py-8">
        <div className="mx-auto max-w-md">
          {/* Payment Timer */}
          {paymentStatus === 'pending' && (
            <div className="mb-6">
              <PaymentTimer
                key={timerKey}
                initialSeconds={PAYMENT_TIMER_SECONDS}
                onTimeout={handleTimeout}
                orderId={orderId}
                amount={amount}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {paymentStatus === 'expired' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="rounded-2xl bg-red-50 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <X className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600">Payment Time Expired</h3>
                  <p className="mt-2 text-sm text-red-500">
                    The payment timer has expired. Please place a new order to complete your payment.
                  </p>
                </div>
                <Button
                  onClick={() => router.push('/store')}
                  className="w-full"
                >
                  Back to Store
                </Button>
              </motion.div>
            ) : paymentStatus === 'completed' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-green-50 p-8 text-center"
              >
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-600">Payment Successful!</h3>
                <p className="mt-2 text-sm text-green-500">
                  Redirecting to your orders...
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Payment Method Badge */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  {paymentMethod === 'UPI' && (
                    <>
                      <Smartphone className="h-5 w-5 text-orange-500" />
                      <span className="font-medium text-gray-700">UPI Payment</span>
                    </>
                  )}
                  {paymentMethod === 'Credit/Debit Card' && (
                    <>
                      <CreditCard className="h-5 w-5 text-orange-500" />
                      <span className="font-medium text-gray-700">Card Payment</span>
                    </>
                  )}
                  {paymentMethod === 'Net Banking' && (
                    <>
                      <Wallet className="h-5 w-5 text-orange-500" />
                      <span className="font-medium text-gray-700">Net Banking</span>
                    </>
                  )}
                </div>

                {/* QR Payment Section */}
                <QRPaymentSection
                  orderId={orderId}
                  amount={amount}
                  upiId={upiId}
                />

                {/* Transaction ID Input */}
                <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Transaction ID / Reference
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g., UPI1234567890 or TXN987654321"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Enter the transaction ID from your UPI app after completing the payment
                  </p>

                  <Button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing || !transactionId.trim()}
                    className="mt-4 w-full"
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Payment'
                    )}
                  </Button>
                </div>

                {/* Order Summary */}
                <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="font-bold text-gray-800">Order Summary</h3>
                  <div className="mt-4 space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="line-clamp-2 text-xs font-bold text-gray-800">
                            {item.name}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-lg font-extrabold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(amount)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}

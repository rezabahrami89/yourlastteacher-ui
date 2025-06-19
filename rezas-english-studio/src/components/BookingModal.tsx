// ✅ Add these two lines with your other imports at the top:
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StripePayment } from "@/components/StripePayment";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  classType: "private" | "group" | "offline" | null;
}

export function BookingModal({
  isOpen,
  onClose,
  classType,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentStep, setCurrentStep] = useState<"booking" | "payment">(
    "booking"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    goals: "",
    timeSlot: "",
    paymentMethod: "",
  });

  const classInfo = {
    private: {
      title: "Private Classes",
      price: "$45/hour",
      priceInCents: 4500,
      description: "One-on-one personalized English lessons",
    },
    group: {
      title: "Group Classes",
      price: "$20/hour",
      priceInCents: 2000,
      description: "Small group sessions (3-5 students)",
    },
    offline: {
      title: "Offline Packages",
      price: "$199/package",
      priceInCents: 19900,
      description: "Comprehensive self-study materials",
    },
  };

  const currentClass = classType ? classInfo[classType] : null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      (!selectedDate && classType !== "offline")
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Move to payment step
    setCurrentStep("payment");
  };

  const handleOldSubmit = () => {
    // Mock payment processing
    toast.success(
      "Booking confirmed! Payment processed successfully. You will receive a confirmation email shortly."
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      level: "",
      goals: "",
      timeSlot: "",
      paymentMethod: "",
    });
    setSelectedDate(undefined);
    onClose();
  };

  const handlePaymentSuccess = (paymentIntent: any) => {
    console.log("Payment successful:", paymentIntent);

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      level: "",
      goals: "",
      timeSlot: "",
      paymentMethod: "",
    });
    setSelectedDate(undefined);
    setCurrentStep("booking");
    onClose();
  };

  const handlePaymentCancel = () => {
    setCurrentStep("booking");
  };

  if (!classType || !currentClass) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            Book Your {currentClass.title}
          </DialogTitle>
          <DialogDescription>
            {currentClass.description} - {currentClass.price}
          </DialogDescription>
        </DialogHeader>

        {currentStep === "payment" ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePaymentCancel}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Booking
              </Button>
              <div>
                <h3 className="font-semibold">Complete Payment</h3>
                <p className="text-sm text-muted-foreground">
                  {currentClass.title} - {currentClass.price}
                </p>
              </div>
            </div>

            <StripePayment
              classType={classType}
              amount={currentClass.priceInCents}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(value: string | undefined) =>
                        handleInputChange("phone", value || "")
                      }
                      defaultCountry="US"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Learning Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="level">English Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) =>
                        handleInputChange("level", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="elementary">Elementary</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="upper-intermediate">
                          Upper Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="goals">Learning Goals</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) =>
                        handleInputChange("goals", e.target.value)
                      }
                      placeholder="Tell us about your learning goals and what you want to achieve"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      handleInputChange("paymentMethod", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank-transfer">
                        Bank Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    * This is a demo. No actual payment will be processed.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Scheduling */}
            <div className="space-y-6">
              {classType !== "offline" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Select Date *
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 0
                      }
                      className="rounded-md border w-full"
                    />
                  </CardContent>
                </Card>
              )}

              {classType !== "offline" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Available Time Slots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "09:00",
                        "10:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                      ].map((time) => (
                        <Button
                          key={time}
                          variant={
                            formData.timeSlot === time ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleInputChange("timeSlot", time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{currentClass.title}</span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">
                        {selectedDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {formData.timeSlot && (
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{formData.timeSlot}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total:</span>
                    <span className="text-primary">{currentClass.price}</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleSubmit}
                className="w-full glow-effect"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Confirm Booking & Pay
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

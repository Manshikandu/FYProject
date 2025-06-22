import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { BookCard, BookCardContent } from "../components/ui/BookCard";
import { Calendar, Clock } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MapPicker from "../components/MapPicker";

import { toast } from "react-hot-toast";

const steps = ["Set date", "Set Location", "Details", "Event Details", "Done"];

const ArtistBookingForm = () => {

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    coordinates: null,
    eventType: "",
    eventDetails: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const location = useLocation();
  const [selectedArtistId, setSelectedArtistId] = useState(null);

   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const artistId = params.get("artistId");
    if (artistId) {
      setSelectedArtistId(artistId);
    }
  }, [location.search]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {

    if (step === 0) {
      if (!formData.date) {
        toast.error("Please select a date.");
        return false;
      }
      const selectedDate = new Date(formData.date);
      selectedDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error("Please select a current or future date.");
        return false;
      }
    }

    if (step === 1) {
      if (!formData.location?.trim()) {
        toast.error("Please set a location before proceeding.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.name || !formData.email) {
        toast.error("Please enter your name and email.");
        return false;
      }

      // Email regex for basic format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return false;
      }

      // Phone validation: must be exactly 10 digits (digits only)
      const phoneDigitsOnly = formData.phone.replace(/\D/g, "");
      if (phoneDigitsOnly.length !== 10) {
        toast.error("Phone number must have exactly 10 digits.");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.eventType) {
        toast.error("Please enter the event type.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < steps.length - 1) setStep(step + 1);
    else submitForm();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

 const submitForm = async () => {
  if (!selectedArtistId) {
    toast.error("Artist ID is missing from URL. Please open this page from an artist profile.");
    return;
  }
  try {
    // Assuming you have these values from your form state:
    const bookingData = {
      artist: selectedArtistId,              // you must get this somehow
      eventDate: formData.date.toISOString(), 
      startTime: formData.startTime.toISOString(), 
      endTime: formData.endTime.toISOString(),
      location: formData.location,
      coordinates: formData.coordinates,    // optional
      contactName: formData.name,           // rename 'name' to 'contactName'
      contactEmail: formData.email,         // rename 'email' to 'contactEmail'
      contactPhone: formData.phone,         // rename 'phone' to 'contactPhone'
      eventType: formData.eventType,
      eventDetails: formData.eventDetails,
      notes: formData.notes,
    };

    const response = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If your backend uses JWT:
        // "Authorization": `Bearer ${token}`, 
      },
      credentials: "include",  // include cookies if using sessions
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    console.log("Booking response:", result);

    if (response.ok) {
    toast.success("Booking request created!");
    setFormData({
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      location: "",
      coordinates: null,
      eventType: "",
      eventDetails: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    setStep(0); // Reset the form step to the first step
  } else {
    toast.error("Failed to create booking.");
  }
  }
  catch (error) {
    console.error("Error submitting booking:", error);
    toast.error("An error occurred while submitting your booking.");
  }
}

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-40 py-8 bg-gray-50">
      <BookCard className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Book an Artist</h2>
        

        {/* Step Progress Indicator */}
        <div className="relative mb-8">
          <div className="flex justify-between items-center relative z-10">
            {steps.map((label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">
                {/* Line BEFORE the dot, except the first */}
                {index !== 0 && (
                  <div
                    className={`absolute top-2 left-0 h-0.5 ${
                      step >= index ? "bg-[#1da1f2]" : "bg-gray-300"
                    }`}
                    style={{ width: "50%" }}
                  ></div>
                )}

                {/* Line AFTER the dot, except the last */}
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute top-2 right-0 h-0.5 ${
                      step > index ? "bg-[#1da1f2]" : "bg-gray-300"
                    }`}
                    style={{ width: "50%" }}
                  ></div>
                )}

                {/* The Dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 z-10 transition-colors duration-300 ${
                    step === index
                      ? "border-[#1da1f2] bg-[#1da1f2]"
                      : step > index
                      ? "bg-[#1da1f2] border-[#1da1f2]"
                      : "border-gray-300 bg-white"
                  }`}
                ></div>

                <span className="text-xs mt-2 text-center w-20 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <BookCardContent>
          {step === 0 && (
            <div className="flex flex-wrap gap-4 mb-70">
              {/* Date */}
              <div className="flex-1">
                <label className="block mb-2">Date</label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  dateFormat="P"
                  className="w-full border p-2 rounded"
                  minDate={new Date()}
                />
              </div>

              {/* Start Time */}
              <div className="flex-1 ">
                <label className="block mb-2">Start Time</label>
                <DatePicker
                  selected={formData.startTime}
                  onChange={(time) => setFormData({ ...formData, startTime: time })}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start"
                  dateFormat="h:mm aa"
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* End Time */}
              <div className="flex-1">
                <label className="block mb-2">End Time</label>
                <DatePicker
                  selected={formData.endTime}
                  onChange={(time) => setFormData({ ...formData, endTime: time })}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="End"
                  dateFormat="h:mm aa"
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-2">
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Event Location (optional address)"
              />
              <MapPicker
                value={formData.coordinates}
                onChange={(coords) => setFormData((prev) => ({ ...prev, coordinates: coords }))}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Your Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Your email"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  rows={4}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div>
                <label className="block mb-2">Event Type</label>
                <input
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Event Details</label>
                <input
                  name="eventDetails"
                  value={formData.eventDetails}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          )}

        {step === 4 && (
  <div className="space-y-4">
    {/* <h3 className="font-semibold text-lg mb-4">Review Your Booking</h3> */}

     <div>
      <strong>Date & Time:</strong>{" "}
      {formData.date
        ? formData.date.toLocaleDateString("en-US")
        : "-"}{" "}
      |{" "}
      {formData.startTime && formData.endTime
        ? `${formData.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} - ${formData.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`
        : "-"}
    </div>

    <div><strong>Location:</strong> {formData.location || "-"}</div>

    <div><strong>Contact Name:</strong> {formData.name || "-"}</div>
    <div><strong>Email:</strong> {formData.email || "-"}</div>
    <div><strong>Phone:</strong> {formData.phone || "-"}</div>

    <div><strong>Event Type:</strong> {formData.eventType || "-"}</div>
    <div><strong>Notes:</strong> {formData.notes || "-"}</div>
  </div>
)}


        </BookCardContent>

        <div className="flex justify-between mt-6">
          <Button onClick={handleBack} disabled={step === 0} variant="secondary">
            Back
          </Button>
          <Button onClick={handleNext}>{step === steps.length - 1 ? "Submit" : "Next"}</Button>
        </div>
      </BookCard>

      {/* Illustration on the Right */}
      <div className="hidden md:flex justify-center items-center md:ml-10">
        <img
          src="/src/assets/book.png"
          alt="Artist Booking"
          className="w-[300px] lg:w-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default ArtistBookingForm;

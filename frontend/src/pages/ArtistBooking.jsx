// ArtistBookingForm.jsx
import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { BookCard, BookCardContent } from "../components/ui/BookCard";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MapPicker from "../components/MapPicker";

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
    duration: "",
    eventDetails: "",
    name:"",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else submitForm();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const submitForm = () => {
    console.log("Booking request submitted:", formData);
    // Send POST request to backend
  };

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

    <BookCardContent >
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
            <input name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Event Location (optional address)" />
            <MapPicker value={formData.coordinates} onChange={(coords) => setFormData((prev) => ({ ...prev, coordinates: coords }))} />
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
              <input name="eventType" value={formData.eventType} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2">Duration</label>
              <input name="duration" value={formData.duration} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2">Event Details</label>
              <input name="Event details" value={formData.eventDetails} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
          </div>
        )}


        {step === 4 && (
          <div>
            <h3 className="font-semibold mb-2">Review Your Booking</h3>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
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

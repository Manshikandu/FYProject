// // // import React from "react";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";

// // // const BookedDatesCalendar = ({
// // //   bookedDates = [],       // Array of Date objects to disable/highlight
// // //   selectedDate,
// // //   onDateChange,
// // //   inline = true,
// // //   minDate = new Date(),
// // //   placeholder = "Select a date",
// // // }) => {
// // //   return (
// // //     <DatePicker
// // //       selected={selectedDate}
// // //       onChange={onDateChange}
// // //       highlightDates={bookedDates}
// // //       excludeDates={bookedDates}
// // //       inline={inline}
// // //       minDate={minDate}
// // //       placeholderText={placeholder}
// // //       // you can add more customization here if needed
// // //     />
// // //   );
// // // };

// // // export default BookedDatesCalendar;


import React from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react"; // Icon
import "react-datepicker/dist/react-datepicker.css";

// Custom Input Component for DatePicker
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="flex items-center gap-2 border p-2 rounded cursor-pointer w-full bg-white"
  >
    <Calendar className="w-5 h-5 text-gray-500" />
    <span>{value || "Select a date"}</span>
  </div>
));

const BookedDatesCalendar = ({
  bookedSlots = [],
  selectedDate,
  onDateChange,
  inline = false,
  minDate = new Date(),
  placeholder = "Select a date",
}) => {
  const getDayClass = (date) => {
    const matches = bookedSlots.filter(
      (slot) => new Date(slot.eventDate).toDateString() === date.toDateString()
    );

    const hasBooked = matches.some((slot) => slot.status === "booked");
    const hasAccepted = matches.some((slot) => slot.status === "accepted");

    if (hasBooked) return "bg-red-500 text-white rounded-full";
    if (hasAccepted) return "bg-yellow-400 text-black rounded-full";
    return "";
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dayClassName={getDayClass}
      minDate={minDate}
      placeholderText={placeholder}
      calendarClassName="z-50" // ensures it renders on top
      {...(inline
        ? { inline: true }
        : { customInput: <CustomDateInput /> })}
    />
  );
};

export default BookedDatesCalendar;

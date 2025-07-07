// utils/bookingPriority.js

export const statusWeights = {
  completed: 100,
  booked: 80,
  accepted: 60,
  pending: 30,
  rejected: 10,
  cancelled: 5,
};

export const contractWeights = {
  signed: 50,
  generated: 30,
  none: 0,
};

export function getRecencyWeight(timestamp) {
  const hoursAgo = (Date.now() - new Date(timestamp)) / (1000 * 60 * 60);
  return Math.max(0, 50 - hoursAgo); // Up to 50 for recent, 0 if older than 50 hours
}

export function calculateBookingScore(booking) {
  const statusScore = statusWeights[booking.status] || 0;
  const contractScore = contractWeights[booking.contractStatus || "none"] || 0;
  const recencyScore = getRecencyWeight(booking.lastActionTime || booking.updatedAt);

  return (
    0.5 * statusScore +
    0.3 * contractScore +
    0.2 * recencyScore
  );
}


   
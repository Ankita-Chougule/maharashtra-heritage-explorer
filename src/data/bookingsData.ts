export interface TourBooking {
  id: string;
  guideId?: string;
  guideName: string;
  visitorName: string;
  visitorPhone?: string;
  visitorEmail?: string;
  fortName: string;
  tourDate: string;
  groupSize: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Declined';
  meetingPoint?: string;
  specialRequirements?: string;
  amountPaid: string;
  bookingAmount: number;
  createdAt: string;
}

export const INITIAL_BOOKINGS: TourBooking[] = [
  {
    id: "BK-8801",
    guideId: "gd-01",
    guideName: "Vikram Pawar (Mavala Heritage Guild)",
    visitorName: "Rohit Deshmukh",
    visitorPhone: "+91 98200 44123",
    visitorEmail: "rohit.deshmukh@example.com",
    fortName: "Raigad Fort",
    tourDate: "15 Nov 2026",
    groupSize: 5,
    status: "Confirmed",
    meetingPoint: "Pachad Base Ropeway Office",
    specialRequirements: "Senior citizen assistance for Nagarkhana steps. Focused on Shivaji Maharaj coronation history.",
    amountPaid: "₹1,200",
    bookingAmount: 1200,
    createdAt: "2026-11-10T10:00:00Z"
  },
  {
    id: "BK-8802",
    guideId: "gd-01",
    guideName: "Vikram Pawar (Mavala Heritage Guild)",
    visitorName: "Pune College Trekking Club (Dr. Kulkarni)",
    visitorPhone: "+91 94220 99812",
    visitorEmail: "kulkarni@pune.edu",
    fortName: "Rajgad Fort",
    tourDate: "21 Nov 2026",
    groupSize: 12,
    status: "Pending",
    meetingPoint: "Gunjawane Base Village",
    specialRequirements: "Sunrise trek to Suvela Machi and Bale Killa ridge study.",
    amountPaid: "₹1,800",
    bookingAmount: 1800,
    createdAt: "2026-11-12T14:30:00Z"
  },
  {
    id: "BK-8803",
    guideId: "gd-01",
    guideName: "Vikram Pawar (Mavala Heritage Guild)",
    visitorName: "Priya Nair (Heritage Documentary Crew)",
    visitorPhone: "+91 98920 33411",
    visitorEmail: "priya@nairfilms.in",
    fortName: "Raigad Fort",
    tourDate: "29 Nov 2026",
    groupSize: 3,
    status: "Pending",
    meetingPoint: "Pachad Village Office",
    specialRequirements: "Assistance with audio equipment and early morning fog filming permissions.",
    amountPaid: "₹1,500",
    bookingAmount: 1500,
    createdAt: "2026-11-14T09:15:00Z"
  }
];

const STORAGE_KEY = 'mhe_tour_bookings';

export function getBookings(): TourBooking[] {
  if (typeof window === 'undefined') return INITIAL_BOOKINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read bookings from storage', err);
    return INITIAL_BOOKINGS;
  }
}

export function saveBooking(booking: Omit<TourBooking, 'id' | 'createdAt'>): TourBooking {
  const existing = getBookings();
  const nextId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking: TourBooking = {
    ...booking,
    id: nextId,
    createdAt: new Date().toISOString()
  };

  const updated = [newBooking, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event so listeners know bookings changed
    window.dispatchEvent(new Event('mhe_bookings_updated'));
  } catch (err) {
    console.error('Failed to save booking', err);
  }

  return newBooking;
}

export function updateBookingStatus(id: string, status: TourBooking['status']): void {
  const existing = getBookings();
  const updated = existing.map(b => b.id === id ? { ...b, status } : b);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('mhe_bookings_updated'));
  } catch (err) {
    console.error('Failed to update booking status', err);
  }
}

export function cancelBooking(id: string): void {
  const existing = getBookings();
  const updated = existing.filter(b => b.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('mhe_bookings_updated'));
  } catch (err) {
    console.error('Failed to cancel booking', err);
  }
}

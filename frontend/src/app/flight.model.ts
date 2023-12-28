export interface Flight {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate?: string;
  departureTime: string;
  returnTime?: string;
  departureCity: string;
  arrivalCity: string;
  airline: string;
  price: number;
  duration: number;
}

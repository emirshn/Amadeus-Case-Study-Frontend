import { Injectable } from '@angular/core';
import { Observable, filter, of } from 'rxjs';
import { Flight } from './flight.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private mockFlights: Flight[] = [];
  private apiCallMade = false;

  constructor(private apiService: ApiService) {}
  loadFlights() {
    this.apiService.getFlights().subscribe(
      (flightsData) => {
        if (
          flightsData &&
          flightsData.flights &&
          flightsData.flights.length > 0
        ) {
          console.log('Flights data received:', flightsData);
          this.mockFlights = flightsData.flights.map((flightData: any) => {
            const flight: Flight = {
              departureAirport: flightData.departureAirport,
              arrivalAirport: flightData.arrivalAirport,
              departureDate: flightData.departureDate,
              returnDate: flightData.returnDate,
              departureTime: flightData.departureTime,
              returnTime: flightData.returnTime,
              departureCity: flightData.departureCity,
              arrivalCity: flightData.arrivalCity,
              airline: flightData.airline,
              price: flightData.price,
              duration: flightData.duration,
            };
            return flight;
          });
          console.log('Parsed flights:', this.mockFlights);
          this.apiCallMade = true;
        } else {
          console.error(
            'Error: Empty or invalid flights data received from the server.'
          );
        }
      },
      (error) => {
        console.error('Error loading flights from the API:', error);
      }
    );
  }

  searchFlights(criteria: any): Observable<Flight[]> {
    console.log(criteria);

    if (!this.apiCallMade) {
      this.loadFlights();
    }

    const filteredFlights = this.mockFlights.filter((flight) => {
      const isDepartureMatch =
        flight.departureAirport
          .toLowerCase()
          .includes(criteria.departureAirport?.toLowerCase() || '') ||
        !criteria.departureAirport;

      const isArrivalMatch =
        flight.arrivalAirport
          .toLowerCase()
          .includes(criteria.arrivalAirport?.toLowerCase() || '') ||
        !criteria.arrivalAirport;

      const isOneWayMatch =
        (criteria.oneWay && !flight.returnDate) ||
        (!criteria.oneWay && flight.returnDate);

      const isDepartureDateMatch =
        !criteria.departureDate ||
        flight.departureDate === criteria.departureDate;

      const isReturnDateMatch =
        !criteria.oneWay ||
        !criteria.returnDate ||
        flight.returnDate === criteria.returnDate;

      return (
        isDepartureMatch &&
        isArrivalMatch &&
        isOneWayMatch &&
        isDepartureDateMatch &&
        isReturnDateMatch
      );
    });

    console.log(filteredFlights);
    return of(filteredFlights);
  }
}

/*  private mockFlights: Flight[] = [
    {
      departureAirport: 'Airport 1',
      arrivalAirport: 'Airport 2',
      departureDate: '2023-01-01',
      returnDate: '2023-01-02',
      departureTime: '10.00',
      returnTime: '22.00',
      departureCity: 'City 1',
      arrivalCity: 'City 2',
      airline: 'Turkish Airlines',
      price: 200,
      duration: 5,
    },
    {
      departureAirport: 'Airport 1',
      arrivalAirport: 'Airport 2',
      departureDate: '2023-01-01',
      returnDate: '2023-01-02',
      departureTime: '11.00',
      returnTime: '19.00',
      departureCity: 'City 1',
      arrivalCity: 'City 2',
      airline: 'America Airlines',
      price: 500,
      duration: 3,
    },
    {
      departureAirport: 'Airport 1',
      arrivalAirport: 'Airport 4',
      departureDate: '2023-01-03',
      returnDate: '2023-01-04',
      departureTime: '01.00',
      returnTime: '11.00',
      departureCity: 'City 1',
      arrivalCity: 'City 3',
      airline: 'America Airlines',
      price: 250,
      duration: 7,
    },
    {
      departureAirport: 'Airport 5',
      arrivalAirport: 'Airport 6',
      departureDate: '2023-01-05',
      returnDate: '2023-01-06',
      departureTime: '12.00',
      returnTime: '02.00',
      departureCity: 'City 3',
      arrivalCity: 'City 4',
      airline: 'Turkish Airlines',
      price: 300,
      duration: 12,
    },
    {
      departureAirport: 'Airport 7',
      arrivalAirport: 'Airport 8',
      departureDate: '2023-01-07',
      departureTime: '07.00',
      departureCity: 'City 2',
      arrivalCity: 'City 3',
      airline: 'Airline X',
      price: 220,
      duration: 2,
    },
    {
      departureAirport: 'Airport 9',
      arrivalAirport: 'Airport 10',
      departureDate: '2023-01-09',
      departureTime: '02.00',
      departureCity: 'City 1',
      arrivalCity: 'City 4',
      airline: 'King Airlines',
      price: 280,
      duration: 10,
    },
  ];
*/

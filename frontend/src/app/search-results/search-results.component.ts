import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  searchForm: FormGroup;
  loading: boolean = false;
  flights: any[] = [];

  departureAirport: string = '';
  arrivalAirport: string = '';
  departureDate: string = '';
  returnDate: string = '';
  oneWay: boolean = true;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.searchForm = this.fb.group({
      departureAirport: [''],
      arrivalAirport: [''],
      departureDate: [''],
      returnDate: [''],
      oneWay: [false],
    });
  }

  ngOnInit(): void {
    this.flightService.loadFlights();

    const airportsFilled = () => {
      const departureAirport = this.searchForm.get('departureAirport')!.value;
      const arrivalAirport = this.searchForm.get('arrivalAirport')!.value;
      return (
        departureAirport !== null &&
        arrivalAirport !== null &&
        departureAirport !== '' &&
        arrivalAirport !== ''
      );
    };

    if (airportsFilled()) {
      this.searchForm.valueChanges.subscribe(() => {
        this.searchFlights();
      });
    }

    this.searchForm.valueChanges.subscribe(() => {
      if (airportsFilled()) {
        this.searchFlights();
      }
    });
  }

  async searchFlights(): Promise<void> {
    if (!this.searchForm.valid) {
      console.log('error');
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const searchCriteria = this.searchForm.value;
    (await this.flightService.searchFlights(searchCriteria))
      .pipe(delay(1000))
      .subscribe(
        (data) => {
          this.flights = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching flights in component', error);
          this.loading = false;
        }
      );
  }

  sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  getSortSymbol(column: string): string {
    if (this.sortDirection[column] === 'asc') {
      return ' ▲';
    } else if (this.sortDirection[column] === 'desc') {
      return ' ▼';
    } else {
      return ' ▼';
    }
  }

  sort(key: string): void {
    const direction = this.sortDirection[key] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [key]: direction };
    this.flights.sort((a: any, b: any) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction === 'asc' ? comparison : -comparison;
      } else {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
  }
}

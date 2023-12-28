from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
]

@app.get("/flights", response_model=dict)
def get_flights():
    flights_data = {
        "flights": [
            {
                "departureAirport": "Airport 1",
                "arrivalAirport": "Airport 2",
                "departureDate": "2023-01-01",
                "returnDate": "2023-01-02",
                "departureTime": "10.00",
                "returnTime": "22.00",
                "departureCity": "City 1",
                "arrivalCity": "City 2",
                "airline": "Turkish Airlines",
                "price": 200,
                "duration": 5,
            },
            {
                "departureAirport": "Airport 1",
                "arrivalAirport": "Airport 2",
                "departureDate": "2023-01-01",
                "returnDate": "2023-01-02",
                "departureTime": "11.00",
                "returnTime": "19.00",
                "departureCity": "City 1",
                "arrivalCity": "City 2",
                "airline": "America Airlines",
                "price": 500,
                "duration": 3,
            },
            {
                "departureAirport": "Airport 1",
                "arrivalAirport": "Airport 4",
                "departureDate": "2023-01-03",
                "returnDate": "2023-01-04",
                "departureTime": "01.00",
                "returnTime": "11.00",
                "departureCity": "City 1",
                "arrivalCity": "City 3",
                "airline": "America Airlines",
                "price": 250,
                "duration": 7,
            },
            {
                "departureAirport": "Airport 5",
                "arrivalAirport": "Airport 6",
                "departureDate": "2023-01-05",
                "returnDate": "2023-01-06",
                "departureTime": "12.00",
                "returnTime": "02.00",
                "departureCity": "City 3",
                "arrivalCity": "City 4",
                "airline": "Turkish Airlines",
                "price": 300,
                "duration": 12,
            },
            {
                "departureAirport": "Airport 7",
                "arrivalAirport": "Airport 8",
                "departureDate": "2023-01-07",
                "departureTime": "07.00",
                "departureCity": "City 2",
                "arrivalCity": "City 3",
                "airline": "Airline X",
                "price": 220,
                "duration": 2,
            },
            {
                "departureAirport": "Airport 9",
                "arrivalAirport": "Airport 10",
                "departureDate": "2023-01-09",
                "departureTime": "02.00",
                "departureCity": "City 1",
                "arrivalCity": "City 4",
                "airline": "King Airlines",
                "price": 280,
                "duration": 10,
            },
        ]
    }
    return flights_data

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

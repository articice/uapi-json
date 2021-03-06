# Air :airplane:

The Air workflow allows you to do what most travel agents did in the past and what many search engines still do today: book a trip for a customer. Air service provides:

* Air Shop: Search for flight options by lowest fare (LowFareSearch(Asynch)Req) or availability (AirAvailability).
* Air Price: Price the selected flights and request additional information about rules, flight details, and seating.
* Air Book: Book the flights when you are satisfied with the times, price, and rules.

# API

* **AirService**
    * [.search(params)](#search) ⇒ <code>Promise</code>
    * .book(params) ⇒ <code>Promise</code>
    * .ticket(params) ⇒ <code>Promise</code>
    * .void(params) ⇒ <code>Promise</code>
    
<a name="search"></a>
### .search(params)
Low Fare Shop functionality combines air availability and a fare quote request to return the lowest available fares for a specified itinerary, using origin/destination and date information. Fares are available for one-way, round-trip, and multi-city travel. Low Fare Shop does not require a booked itinerary to return fare data.

**Returns**: <code>Promise</code>   
**See**: [Low Fare Shopping Model](https://support.travelport.com/webhelp/uapi/uAPI.htm#Air/Air_Models/Low_Fare_Shopping_Model.htm%3FTocPath%3DAir%7CAir%2520Shopping%2520and%2520Booking%7CLow%2520Fare%2520Shopping%7C_____1)   


| Param | Type | Description |
| --- | --- | --- |
| legs | <code>Array\<Leg\></code> | See `Leg` description [below](#leg). |
| passengers | <code>Passenger</code> | See `Passenger` description [below](#passenger). |

<a name="leg"></a>
#### Leg object

Each leg represents one part of journey. For example IEV-PAR-IEV should have 2 legs: IEV-PAR and PAR-IEV.

| Param | Type | Description |
| --- | --- | --- |
| from | <code>String</code> | IATA code. |
| to | <code>String</code> | IATA code. |
| departureDate | <code>String</code> | Date in format `YYYY-MM-DD`. |

<a name="passenger"></a>
#### Passenger object

| Param | Type | Description |
| --- | --- | --- |
| ADT | <code>Number</code> | Adults count. |
| INF | <code>Number</code> | Infants count ( < 2 years ) . |
| CNN | <code>Number</code> | Children count ( < 12 years ). |


# Code challenge
Data:
Example of a trade data JSON object:
{
    "id": 1,
    "eventType": "click",
    "user": 1,
    "date": "2020-08-29T08:48:48.737Z"
}
The task is to implement the REST service that exposes the /analytics endpoint, which allows for ingesting and querying the collection of event records in the following way:
- POST request to /analytics:
    - creates a set of events serially
    - expects a JSON array containing a series of user events without the id and the date properties as the body payload. Each object in the JSON array must be validated before saving based on the below-mentioned criteria.
    - each list of the events can contain duplicate entries for a user and the event type. Every event object in the list should fulfil the following criteria in order to be saved into the system to avoid duplicates:
    - a user can have only one 'click' event type in a 3-second window. All other 'click' events for the same user in the window should be discarded.
    - a user can have only one 'pageView' event type in a 5-second window. All other 'pageView' events for the same user in the window should be discarded.
    - adds the given event object to the collection of events and assigns a unique integer id to it. The first created event must have id as 1, the second one has id as 2, and so on.
    - adds the date property equal to the current system date to each saved object.
    - the response code is 201, and the response body is a JSON containing the total number of events that were successfully ingested. Sample is:
text
    {"ingested" : 4}
- GET request to /analytics:
    - return a collection of all events
    - the response code is 200, and the response body is an array of all events in any sort of order

### PROMPT 2
Data:
Example of a reminder data JSON object:
{
    "id": 2,
    "user": 1,
    "description": "Drink Coffee",
    "date": "2020-08-24T07:28:24.000Z"
}
The task is to implement the REST service that exposes the /reminders endpoint, which allows for managing the collection of reminder records in the following way:
- POST request to /reminders:
    - creates a new reminder
    - expects a JSON reminder object without the id property as the body payload. You can assume that the given object is always valid.
    - adds the given reminder object to the collection of reminders and assigns a unique integer id to it. The first created reminder must have id 1, the second one 2, and so on.
    - the response code is 201, and the response body is the created reminder object
- GET request to /reminders:
    - return a collection of all reminders
    - the response code is 200, and the response body is an array of all reminders objects ordered by their ids in increasing order
 - optionally accepts query parameters user and after, for example /reminders?user=1&after=1598448504000. All these parameters are optional. In case they are present, only objects matching the parameters must be returned.
    - The query param `after` accepts the time in milliseconds(Epoch) and can be used to find all the reminders that have the date property value after the queried time.
    - HINT: Query for date in Sequelize can be done using the `Op.gte` operator. It accepts the date as an epoch integer, JS Date object or ISODate String.


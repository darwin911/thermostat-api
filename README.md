# Smart Thermostat

## User Verification

- User needs a code to sign-up/join (This can be a hard coded arbitrary string “1234567”)
- User completes sign up with email and password

## Functions
- Set setpoint temperature
- Set heating, cooling, off, or auto
- Display room temperature
- Display status (Heating, Cooling, Idle)

## API

- One API endpoint to adjust temperature.
- Auth via token (again, can be hardcoded string)
- Temperature adjustment should be reflected on the front end.
- Spec Sheet (NOT A SHOLE SHEET) for the endpoint and how a user can interact with it.

## Setup and Usage

- git clone https://github.com/darwin911/thermostat-api
- create a database `thermostat`
- in root directory `npm i`, `node server` or `npm run dev` (development)
- navigate to client directory `cd client`
- run `npm i` and `npm start`

- Register with verification code : `ilovebikes`
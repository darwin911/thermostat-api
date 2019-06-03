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

- `https://smart-thermostat.herokuapp.com/users/:user_id/thermostat/`

## **Smart Thermostat API**

- **URL**

  /users/:user_id/thermostat/

- **Method:**

  `GET` | `POST`

- **URL Params**

  `:user_id`

- **Data Params**

  ```
  {
    temperature: req.body.temp,
    heating: req.body.isHeating,
    cooling: req.body.isCooling,
    idle: req.body.isIdle,
    on: req.body.isOn
  }
  ```

- **Sample Call:**

  ```
  POST /users/1/thermostat

    data {
      userId: 1,
      temp: 78
      };
  ```

  returns

  ```
    thermostat: {
      cooling: true
      createdAt: "2019-06-03T00:35:58.821Z"
      heating: false
      id: 1
      idle: false
      on: true
      temperature: 78
      updatedAt: "2019-06-03T20:34:50.250Z"
      userId: 1
    }
  ```

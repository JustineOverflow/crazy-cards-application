# Crazy Cards Application

By entering their details, the customers can review the credit cards they are eligible for. 

## App Demo

Please click on the following link to access the demo video of the crazy cards app: 
https://drive.google.com/file/d/1RLNkcDev5MZC_4AB4aOOIHgFtd3HJ0_n/view?usp=sharing

## Approach overview

### Algorithm

The server needs to send back to the client a list of eligible cards matching the user profile. It also needs to send the details of the requested card. For this, I use a Hashmap storing all the necessary information (requirements and details per card). It makes it really efficient for the algorithm to check the requirements, and find the card details, thanks to the HashMap lookup complexity time of O(1).

With the function 'filterEligibleCard', I filter the cards by comparing their requirements in terms of income and employment with the user input. 

### Testing

I implemented testing on both backend and frontend, to verifies these following points: 

- (Backend) When API called, the algorithm returns the list of eligible cards
- (Backend) When API called, the algorithm returns the details of the card
- (Backend) Data validation (for example, if the user forgets to fill in his employment status)
- (Frontend) When submit button is clicked, it retrieves the eligible cards
- (Frontend) When submit button is clicked but information is missing, it returns an error

### Technologies 

#### Frontend

- React
- Sass: I used SASS as CSS preprocessor, to have a code more structured, less repeated and easier to write/read.
(Responsive web design)

#### Backend

- Node
- NestJS: I used NestJS which is a popular framework built on top of ExpressJs/NodeJs, and uses Typescript. 

## Set-up and installation

Please use the following commands to install and run the project:

To run the backend:

```
cd ./backend
npm install
npm run start:dev
```

To run the frontend:

```
cd ../frontend
npm install
npm start
```

## Versions

- Node: 13.12.0
- React: 16.13.1
- Nest: 7.5.1

## Thank you
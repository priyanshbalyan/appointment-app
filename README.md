# Bariendo Assessment

Install dependencies with

`yarn install-deps`

(You need to have atleast yarn v1.22.19 and NodeJS v20.5.0 installed for the commands to run, can modify them to support npm)

Run production build

`yarn prod`

Access the app at `http://localhost:3000`

# Run app in dev mode

To run app in dev mode,

1. Run `yarn backend:dev`
2. Open new terminal and run `yarn client:dev`
3. Access backend api Swagger at `http://localhost:3000/api`
4. Access client at `http://localhost:3000`

# Tech Stack:

- NestJS for backend - First time working with NestJS
- React for Frontend
- Prisma SQLite for database
- React lazy loading
- Redux Toolkit for state management and RTK query for API fetch
- Password Hashing with bcrypt
- JWT tokens for login tokens
- Typescript, Prettier and ESLint

# App specific features:

- Show loader when a route is loading
- Show error toast and redirect back to login when user tries to access protected route
- Redirect user to appointment page after user creates a slot and update list
- Max 24 slots at a time can be selected by user
- Disable slots already been booked for a doctor by same or different user
- Fetch booked slots for a user and group them by date
- Don't show Sunday date in date selection component
- Can book slots from 8:00 AM to 4:00 PM
- Hide dates before today in date selector and only show slots from next hour from now in time selector
- Error page on accessing unknown route

# Requirements Checklist

1. Register / Login - Done
   Email and Password - Done

2. Choose a free slot date and time - Done
   1 slot is equal to 1 hour - Done
   A user can choose more than 1 slot a day (Maximum is 24 slots) - Done
   A user cannot choose any slot that is already reserved - Done

3. Show a list of daily reserved slot - Done
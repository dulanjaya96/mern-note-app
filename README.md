--Backend--

This is a note web application with both frontend and backend functionality. Users can create, edit, and delete notes. I used Express.js and MongoDB for the backend, and tested API requests using Postman. Additionally, I used Redis as middleware to implement rate limiting for API requests over a specified time period.

Backend tools and libraries used: Express.js | MongoDB | Mongoose | Upstash/Redis | Upstash/Ratelimit | Postman | Dotenv | nodemon

--Frontend--

For the frontend of this note web application, I used React.js to build a responsive and dynamic user interface. React Router was implemented for seamless page navigation, while React Hot Toast provides user-friendly notifications. Styling is handled using Tailwind CSS 4.0 along with DaisyUI for prebuilt components, and Lucide React for clean, modern icons.

Axios is used for making HTTP requests to the backend API. For example, instead of using the native fetch method, I can write: const response = await axios.get('http://localhost:5001/api/notes');

This simplifies data fetching and improves readability.

CORS is configured to enable smooth communication between the frontend and backend without cross-origin issues.

Frontend tools and libraries used: React.js | React Router | React Hot Toast | Tailwind CSS 4.0 | DaisyUI | Lucide React | Axios | CORS

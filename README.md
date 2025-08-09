--Backend-- 

This is YouTube channel "Codesistency" MERN stack course (https://www.youtube.com/watch?v=Ea9rrRj9e0Y&ab_channel=Codesistency) special thanks to him. 

Apart from the course I added complete user authentication for the application. 

I created a user model and added a user reference for the note model. 

created userControllers, userRoutes, authMiddleware. updated userRoutes to use authentication. 

updated userControllers to handle user-specific notes.

This is a note web application with both frontend and backend functionality. Users can create, edit, and delete notes. I used Express.js and MongoDB for the backend, and tested API requests using Postman. Additionally, I used Redis as middleware to implement rate limiting for API requests over a specified time period. Backend tools and libraries used: Express.js | MongoDB | Mongoose | Upstash/Redis | Upstash/Ratelimit | Postman | Dotenv | nodemon | jsonwebtoken | bcryptjs

--Frontend--

For the frontend of this note web application, I used React.js to build a responsive and dynamic user interface. React Router was implemented for seamless page navigation, while React Hot Toast provides user-friendly notifications. Styling is handled using Tailwind CSS 4.0 along with DaisyUI for prebuilt components, and Lucide React for clean, modern icons. Axios is used for making HTTP requests to the backend API. For example, instead of using the native fetch method, I can write: const response = await axios.get('http://localhost:5001/api/notes'); This simplifies data fetching and improves readability. CORS is configured to enable smooth communication between the frontend and backend without cross-origin issues.

Apart from the course I created login, signup pages. 

Updated axios configuration to include auth headers. 

Updated HomePage component to handle authentication. 

Updated App.jsx to get user props for NoteDetails and CreateNote pages, then updated those pages to handle with user login and without user login. 

similarly, updated NavBar to handle with and without user login.

Frontend tools and libraries used: React.js | React Router | React Hot Toast | Tailwind CSS 4.0 | DaisyUI | Lucide React | Axios | CORS

🔗 Web Application: https://mern-note-app-utkv.onrender.com (Please allow up to 1 minute for the site to load, as it's hosted on Render.com's free tier.)

🧪 Test Credentials:

Username: hapuarachchi@gmail.com

Password: hapuarachchi123

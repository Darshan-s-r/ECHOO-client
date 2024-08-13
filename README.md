ECHOO - A Safe and Positive Social Media Platform
Overview
ECHOO is a social media platform designed to reduce online violence and promote socially positive content. It allows users to log in with their Google account, view and interact with posts, follow other users, and share content. The standout feature of ECHOO is its AI-driven content moderation system that detects inappropriate content before it is posted, ensuring a safe and respectful environment.

Features
User Authentication: Login with Google account.
Posting & Interaction: Create posts, like, comment, and follow users.
Content Moderation: AI-based inappropriate content detection using '@tensorflow-models/toxicity'.
Image Upload: Share images with posts.

Motivation
The motivation behind ECHOO is to create a platform where users can freely express themselves while maintaining a respectful and positive community. The AI model aims to prevent the spread of harmful content, promoting social good.

Tech Stack
Frontend: Next.js
Backend: Node.js, Express.js  (link: https://github.com/Darshan-s-r/ECHOO-server)
Database: MongoDB
AI Model: '@tensorflow-models/toxicity'

Setup Instructions
Clone the repository:
bash
Copy code
git clone https://github.com/Darshan-s-r/ECHOO-client.git
Install dependencies:
bash
Copy code
cd ECHOOsocial
npm install
Set up environment variables:
Create a .env file in the root directory and add the following:
makefile
Copy code
MONGO_URI=your_mongo_db_uri  (for Backend code)
JWT_SECRET=your_jwt_secret  (for Backend code)
GOOGLE_CLIENT_ID=your_google_client_id
Run the application:
bash
Copy code
npm run dev
Access the application:
Open http://localhost:3000 in your browser.

Usage
Once the application is running, users can:
Sign in using their Google account.
View, like, and comment on posts.
Create new posts with text and images.
Follow and interact with other users.
Enjoy a safe and positive environment thanks to the AI content moderation.

Contributing
Contributions are welcome! Please fork the repository and create a pull request for any feature additions, bug fixes, or improvements.

Contact
For any questions or support, feel free to reach out to me via darshanrangegowda19@gmail.com.
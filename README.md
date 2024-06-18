Make sure you have Node.js and npm installed on your machine.

Steps:
1. Open terminal (Terminal -> New Terminal)
2. type "cd server"
3. type "npm i"
4. type "npm run dev"

5. Open a new terminal (while keeping the first one open) and make sure you are in root directory
6. type "cd client"
7. type "npm i"
8. type "npm run dev"
9. open the link provided

!!! Make sure you fill out the .env in the SERVER folder with these variables !!!

PORT
DATABASE_URL
SECRET_KEY
ADMIN_USERNAME
ADMIN_PASSWORD
JWT_SECRET
CORS_ORIGIN= (the link you get from step 8)

In the CLIENT folder, fill this variable
VITE_API_BASE_URL= (the link from step 4)

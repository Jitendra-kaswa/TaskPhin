## Depoyed servies access links
1. Backend - [Backend](https://taskphin-ew16.onrender.com)
2. Frontend - [Frontend](https://creative-rugelach-f8b4a6.netlify.app/)

# Directory structure
1. `/backend` -> base directory for backend service
2. `/frontend` -> base directory for frontend service


# Deployment Process on Render, Netlify, and Supabase

This guide outlines the deployment process for your backend and frontend applications on Render and Netlify, as well as setting up your database on Supabase.

## Backend Deployment on Render:

1. **Create an Account on Render**: Sign up for an account on [Render](https://render.com/).

2. **Create a New Web Service**: Click on "New" and select "Web Service" as the deployment type.

3. **Choose Deployment Source**: Choose "GitHub" as the deployment source and paste your GitHub repository's URL.

4. **Configure Deployment**: Specify the deployment configuration, including the git branch name, directory name, installation command, run command, and server type.

5. **Environment Variables**: Set any necessary environment variables required for your backend application. (Add DB_URL)

6. **Create Web Service**: Click on "Create Web Service" to deploy your backend application. Once deployed, you can access it via the provided URL.

## Frontend Deployment on Netlify:

1. **Create an Account on Netlify**: Sign up for an account on [Netlify](https://www.netlify.com/).

2. **Build Your Frontend**: Ensure you have a build folder for your frontend application by running `npm install` and then `npm run build`.

3. **Deploy to Netlify**: Drag and drop your build folder onto the Netlify sites dashboard. Netlify will automatically deploy your frontend application and provide a URL for access.

## Database Deployment on Supabase:

1. **Create an Account on Supabase**: Sign up for an account on [Supabase](https://supabase.io/).

2. **Create a Database**: Once logged in, create a new database on Supabase. Follow the prompts to set up your database configuration.

3. **Configure Database**: Configure your database settings and set up any necessary tables and schemas required for your application.

4. **Access Database**: Once your database is set up, you can access it via the Supabase dashboard and connect it to your backend application as needed.

## Conclusion:

By following these steps, you can successfully deploy your backend and frontend applications on Render and Netlify, respectively, while also setting up your database on Supabase. This deployment process ensures that your applications are hosted securely and are accessible to users over the internet.


# Local Environment Setup

This guide outlines the steps to set up the local development environment for both the backend and frontend applications.

## Backend Setup:

1. **Start a PostgreSQL Server on Supabase**: Ensure you have a PostgreSQL server running on Supabase. You can sign up for a free account on [Supabase](https://supabase.io/) and create a PostgreSQL database.

2. **Configure Environment Variables**:
   - Add `DB_URL` and `PORT` to the `/backend/.env` file. Set `DB_URL` to the URL of your PostgreSQL database on Supabase and specify the desired port number.

3. **Install Dependencies**: Navigate to the `/backend` folder and run the following command to install dependencies:
   ```bash
   npm install ```
4. **Run the Backend Server: Once the installation is complete, start the backend server by running: ```bash node src/server.js```

##Frontend Setup:
1. ** Environment Configuration:

    - Add BASE_URL to the .env file located in the /frontend folder. Set BASE_URL to the URL of your backend service.

2. ** Install Dependencies: Navigate to the /frontend folder and run the following command to install dependencies:
```bash npm install ```

3. ** Start the Frontend Server: After installing dependencies, start the frontend server by running:
```bash npm run start```

## Additional Notes:

   - Make sure to replace placeholders such as DB_URL, PORT, and BASE_URL with your actual values.
   - Ensure that the PostgreSQL server is properly configured and accessible from your local environment.
    - Verify that the frontend application can communicate with the backend server by checking the network requests in the browser developer tools.

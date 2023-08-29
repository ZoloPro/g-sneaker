# g-sneaker

## Installation
1. Run `composer install` to install dependencies.
2. Open the "backend" folder and create a file named `.env`. Copy the contents of the `.env.example` file into this new file.
3. Configure the database settings as follows:
    | Key | Value |
    | ------ | ------ |
    | DB-HOST | Database host (e.g. [http://localhost](http://localhost)) |
    | DB_PORT | Database port (e.g. `3306`) |
    | DB_DATABASE | Database name (e.g. `g-seaker`)  |
    | DB_USERNAME | Database username (e.g `root`) |
    | DB_PASSWORD | Database password (can empty) |
4. Open terminal run below command to create essential tables.
    ```php
    php artisan migrate 
    ```
5. Populate the database with available records by running:
    ```php
    php artisan db:seed ProductSeeder 
    ```
6. Start the backend server:
    ```php
    php artisan serve 
    ```
    The backend will run at [http://localhost:8000](http://localhost:8000).
7. Navigate to the "frontend" folder.
8. In the terminal, install the required dependencies:
    ```npm
    npm install
    ```
9. Create a .env file in the frontend folder and define the following environment variable:
    | Key | Value |
    | ----- | -----|
    | VITE_API_ENDPOINT | {your backend domain}/api (e.g. [http://localhost:8000/api](http://localhost:8000/api))  |
10. Run the following command to start the web application:
    ```npm
    npm run dev
    ```
    The web application will be accessible at [http://localhost:5173/](http://localhost:5173/).

## Oline Demo
Explore an online demo of the application: [https://g-sneaker-three.vercel.app/](https://g-sneaker-three.vercel.app/).
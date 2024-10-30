# PointingPoker Dashboard with Django & React (Cheat The Vote)
## This project is created for fun only
This project integrates **PointingPoker API** with **Django** as the backend and **ReactJS** as the frontend. It continuously fetches and displays API data related to user votes and statistics, while allowing users to submit feedback through a form. The project is deployable using **ngrok** and stores feedback in a local **MySQL** database.

## Features

1. **PointingPoker API Access**: 
   - Fetches data from the PointingPoker API using Django.
   - Filters and processes the data before displaying it.

2. **Real-time UI Updates**:
   - Data such as user name, user ID, votes, points statistics and feedback are displayed on the React frontend.
   - The screen continuously fetches and updates data from the API.

3. **Feedback Form**:
   - Users can submit feedback, which is stored in a local MySQL database via Django.

4. **Deployable via ngrok**:
   - The application can be exposed to the internet using ngrok, allowing real-time interaction and feedback submission.

5. **Environment Variables**:
   - ENV variables are required for setting MySQL credentials, PointingPoker API URL and the backend (Django) URL for data fetching.

## Prerequisites

Make sure you have the following installed:
- **Python** (3.10 or latest)
- **Django** (latest version)
- **ReactJS** (latest version)
- **MySQL**
- **ngrok** (3.x or latest)
- **npm**

## Setup

### ngrok Setup

- Expose both the backend and frontend to the internet using ngrok:

   ```bash
   ngrok http 8000  # for Django backend <django_ngrok_url>
   ngrok http 3000  # for React frontend <react_ngrok_url> -> use to access site over internet
   ```
   or
   ```bash
   ngrok start --all   # use it if you've created ngrok.yaml
   ```
   
### Backend (Django)

1. Clone the repository:

   ```bash
   git clone https://github.com/LinUxTo5re/PointingCheater.git
   cd PointingCheater
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Apply migrations:

   ```bash
   python3 manage.py migrate
   ```

4. Start the Django server:

   ```bash
   export PP_API_KEY='<Pointingpoker_API_URL>' \
       PP_DB_NAME='<DB_Name>' \
       PP_DB_USER='<DB_User_Name>' \
       PP_DB_USER_PASSWORD='<DB_User_Password>' \
       && python3 manage.py runserver
   ```

### Frontend (React)

1. Navigate to the frontend directory:

   ```bash
   cd pointingcheaterui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   REACT_APP_DJANGO_API_URL='<django_ngrok_url>' npm start
   ```


## Usage

- The React UI will display user information, votes, and statistics fetched from the Django backend.
- Users can submit feedback through the form on the UI, which will be stored in the MySQL database.

## Tech Stack

- **Backend**: Django, MySQL
- **Frontend**: ReactJS
- **Deployment**: ngrok

## Screenshot (example)

1.  Home Page (trying to connect with server, server not start as of now)

   ![image](https://github.com/user-attachments/assets/240cafbc-1b40-49f7-878f-ea8b4c34d2de)

2.  Page contains user id, user name, votes, statistics, feedback form and many more

   ![image](https://github.com/user-attachments/assets/e0f05e08-9954-42f5-a8f2-f22a734e7cd1)



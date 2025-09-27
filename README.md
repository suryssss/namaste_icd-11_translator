Project Setup Guide

This project consists of two parts:

Frontend (available in this repository)

Backend (Python code, available in a separate repository) <br>
repo link:https://github.com/eswar-7116/namaste-icd-translator-prototype

The frontend runs on localhost:3000, and the backend runs on localhost:5000.

🚀 How to Run the Project
1. Clone the Repositories

Clone both the frontend and backend repositories:

# Clone the frontend (this repo)
'''git clone <frontend_repo_url>
cd <frontend_repo_folder>'''

# Clone the backend (Python repo)
git clone <backend_repo_url>
cd <backend_repo_folder>

2. Set Up Dependencies
Frontend (React/Next.js)
cd <frontend_repo_folder>
npm install

Backend (Python)

Make sure you have Python 3.9+ installed. Then, create a virtual environment and install requirements:

cd <backend_repo_folder>

# Create virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

3. Start the Applications
Start Backend
cd <backend_repo_folder>
python app.py


This will start the backend server on http://localhost:5000

Start Frontend
cd <frontend_repo_folder>
npm start


This will start the frontend on http://localhost:3000

4. Usage

Open the frontend in your browser: http://localhost:3000

Enter the name of the  input field.

The backend (running on localhost:5000) will process it and return the output code, which is displayed on the frontend.

📂 Tech Stack

Frontend:  Next.js

Backend: Python (Flask and Pandas)

⚠️ Notes

Ensure both frontend and backend are running simultaneously.

The frontend communicates with the backend via http://localhost:5000
.

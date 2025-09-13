# 🌤 Weather App with Oracle DB

A **responsive weather forecasting web application** that allows users to **search for any location** or use their **current location** to view detailed weather information. The app includes **user authentication (login/signup)**,light and dark mode, an **admin dashboard**, and weather details powered by a forecast API. Built with **Oracle Database (local host)** for storing user data.

![Project Banner](./assets/banner.png) <!-- Replace with your banner -->

---

## 📸 Preview  
| Dashboard | Forecast Page | Admin Panel |
|-----------|---------------|-------------|
| ![Dashboard](./assets/dashboard.png) | ![Forecast](./assets/forecast.png) | ![Admin](./assets/admin.png) |
<!-- Replace with actual screenshots -->

---

## ✨ Features  

### 🌦 **User Side**
- Search any location or use your **current location**  
- **24-hour weather forecast**  
- **7-day weather forecast**  
- Displays:
  - Temperature (High/Low)
  - Weather conditions (e.g., Haze, Rain)  
  - **Wind Speed**  
  - **UV Index**  
  - **Sunrise & Sunset Times**  
- Clean and **responsive dashboard** (mobile, tablet, desktop)  

### 👤 **Authentication**
- User **signup** and **login**  
- Data stored securely in **Oracle Database**  

### 🛠 **Admin Side**
- View **total registered users**  
- Search and sort users in any manner  
- Simple **user management dashboard**

---

## 🧰 Tech Stack  

| Category     | Technology            |
|---------------|---------------------|
| **Frontend**  | HTML5, CSS3, JavaScript (Responsive UI) |
| **Backend**   | Flask (Python)      |
| **Database**  | Oracle DB (Localhost) |
| **API**       | Forecast API (e.g., OpenWeather) |
| **Tools**     | Git, Ngrok (for testing), Oracle Client |

---

## 🚀 Installation & Setup  

### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/KrishModh/weather-app.git
cd weather-app
```

### 2️⃣ **Install dependencies**
Make sure Python and Oracle DB are installed locally.
```bash
pip install -r requirements.txt
```

### 3️⃣ **Configure Oracle Database**
- Create a local Oracle DB user and table for storing user data.  
- Update your credentials in `config.py`:  
```python
ORACLE_USER = "your_username"
ORACLE_PASSWORD = "your_password"
ORACLE_DSN = "localhost/your_service_name"
OPENWEATHER_API_KEY = "your_api_key"
```

### 4️⃣ **Run the application**
```bash
python app.py
```
Then open [http://localhost:5000](http://localhost:5000) in your browser.

---

## 🧭 Usage  
1. **Sign up** or **log in**.  
2. Search for your **city** or use **current location**.  
3. View **24-hour** and **7-day forecasts**, UV index, wind speed, and more.  
4. Admins can log in to **manage users**.

---

## 📂 Project Structure
```
weather-app/
│
├── static/             # CSS, JS, and images
├── templates/          # HTML templates
├── app.py              # Main Flask app
├── config.py           # Oracle DB and API config
├── requirements.txt    # Python dependencies
└── README.md           # Project documentation
```

---

## 🌐 Deployment  
Use **Ngrok** for local testing or deploy to services like **Render**, **Heroku**, or **AWS** for production.

---

## 🖼 Picture Section  
Add your project-related screenshots here:  
- **Login Page**  
- **User Dashboard**  
- **Forecast Page**  
- **Admin Panel**  

*(Replace placeholders with real screenshots before uploading to GitHub.)*

---

## 📊 Future Improvements  
- Add weather maps (e.g., precipitation, radar)  
- Push notifications for severe weather alerts  
- Multi-language support  

---

## 🤝 Contributing  
Pull requests are welcome! For significant changes, please open an issue first to discuss what you’d like to change.

---

## 💡 Acknowledgements  
- [OpenWeather API](https://openweathermap.org/) for forecast data  
- [Oracle](https://www.oracle.com/) for database hosting  
- Icons and illustrations from [Lucide](https://lucide.dev/) and [Undraw](https://undraw.co/)  

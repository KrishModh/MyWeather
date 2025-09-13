# 🌤 Weather App with Oracle DB

A **responsive weather forecasting web application** that allows users to **search for any location** or use their **current location** to view detailed weather information. The app includes **user authentication (login/signup)**,light and dark mode, an **admin dashboard**, and weather details powered by a forecast API. Built with **Oracle Database (local host)** for storing user data.
---

## 📸 Preview  
| Dashboard | Forecast Page | Admin Panel |
|-----------|---------------|-------------|
|<img width="2560" height="1440" alt="Screenshot (249)" src="https://github.com/user-attachments/assets/8e3d4912-fc3a-4836-b309-c74c851f358c" />
 |<img width="2560" height="1440" alt="Screenshot (251)" src="https://github.com/user-attachments/assets/4a68a276-c48e-4a1d-b5de-90394cc46bc3" />
 |<img width="2560" height="1440" alt="Screenshot (257)" src="https://github.com/user-attachments/assets/e34987c0-ee40-469b-9390-1941fb75574a" />

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
- <img width="2560" height="1440" alt="Screenshot (247)" src="https://github.com/user-attachments/assets/1b1c0afb-ff23-419d-bcd5-72fddb1d722c" />
- **User Dashboard**
-<img width="2560" height="1440" alt="Screenshot (249)" src="https://github.com/user-attachments/assets/1ac404bd-82c4-43d6-a3c4-c455c84d7576" />
- <img width="2560" height="1440" alt="Screenshot (250)" src="https://github.com/user-attachments/assets/37842620-d886-4185-afa9-be07675a38bc" />
- **Forecast Page**
- <img width="2560" height="1440" alt="Screenshot (251)" src="https://github.com/user-attachments/assets/4c583660-53f3-4572-94da-ab32a6e26c47" />
  <img width="2560" height="1440" alt="Screenshot (252)" src="https://github.com/user-attachments/assets/4de6a2fa-08a8-4cdb-a2cb-ff993269c7c8" />
- **Admin Panel**
- <img width="2560" height="1440" alt="Screenshot (257)" src="https://github.com/user-attachments/assets/65883d4b-360d-49cd-9d92-7cdda3585177" />
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

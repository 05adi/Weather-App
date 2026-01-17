# 🌤️ Weather App 

A responsive and dynamic web application that provides real-time weather updates using the **OpenWeatherMap API**. This project demonstrates the implementation of asynchronous programming, geolocation services, and modern CSS styling.

---

## 🚀 Features

* **Real-time Weather**: Fetches live data including temperature, humidity, wind speed, and cloud coverage.
* **Geolocation Support**: Automatically detects the user's current location to provide local weather updates upon granting access.
* **City Search**: Allows users to manually search for weather conditions in cities across the globe.
* **Session Persistence**: Utilizes `sessionStorage` to store user coordinates, optimizing performance by reducing unnecessary API calls.
* **Responsive UI**: Built with a "mobile-first" approach using Flexbox and CSS variables for a seamless experience on any device.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3
* **Scripting**: JavaScript
* **API**: [OpenWeatherMap API](https://openweathermap.org/api)
* **Fonts**: [Merriweather Sans](https://fonts.google.com/specimen/Merriweather+Sans)

---

## 📋 How It Works

1.  **Tab Switching**: The app features a custom tab system to toggle between "Your Weather" and "Search Weather" modes.
2.  **API Integration**: Uses the `fetch` API with `async/await` to handle asynchronous data retrieval from OpenWeatherMap.
3.  **Dynamic Rendering**: Updates the DOM in real-time with specific weather icons, country flags from **FlagCDN**, and localized data.
4.  **Error Handling**: Includes a dedicated error state to notify users of failed searches or location access issues.

---

## ⚙️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/weather-app.git](https://github.com/your-username/weather-app.git)
    ```
2.  **Add your API Key**:
    * Open `index.js`.
    * Replace `const API_KEY = "..."` with your own key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
3.  **Launch**:
    * Open `index.html` in your browser.

---

## 📂 Project Structure

```text
├── assets/             # Icons and images for weather parameters
├── index.html          # Semantic HTML structure with data attributes
├── style.css           # Custom CSS with variables and animations
├── index.js            # Logic for API calls, tabs, and DOM manipulation
└── README.md           # Project documentation

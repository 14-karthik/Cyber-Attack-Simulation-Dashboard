# Cyber-Attack-Simulation-Dashboard
CyberAttack Simulation Dashboard is a professional SOC platform with real-time threat monitoring, interactive world map, security logs, report generation, and role-based access control with 5 user roles (Admin, Analyst, Viewer, Responder, Auditor). Built with HTML5, CSS3, JavaScript, Bootstrap, Chart.js &amp; Leaflet.js.
## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Role-Based Access** | 5 distinct user roles with different permission levels |
| 📊 **Live Dashboard** | Real-time attack statistics with auto-refreshing charts |
| 📝 **Security Logs** | Comprehensive searchable logs with CSV export |
| 🗺️ **Threat Map** | Interactive global visualization of attack locations |
| 📄 **Report Generator** | Automated security reports with HTML export |
| ⚙️ **User Settings** | Persistent preferences using LocalStorage |
| 📖 **Mitigation Guide** | Complete attack prevention and response strategies |

## 👥 User Roles & Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| 👑 **Administrator** | `admin` | `admin123` | Full System Access |
| 🔍 **Security Analyst** | `analyst` | `analyst123` | Read + Export Reports |
| 👁️ **Viewer** | `viewer` | `viewer123` | Dashboard + Map Only |
| 🛡️ **Incident Responder** | `responder` | `responder123` | Response + Block IPs |
| 📋 **Auditor** | `auditor` | `auditor123` | Logs + Reports Only |

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure & markup |
| CSS3 | Custom styling, animations, variables |
| JavaScript ES6 | Core logic, ES6 classes, async operations |
| Bootstrap 5 | Responsive grid, components, utilities |
| Chart.js | Interactive line and pie charts |
| Leaflet.js | Interactive world map with markers |
| LocalStorage | User preferences & session persistence |
| SessionStorage | Authentication & role management |

## 📁 Project Structure
cyberattack-dashboard/
│
├── assets/
│ ├── icons/
│ ├── images/
│ └── sounds/
│
├── js/
│ ├── auth.js # Authentication & RBAC core
│ ├── login.js # Login page handler
│ ├── dashboard.js # Dashboard logic & charts
│ ├── logs.js # Logs viewer & CSV export
│ ├── reports.js # Reports generator
│ ├── settings.js # User preferences
│ ├── map.js # Threat map initialization
│ ├── sounds.js # Sound effects
│ └── script.js # Global utilities
│
├── index.html # Main Dashboard
├── login.html # Authentication page
├── logs.html # Security logs viewer
├── reports.html # Reports generator
├── threat-map.html # Global threat map
├── settings.html # User preferences
├── about.html # About & mitigation guide
└── style.css # Main stylesheet

text

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cyberattack-dashboard.git

# Navigate to project folder
cd cyberattack-dashboard

# Open login.html in your browser
open login.html      # macOS
start login.html     # Windows
xdg-open login.html  # Linux

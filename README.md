# Ashcol Airconditioning Corporation - Service Management System

A comprehensive web-based service management system for Ashcol Airconditioning Corporation, featuring a complete ticketing system, queue management, and customer portal.

## 🚀 Features

### Customer Features
- **Service Request Form** (`request.html`)
  - Submit service requests with detailed information
  - Automatic ticket number generation (ASH1001, ASH1002, etc.)
  - SMS/Email confirmation simulation
  - Multiple service types (Installation, Repair, Maintenance, etc.)
  - Urgency levels (Normal, High Priority, Emergency)

- **Queue Display** (`queue.html`)
  - Real-time queue viewing
  - Filter by status, service type, date
  - Search functionality
  - Auto-refresh every 30 seconds
  - Ticket status tracking

### Staff/Admin Features
- **Admin Dashboard** (`admin.html`)
  - Complete queue management
  - Mark tickets as "In Progress" or "Completed"
  - View detailed ticket information
  - Delete tickets
  - Real-time statistics
  - Advanced filtering and search

- **Authentication System** (`login.html`)
  - Staff and customer login portals
  - Role-based access control
  - Session management
  - Secure logout functionality

## 📋 System Flow

1. **Customer Access** → Customer visits the website
2. **Service Request** → Customer fills out the service request form
3. **Ticket Generation** → System generates unique ticket number (ASH + 4-digit number)
4. **Database Storage** → Ticket saved to localStorage (simulated database)
5. **Confirmation** → Customer receives ticket confirmation
6. **Queue Display** → Ticket appears in public queue
7. **Admin Management** → Staff can view and manage tickets
8. **Status Updates** → Real-time status changes

## 🔧 Technical Details

### Ticket Number Format
- **Format**: ASH + 4-digit random number
- **Examples**: ASH1001, ASH2345, ASH7890
- **Generation**: Random number between 1000-9999

### Database Fields
- Ticket ID (auto-generated)
- Customer Name
- Contact Number
- Email Address
- Service Type
- Preferred Date & Time
- Service Address
- Description
- Urgency Level
- Status (Pending, In Progress, Completed)
- Timestamp

### Authentication
- **Demo Staff Login**: admin / admin123
- **Demo Customer Login**: customer / customer123
- **Session Storage**: localStorage for demo purposes

## 📁 File Structure

```
Ashcol Project/
├── AshcolHome.html          # Main homepage
├── request.html             # Service request form
├── queue.html              # Public queue display
├── admin.html              # Admin dashboard
├── login.html              # Login portal
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── admin.js                # Admin functionality
├── employee.html           # Employee portal
├── employee.js             # Employee functionality
├── ash.JPG                 # Company logo
├── favicon.svg             # Favicon
├── abut.pdf                # About document
└── README.md               # This file
```

## 🚀 Getting Started

1. **Open the Website**: Open `AshcolHome.html` in a web browser
2. **Request Service**: Click "Request Service" to submit a new service request
3. **View Queue**: Click "Queue" to see all service requests
4. **Admin Access**: Click "Login" and use staff credentials to access admin panel

## 🔐 Login Credentials

### Staff Access
- **Username**: admin
- **Password**: admin123
- **Access**: Full admin dashboard with queue management

### Customer Access
- **Username**: customer
- **Password**: customer123
- **Access**: View queue and submit requests

## 📱 Features Overview

### Service Request Form
- ✅ Customer information collection
- ✅ Service type selection
- ✅ Date and time preferences
- ✅ Address and description fields
- ✅ Urgency level selection
- ✅ Automatic ticket generation
- ✅ Confirmation display

### Queue Management
- ✅ Real-time ticket display
- ✅ Status filtering (Pending, In Progress, Completed)
- ✅ Service type filtering
- ✅ Date filtering
- ✅ Search functionality
- ✅ Auto-refresh capability
- ✅ Mobile responsive design

### Admin Dashboard
- ✅ Complete ticket management
- ✅ Status updates (Mark as In Progress/Completed)
- ✅ Ticket deletion
- ✅ Detailed ticket viewing
- ✅ Statistics dashboard
- ✅ Advanced filtering
- ✅ Authentication protection

### Authentication System
- ✅ Role-based access control
- ✅ Session management
- ✅ Secure logout
- ✅ Demo credentials
- ✅ Automatic redirects

## 🔄 Real-Time Features

- **Auto-refresh**: Queue updates every 30 seconds
- **Live Statistics**: Real-time ticket counts
- **Status Updates**: Immediate status changes
- **Search & Filter**: Instant filtering results

## 📧 Notification System

The system simulates SMS and Email notifications:
- **Ticket Creation**: Customer receives confirmation
- **Status Updates**: Notifications when status changes
- **Completion**: Final completion notification

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Responsive**: Works on all device sizes
- **Brand Colors**: Ashcol green (#39B54A) theme
- **Icons**: Font Awesome integration
- **Typography**: Inter font family

## 🔮 Future Enhancements

- **Real Database**: Replace localStorage with actual database
- **SMS Integration**: Real SMS notifications
- **Email Integration**: Actual email sending
- **Payment Processing**: Online payment integration
- **Customer Accounts**: Customer registration system
- **File Uploads**: Photo/document attachments
- **Mobile App**: Native mobile application

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)
- **Storage**: localStorage (demo purposes)
- **Authentication**: Client-side session management

## 📞 Support

For technical support or questions about the system, please contact the development team.

---

**Ashcol Airconditioning Corporation** - "Keeping YOU Cool" since 2014 
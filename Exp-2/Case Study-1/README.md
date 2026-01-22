# Student Course Management Portal (SPA)

## Project Overview

A fully-featured Single Page Application (SPA) built with **Bootstrap** and **Material UI** for managing student course enrollments. This frontend-only application provides a responsive, modern user experience for students to browse courses, manage enrollments, and submit feedback.

## 🎯 Features

### 1. **Course Browsing**
- View all available courses with detailed information
- Display course code, title, instructor, description
- Show course schedule, credits, and capacity
- Display course ratings and student reviews
- Responsive card-based layout

### 2. **User Authentication**
- Login functionality (UI-based)
- Registration system (UI-based)
- Remember authentication state during session
- User profile information display
- Secure logout functionality

### 3. **Course Enrollment**
- Enroll in courses with availability checking
- Unenroll from previously enrolled courses
- View enrollment status in course cards
- Track total enrolled courses and credits
- Display available seats per course

### 4. **My Courses**
- View all enrolled courses in a table format
- Display course details for enrolled courses
- Show enrollment status (Active, Pending, Completed)
- Quick access to course details
- Statistics panel showing total courses and credits

### 5. **Course Feedback**
- Submit detailed feedback for enrolled courses
- Star-based rating system (1-5 stars)
- Text-based feedback comments
- View submitted feedback history
- Display feedback on course detail pages
- Track which students provided feedback

### 6. **Course Details**
- Comprehensive course information page
- Enrollment statistics and capacity details
- Instructor information
- Schedule and timing details
- Student reviews and ratings
- Enrollment action buttons
- Course prerequisites and requirements

## 📁 Project Structure

```
Case Study-1/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # Custom CSS styles
├── js/
│   ├── app.js                # Main application file
│   ├── router.js             # SPA routing and page rendering
│   ├── components.js         # Reusable component functions
│   └── state.js              # Application state management
├── README.md                 # This file
└── .gitignore               # Git ignore file
```

## 🛠️ Technologies Used

### Frontend Frameworks & Libraries
- **Bootstrap 5.3.0** - Responsive grid system and components
- **Material Design Icons** - Icon library from Google
- **jQuery 3.6.0** - DOM manipulation (optional)
- **HTML5** - Semantic markup
- **CSS3** - Custom styling and animations
- **JavaScript (ES6)** - Application logic

### Key Features of Technologies
- **Bootstrap**: Responsive design, pre-built components, utility classes
- **Material Icons**: Professional icon set with 1000+ icons
- **Material Design Principles**: Clean, modern UI following Material Design guidelines

## 🎨 Design Principles

### Responsive Design
- Mobile-first approach
- Breakpoints: 576px, 768px, 992px, 1200px
- Flexible grid layout
- Touch-friendly buttons and interactions

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Consistent color scheme
- Smooth animations and transitions
- Helpful error messages
- Loading states and feedback

### State Management
- Client-side state in `appState` object
- Session-based user authentication
- Course enrollment tracking
- Feedback submission tracking

## 📋 File Descriptions

### index.html
- Main entry point of the application
- Contains HTML structure
- Navigation bar with responsive menu
- Modal dialogs for login and registration
- Content container for dynamic pages
- Footer section

### js/app.js
- Application initialization and configuration
- Global error handling
- Performance monitoring
- Theme management
- Browser compatibility checking
- Utility functions and helpers
- Analytics logging

### js/state.js
- Application state object (`appState`)
- Sample course data (6 courses)
- Course management methods (get, enroll, unenroll)
- User authentication methods (login, register, logout)
- Feedback management
- Enrollment tracking

### js/router.js
- SPA routing system
- Page rendering functions:
  - `renderCoursesPage()` - Browse all courses
  - `renderCourseDetailPage()` - View course details
  - `renderEnrolledPage()` - View enrolled courses
  - `renderFeedbackPage()` - Submit feedback
- Navigation management
- 404 error page

### js/components.js
- Reusable component functions
- Event handlers:
  - `handleEnroll()` - Course enrollment
  - `handleUnenroll()` - Course unenrollment
  - `handleLogin()` - User login
  - `handleRegister()` - User registration
  - `submitFeedback()` - Feedback submission
- Utility functions (validation, alerts)
- Application initialization

### css/styles.css
- Custom CSS styling
- CSS variables for theme colors
- Responsive design rules
- Component styling:
  - Course cards with hover effects
  - Navigation bar
  - Tables and modals
  - Forms and input elements
  - Alert messages
  - Status badges
- Animation keyframes
- Media queries for responsive design

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation & Setup

1. **Open the application:**
   - Simply open `index.html` in a web browser
   - Or serve via a local web server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js with http-server
     npx http-server
     
     # Using Live Server extension in VS Code
     ```

2. **Access the application:**
   - Navigate to `http://localhost:8000` (or appropriate port)
   - The application loads the courses page by default

## 📖 Usage Guide

### Browsing Courses
1. The application opens on the **Courses** page
2. View all available courses in a card-based layout
3. Click **"Details"** to see full course information
4. Scroll to see course reviews and ratings

### User Registration
1. Click **"Login"** in the top-right corner
2. Click link to open **Register** dialog
3. Fill in your details (Name, Email, Password)
4. Click **"Register"** to create account
5. You are automatically logged in

### Logging In
1. Click **"Login"** in the top-right corner
2. Enter your email and password
3. Click **"Login"** button
4. Navigation updates to show your logged-in state

### Enrolling in Courses
1. Navigate to the **Courses** page
2. Find the desired course
3. Click **"Enroll"** button (requires login)
4. Confirmation message appears
5. Course appears in **"My Courses"** section

### Managing Enrollments
1. Click **"My Courses"** in navigation
2. View all your enrolled courses
3. See enrollment statistics (total courses, credits)
4. Click **"Details"** to view course information
5. Click **"X"** icon to unenroll from a course

### Submitting Feedback
1. Click **"Feedback"** in navigation
2. Select a course from dropdown
3. Rate the course using stars (1-5)
4. Write your feedback comment
5. Click **"Submit Feedback"**
6. View all submitted feedback on the right side

### Viewing Course Details
1. From courses page or enrolled courses
2. Click **"Details"** button
3. View comprehensive course information
4. See student reviews and ratings
5. Enroll or unenroll using action buttons

### Logging Out
1. Click **"Logout"** in the top-right corner
2. Confirm logout
3. Return to courses page
4. All enrollments and feedback are preserved

## 💾 Sample Data

The application includes 6 sample courses:

1. **CS101** - Introduction to Computer Science
2. **CS201** - Data Structures and Algorithms
3. **CS301** - Database Management Systems
4. **CS401** - Web Development & Full Stack
5. **CS305** - Software Engineering Principles
6. **CS501** - Artificial Intelligence & Machine Learning

Each course includes:
- Course code and title
- Instructor name
- Detailed description
- Credits and semester
- Schedule information
- Capacity and enrollment numbers
- Student ratings and reviews

## 🎨 Styling & Customization

### Color Scheme
- Primary: #007bff (Bootstrap Blue)
- Secondary: #6c757d (Gray)
- Success: #28a745 (Green)
- Danger: #dc3545 (Red)
- Warning: #ffc107 (Yellow)

### Custom CSS Variables (in styles.css)
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
}
```

### Customization Tips
1. Modify CSS variables for color scheme
2. Update course data in `js/state.js`
3. Customize modals in `index.html`
4. Adjust responsive breakpoints in `styles.css`

## 🔒 Security Notes

**Important:** This is a frontend-only demo application.

In a production environment, you should:
- Implement backend authentication (JWT, OAuth)
- Use HTTPS for all communications
- Validate all user inputs on the server
- Implement proper password hashing
- Use secure session management
- Implement CSRF protection
- Add rate limiting for API calls
- Implement proper access control

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliant
- Form labels and validation messages
- Icon text descriptions

## 📱 Responsive Design

### Breakpoints
- **Mobile (< 576px)**: Single column layout
- **Tablet (576px - 991px)**: Two column layout
- **Desktop (992px+)**: Three column layout

### Features
- Hamburger menu on mobile
- Touch-friendly buttons
- Optimized font sizes
- Flexible spacing
- Stacked modals on small screens

## 🐛 Known Limitations

1. **No Backend**: Data is stored in memory only - resets on page refresh
2. **Demo Passwords**: Authentication is simulated (no real validation)
3. **No Database**: All data is frontend-based
4. **No API Calls**: This is a frontend prototype
5. **Limited Error Handling**: Simplified error states for demo

## 🔄 Future Enhancements

1. **Backend Integration**
   - Connect to REST API
   - Database persistence
   - Real authentication

2. **Advanced Features**
   - Prerequisite checking
   - Course wait lists
   - Grade tracking
   - Assignment submission
   - Discussion forums

3. **Performance**
   - Service worker implementation
   - Offline support
   - Progressive Web App (PWA)
   - Code splitting and lazy loading

4. **User Experience**
   - Dark mode support
   - Search and filtering
   - Course recommendations
   - Notifications
   - Calendar view

## 📄 License

This project is provided as-is for educational purposes.

## 📧 Support

For questions or issues, please contact your instructor or course administrator.

---

**Created:** January 2026  
**Version:** 1.0.0  
**Last Updated:** January 2026

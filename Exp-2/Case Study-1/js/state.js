// ==========================================
// State Management for Course Portal
// ==========================================

const appState = {
    currentUser: null,
    currentPage: 'courses',
    courses: [],
    enrolledCourses: [],
    feedback: [],
    isLoggedIn: false,

    // Sample course data
    initializeCourses: function() {
        this.courses = [
            {
                id: 1,
                code: 'CS101',
                title: 'Introduction to Computer Science',
                instructor: 'Dr. John Smith',
                description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming paradigms.',
                credits: 3,
                semester: 'Fall 2025',
                capacity: 30,
                enrolled: 28,
                duration: '16 weeks',
                rating: 4.5,
                reviews: 120,
                schedule: 'MWF 10:00 AM'
            },
            {
                id: 2,
                code: 'CS201',
                title: 'Data Structures and Algorithms',
                instructor: 'Prof. Sarah Johnson',
                description: 'Master advanced data structures and algorithm design techniques. Covers trees, graphs, sorting, and searching.',
                credits: 4,
                semester: 'Fall 2025',
                capacity: 25,
                enrolled: 20,
                duration: '16 weeks',
                rating: 4.7,
                reviews: 95,
                schedule: 'TTh 2:00 PM'
            },
            {
                id: 3,
                code: 'CS301',
                title: 'Database Management Systems',
                instructor: 'Prof. Michael Chen',
                description: 'Comprehensive study of database design, SQL, normalization, and transaction management.',
                credits: 4,
                semester: 'Fall 2025',
                capacity: 35,
                enrolled: 32,
                duration: '16 weeks',
                rating: 4.6,
                reviews: 110,
                schedule: 'MWF 1:00 PM'
            },
            {
                id: 4,
                code: 'CS401',
                title: 'Web Development & Full Stack',
                instructor: 'Prof. Emily Davis',
                description: 'Build modern web applications using HTML, CSS, JavaScript, and popular frameworks.',
                credits: 3,
                semester: 'Fall 2025',
                capacity: 40,
                enrolled: 38,
                duration: '16 weeks',
                rating: 4.8,
                reviews: 150,
                schedule: 'TTh 10:00 AM'
            },
            {
                id: 5,
                code: 'CS305',
                title: 'Software Engineering Principles',
                instructor: 'Prof. Robert Wilson',
                description: 'Learn software development lifecycle, design patterns, testing, and project management.',
                credits: 3,
                semester: 'Spring 2026',
                capacity: 30,
                enrolled: 25,
                duration: '16 weeks',
                rating: 4.4,
                reviews: 80,
                schedule: 'MWF 11:00 AM'
            },
            {
                id: 6,
                code: 'CS501',
                title: 'Artificial Intelligence & Machine Learning',
                instructor: 'Prof. Lisa Anderson',
                description: 'Explore AI fundamentals, neural networks, supervised and unsupervised learning techniques.',
                credits: 4,
                semester: 'Spring 2026',
                capacity: 28,
                enrolled: 26,
                duration: '16 weeks',
                rating: 4.9,
                reviews: 135,
                schedule: 'TTh 3:00 PM'
            }
        ];
    },

    // Course methods
    getCourses: function() {
        return this.courses;
    },

    getCourseById: function(id) {
        return this.courses.find(course => course.id === parseInt(id));
    },

    // Enrollment methods
    enrollCourse: function(courseId) {
        const course = this.getCourseById(courseId);
        if (course && !this.isEnrolled(courseId)) {
            this.enrolledCourses.push({
                ...course,
                enrolledDate: new Date(),
                status: 'active'
            });
            course.enrolled++;
            return true;
        }
        return false;
    },

    unenrollCourse: function(courseId) {
        const index = this.enrolledCourses.findIndex(c => c.id === courseId);
        if (index !== -1) {
            const course = this.getCourseById(courseId);
            if (course) {
                course.enrolled--;
            }
            this.enrolledCourses.splice(index, 1);
            return true;
        }
        return false;
    },

    isEnrolled: function(courseId) {
        return this.enrolledCourses.some(course => course.id === courseId);
    },

    getEnrolledCourses: function() {
        return this.enrolledCourses;
    },

    // Feedback methods
    addFeedback: function(courseId, feedback) {
        const course = this.getCourseById(courseId);
        if (course && this.isEnrolled(courseId)) {
            this.feedback.push({
                id: this.feedback.length + 1,
                courseId: courseId,
                courseName: course.title,
                rating: feedback.rating,
                comment: feedback.comment,
                submittedDate: new Date(),
                student: this.currentUser ? this.currentUser.name : 'Anonymous'
            });
            return true;
        }
        return false;
    },

    getFeedback: function() {
        return this.feedback;
    },

    getFeedbackByCourse: function(courseId) {
        return this.feedback.filter(f => f.courseId === courseId);
    },

    // User methods
    login: function(email, password) {
        // Simple validation - in real app, this would call a backend API
        if (email && password) {
            this.currentUser = {
                id: 1,
                name: email.split('@')[0],
                email: email,
                loginTime: new Date()
            };
            this.isLoggedIn = true;
            this.enrolledCourses = []; // Reset enrolled courses for new login
            return true;
        }
        return false;
    },

    register: function(fullName, email, password) {
        // Simple validation - in real app, this would call a backend API
        if (fullName && email && password) {
            this.currentUser = {
                id: 1,
                name: fullName,
                email: email,
                registeredDate: new Date()
            };
            this.isLoggedIn = true;
            return true;
        }
        return false;
    },

    logout: function() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.enrolledCourses = [];
        this.currentPage = 'courses';
        return true;
    },

    getCurrentUser: function() {
        return this.currentUser;
    },

    isAuthenticated: function() {
        return this.isLoggedIn && this.currentUser !== null;
    }
};

// Initialize courses on page load
appState.initializeCourses();

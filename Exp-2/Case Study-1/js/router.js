// ==========================================
// Router for Single Page Application
// ==========================================

const router = {
    routes: {
        'courses': 'renderCoursesPage',
        'course-detail': 'renderCourseDetailPage',
        'enrolled': 'renderEnrolledPage',
        'feedback': 'renderFeedbackPage'
    },

    navigate: function(page, params = {}) {
        appState.currentPage = page;
        const renderFunction = this.routes[page];
        
        if (renderFunction && typeof window[renderFunction] === 'function') {
            window[renderFunction](params);
        } else {
            this.render404();
        }

        // Update active nav link
        this.updateActiveNavLink(page);

        // Scroll to top
        window.scrollTo(0, 0);
    },

    updateActiveNavLink: function(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the corresponding nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('onclick');
            if (href && href.includes(`navigateTo('${page}')`)) {
                link.classList.add('active');
            }
        });
    },

    render404: function() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="empty-state">
                <span class="material-icons" style="font-size: 4rem; color: #ddd;">error_outline</span>
                <h3>Page Not Found</h3>
                <p>The page you're looking for doesn't exist.</p>
                <button class="btn btn-primary" onclick="navigateTo('courses')">
                    <span class="material-icons">home</span>
                    Back to Courses
                </button>
            </div>
        `;
    }
};

// ==========================================
// Page Rendering Functions
// ==========================================

function renderCoursesPage() {
    const content = document.getElementById('app-content');
    const courses = appState.getCourses();

    let html = `
        <div class="hero-section">
            <h1>
                <span class="material-icons" style="vertical-align: middle; font-size: 2.5rem;">library_books</span>
                Explore Our Courses
            </h1>
            <p>Discover a wide range of computer science courses designed to enhance your skills</p>
            <button class="btn btn-light btn-lg" onclick="navigateTo('enrolled')">
                <span class="material-icons">assignment</span>
                My Enrolled Courses
            </button>
        </div>

        <div class="row" id="coursesList">
    `;

    courses.forEach(course => {
        const isEnrolled = appState.isEnrolled(course.id);
        const availableSeats = course.capacity - course.enrolled;
        
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card course-card">
                    <div class="course-card-header">
                        <div class="course-code">${course.code}</div>
                        <h4 class="course-title">${course.title}</h4>
                    </div>
                    <div class="course-card-body">
                        <div class="course-instructor">
                            <span class="material-icons">person</span>
                            <span>${course.instructor}</span>
                        </div>
                        <p class="course-description">${course.description}</p>
                        
                        <div class="course-rating">
                            <span class="star">★</span>
                            <span><strong>${course.rating}</strong> / 5.0</span>
                            <span class="rating-count">(${course.reviews} reviews)</span>
                        </div>

                        <div class="course-info">
                            <div class="info-item">
                                <span class="material-icons">access_time</span>
                                <span>${course.schedule}</span>
                            </div>
                            <div class="info-item">
                                <span class="material-icons">school</span>
                                <span>${course.credits} Credits</span>
                            </div>
                            <div class="info-item">
                                <span class="material-icons">event</span>
                                <span>${course.semester}</span>
                            </div>
                            <div class="info-item">
                                <span class="material-icons">people</span>
                                <span>${availableSeats} / ${course.capacity}</span>
                            </div>
                        </div>
                    </div>
                    <div class="course-card-footer">
                        <button class="btn btn-sm btn-outline-primary flex-grow-1" 
                                onclick="navigateTo('course-detail', {courseId: ${course.id}})">
                            <span class="material-icons">info</span>
                            Details
                        </button>
                        ${isEnrolled ? `
                            <button class="btn btn-sm btn-danger flex-grow-1" 
                                    onclick="handleUnenroll(${course.id})">
                                <span class="material-icons">remove</span>
                                Unenroll
                            </button>
                        ` : `
                            <button class="btn btn-sm btn-success flex-grow-1" 
                                    onclick="handleEnroll(${course.id})"
                                    ${!appState.isAuthenticated() || availableSeats <= 0 ? 'disabled' : ''}>
                                <span class="material-icons">add</span>
                                Enroll
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    content.innerHTML = html;
}

function renderCourseDetailPage(params) {
    const content = document.getElementById('app-content');
    const courseId = params.courseId;
    const course = appState.getCourseById(courseId);

    if (!course) {
        router.render404();
        return;
    }

    const isEnrolled = appState.isEnrolled(course.id);
    const courseFeedback = appState.getFeedbackByCourse(course.id);
    const availableSeats = course.capacity - course.enrolled;

    let html = `
        <div class="row mb-4">
            <div class="col-md-8">
                <div class="card course-card">
                    <div class="course-card-header" style="padding: 40px 30px;">
                        <div class="course-code">${course.code}</div>
                        <h2 class="course-title" style="font-size: 2rem; margin-top: 15px;">${course.title}</h2>
                    </div>
                    <div class="course-card-body">
                        <div class="course-instructor" style="font-size: 1.1rem;">
                            <span class="material-icons">person</span>
                            <strong>${course.instructor}</strong>
                        </div>

                        <h4 class="mt-3">Course Description</h4>
                        <p style="line-height: 1.8;">${course.description}</p>

                        <h4 class="mt-4">Course Details</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <tr>
                                    <td><strong>Credits:</strong></td>
                                    <td>${course.credits}</td>
                                </tr>
                                <tr>
                                    <td><strong>Semester:</strong></td>
                                    <td>${course.semester}</td>
                                </tr>
                                <tr>
                                    <td><strong>Schedule:</strong></td>
                                    <td>${course.schedule}</td>
                                </tr>
                                <tr>
                                    <td><strong>Duration:</strong></td>
                                    <td>${course.duration}</td>
                                </tr>
                                <tr>
                                    <td><strong>Capacity:</strong></td>
                                    <td>${course.enrolled} / ${course.capacity} (${availableSeats} available)</td>
                                </tr>
                                <tr>
                                    <td><strong>Rating:</strong></td>
                                    <td>
                                        <span class="star">★</span> ${course.rating} / 5.0 
                                        <span style="color: #999;">(${course.reviews} reviews)</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="mt-4">
                            ${isEnrolled ? `
                                <div class="alert alert-success">
                                    <span class="material-icons" style="vertical-align: middle;">check_circle</span>
                                    You are already enrolled in this course
                                </div>
                            ` : `
                                ${availableSeats <= 0 ? `
                                    <div class="alert alert-warning">
                                        <span class="material-icons" style="vertical-align: middle;">info</span>
                                        This course is full. You cannot enroll at this time.
                                    </div>
                                ` : ''}
                            `}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Enrollment</h5>
                        ${appState.isAuthenticated() ? `
                            ${isEnrolled ? `
                                <button class="btn btn-danger w-100 mb-2" onclick="handleUnenroll(${course.id})">
                                    <span class="material-icons">remove</span>
                                    Unenroll from Course
                                </button>
                            ` : `
                                <button class="btn btn-success w-100 mb-2" 
                                        onclick="handleEnroll(${course.id})"
                                        ${availableSeats <= 0 ? 'disabled' : ''}>
                                    <span class="material-icons">add</span>
                                    Enroll Now
                                </button>
                            `}
                        ` : `
                            <button class="btn btn-primary w-100 mb-2" data-bs-toggle="modal" data-bs-target="#loginModal">
                                <span class="material-icons">login</span>
                                Login to Enroll
                            </button>
                        `}
                        <button class="btn btn-outline-primary w-100" onclick="navigateTo('courses')">
                            Back to Courses
                        </button>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Course Statistics</h5>
                        <p><strong>Enrolled:</strong> ${course.enrolled} students</p>
                        <p><strong>Available Seats:</strong> ${availableSeats}</p>
                        <p><strong>Instructor Rating:</strong> ${course.rating}/5.0</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-12">
                <div class="section-header">
                    <span class="material-icons">reviews</span>
                    <h2>Student Reviews (${courseFeedback.length})</h2>
                </div>
                ${courseFeedback.length > 0 ? `
                    <div id="feedbackList">
                        ${courseFeedback.map(feedback => `
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <strong>${feedback.student}</strong>
                                        <div class="rating-count">
                                            ${'★'.repeat(feedback.rating)}<span style="color: #ddd;">${'★'.repeat(5 - feedback.rating)}</span>
                                        </div>
                                    </div>
                                    <p class="text-muted" style="font-size: 0.9rem;">${new Date(feedback.submittedDate).toLocaleDateString()}</p>
                                    <p>${feedback.comment}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <p>No reviews yet. Be the first to review this course!</p>
                    </div>
                `}
            </div>
        </div>
    `;

    content.innerHTML = html;
}

function renderEnrolledPage() {
    const content = document.getElementById('app-content');
    const enrolledCourses = appState.getEnrolledCourses();

    let html = `
        <div class="section-header">
            <span class="material-icons">assignment</span>
            <h2>My Enrolled Courses</h2>
        </div>
    `;

    if (!appState.isAuthenticated()) {
        html += `
            <div class="alert alert-warning" role="alert">
                <span class="material-icons" style="vertical-align: middle;">lock</span>
                Please <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">login</button> 
                to view your enrolled courses.
            </div>
        `;
        content.innerHTML = html;
        return;
    }

    if (enrolledCourses.length === 0) {
        html += `
            <div class="empty-state">
                <span class="material-icons" style="font-size: 4rem; color: #ddd;">no_meetings</span>
                <h3>No Enrolled Courses</h3>
                <p>You haven't enrolled in any courses yet. Start exploring courses today!</p>
                <button class="btn btn-primary" onclick="navigateTo('courses')">
                    <span class="material-icons">library_books</span>
                    Browse Courses
                </button>
            </div>
        `;
    } else {
        html += `
            <div class="table-responsive">
                <table class="table enrollment-table">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Title</th>
                            <th>Instructor</th>
                            <th>Semester</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${enrolledCourses.map(course => `
                            <tr>
                                <td><strong>${course.code}</strong></td>
                                <td>${course.title}</td>
                                <td>${course.instructor}</td>
                                <td>${course.semester}</td>
                                <td><span class="status-badge status-${course.status}">${course.status.charAt(0).toUpperCase() + course.status.slice(1)}</span></td>
                                <td>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button class="btn btn-outline-primary" onclick="navigateTo('course-detail', {courseId: ${course.id}})">
                                            <span class="material-icons">info</span>
                                        </button>
                                        <button class="btn btn-outline-danger" onclick="handleUnenroll(${course.id})">
                                            <span class="material-icons">close</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5>Total Courses</h5>
                            <h2 style="color: var(--primary-color);">${enrolledCourses.length}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5>Total Credits</h5>
                            <h2 style="color: var(--primary-color);">${enrolledCourses.reduce((sum, course) => sum + course.credits, 0)}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5>Active Courses</h5>
                            <h2 style="color: var(--primary-color);">${enrolledCourses.filter(c => c.status === 'active').length}</h2>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    content.innerHTML = html;
}

function renderFeedbackPage() {
    const content = document.getElementById('app-content');

    let html = `
        <div class="section-header">
            <span class="material-icons">feedback</span>
            <h2>Course Feedback</h2>
        </div>
    `;

    if (!appState.isAuthenticated()) {
        html += `
            <div class="alert alert-warning" role="alert">
                <span class="material-icons" style="vertical-align: middle;">lock</span>
                Please <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">login</button> 
                to provide feedback.
            </div>
        `;
        content.innerHTML = html;
        return;
    }

    const enrolledCourses = appState.getEnrolledCourses();

    if (enrolledCourses.length === 0) {
        html += `
            <div class="empty-state">
                <span class="material-icons" style="font-size: 4rem; color: #ddd;">rate_review</span>
                <h3>No Courses to Review</h3>
                <p>You need to enroll in a course before you can provide feedback.</p>
                <button class="btn btn-primary" onclick="navigateTo('courses')">
                    <span class="material-icons">library_books</span>
                    Enroll in Courses
                </button>
            </div>
        `;
    } else {
        html += `
            <div class="row">
                <div class="col-lg-6">
                    <div class="feedback-form">
                        <h4 class="mb-4">Submit Your Feedback</h4>
                        <form id="feedbackForm">
                            <div class="mb-3">
                                <label for="feedbackCourse" class="form-label">Select Course</label>
                                <select class="form-select" id="feedbackCourse" required>
                                    <option value="">-- Select a course --</option>
                                    ${enrolledCourses.map(course => `
                                        <option value="${course.id}">${course.code} - ${course.title}</option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Rating</label>
                                <div class="rating-input">
                                    ${[1, 2, 3, 4, 5].map(i => `
                                        <button type="button" class="star-button" data-rating="${i}" onclick="setRating(${i})">
                                            <span class="material-icons">star</span>
                                        </button>
                                    `).join('')}
                                </div>
                                <input type="hidden" id="feedbackRating" value="0">
                            </div>

                            <div class="mb-3">
                                <label for="feedbackComment" class="form-label">Your Feedback</label>
                                <textarea class="form-control" id="feedbackComment" rows="5" 
                                          placeholder="Share your thoughts about this course..." required></textarea>
                            </div>

                            <button type="button" class="btn btn-primary w-100" onclick="submitFeedback()">
                                <span class="material-icons">send</span>
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>

                <div class="col-lg-6">
                    <h4 class="mb-4">My Feedback Submissions</h4>
                    ${appState.getFeedback().length > 0 ? `
                        <div id="submittedFeedbackList">
                            ${appState.getFeedback().map(feedback => `
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <h6 class="card-title">${feedback.courseName}</h6>
                                        <p class="text-muted" style="font-size: 0.9rem;">
                                            Submitted: ${new Date(feedback.submittedDate).toLocaleDateString()}
                                        </p>
                                        <div class="mb-2">
                                            <span style="color: #ffc107;">
                                                ${'★'.repeat(feedback.rating)}<span style="color: #ddd;">${'★'.repeat(5 - feedback.rating)}</span>
                                            </span>
                                        </div>
                                        <p style="margin-bottom: 0;">${feedback.comment}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="alert alert-info">
                            <span class="material-icons" style="vertical-align: middle;">info</span>
                            You haven't submitted any feedback yet.
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    content.innerHTML = html;
}

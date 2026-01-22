// ==========================================
// Component Functions
// ==========================================

/**
 * Navigate to a different page in the SPA
 * @param {string} page - Page name to navigate to
 * @param {object} params - Optional parameters to pass to the page
 */
function navigateTo(page, params = {}) {
    router.navigate(page, params);
}

/**
 * Handle user enrollment in a course
 */
function handleEnroll(courseId) {
    if (!appState.isAuthenticated()) {
        showAlert('Please login first to enroll in courses.', 'warning');
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    const course = appState.getCourseById(courseId);
    const availableSeats = course.capacity - course.enrolled;

    if (availableSeats <= 0) {
        showAlert('Sorry, this course is full. No more seats available.', 'danger');
        return;
    }

    if (appState.enrollCourse(courseId)) {
        showAlert(`Successfully enrolled in ${course.title}!`, 'success');
        renderCoursesPage();
    } else {
        showAlert('You are already enrolled in this course.', 'info');
    }
}

/**
 * Handle user unenrollment from a course
 */
function handleUnenroll(courseId) {
    const course = appState.getCourseById(courseId);
    
    if (confirm(`Are you sure you want to unenroll from "${course.title}"?`)) {
        if (appState.unenrollCourse(courseId)) {
            showAlert(`Successfully unenrolled from ${course.title}.`, 'success');
            
            // Refresh the current page
            const currentPage = appState.currentPage;
            if (currentPage === 'course-detail') {
                renderCoursesPage();
            } else {
                router.navigate(currentPage);
            }
        } else {
            showAlert('Error: Could not unenroll from this course.', 'danger');
        }
    }
}

/**
 * Handle user login
 */
function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!email || !password) {
        showAlert('Please enter both email and password.', 'warning');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address.', 'warning');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'warning');
        return;
    }

    // Attempt login
    if (appState.login(email, password)) {
        showAlert(`Welcome back, ${appState.currentUser.name}!`, 'success');
        
        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) {
            loginModal.hide();
        }

        // Clear form
        document.getElementById('loginForm').reset();

        // Update navbar
        updateNavbarForUser();

        // Navigate to courses
        navigateTo('courses');
    } else {
        showAlert('Login failed. Please try again.', 'danger');
    }
}

/**
 * Handle user registration
 */
function handleRegister() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields.', 'warning');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address.', 'warning');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'warning');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match.', 'warning');
        return;
    }

    // Attempt registration
    if (appState.register(fullName, email, password)) {
        showAlert(`Welcome, ${fullName}! Your account has been created.`, 'success');
        
        // Close modal
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (registerModal) {
            registerModal.hide();
        }

        // Clear form
        document.getElementById('registerForm').reset();

        // Update navbar
        updateNavbarForUser();

        // Navigate to courses
        navigateTo('courses');
    } else {
        showAlert('Registration failed. Please try again.', 'danger');
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        appState.logout();
        showAlert('You have been logged out successfully.', 'info');
        updateNavbarForUser();
        navigateTo('courses');
    }
}

/**
 * Toggle between login and logout in navbar
 */
function toggleLoginLogout() {
    if (appState.isAuthenticated()) {
        handleLogout();
    } else {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }
}

/**
 * Submit course feedback
 */
function submitFeedback() {
    const courseId = parseInt(document.getElementById('feedbackCourse').value);
    const rating = parseInt(document.getElementById('feedbackRating').value);
    const comment = document.getElementById('feedbackComment').value.trim();

    // Validation
    if (!courseId) {
        showAlert('Please select a course.', 'warning');
        return;
    }

    if (rating === 0) {
        showAlert('Please provide a rating.', 'warning');
        return;
    }

    if (!comment || comment.length < 10) {
        showAlert('Please provide feedback with at least 10 characters.', 'warning');
        return;
    }

    // Submit feedback
    if (appState.addFeedback(courseId, { rating, comment })) {
        showAlert('Thank you! Your feedback has been submitted.', 'success');
        
        // Clear form
        document.getElementById('feedbackForm').reset();
        document.getElementById('feedbackRating').value = '0';
        clearRatingButtons();

        // Refresh page to show new feedback
        setTimeout(() => {
            renderFeedbackPage();
        }, 500);
    } else {
        showAlert('Error: Could not submit feedback. Make sure you are enrolled in the course.', 'danger');
    }
}

/**
 * Set rating for feedback
 */
function setRating(rating) {
    document.getElementById('feedbackRating').value = rating;
    
    // Update visual feedback
    const buttons = document.querySelectorAll('.star-button');
    buttons.forEach((btn, index) => {
        if (index < rating) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Clear rating buttons
 */
function clearRatingButtons() {
    document.querySelectorAll('.star-button').forEach(btn => {
        btn.classList.remove('active');
    });
}

/**
 * Show alert message to user
 */
function showAlert(message, type = 'info') {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alertContainer';
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '80px';
        alertContainer.style.right = '20px';
        alertContainer.style.zIndex = '9999';
        alertContainer.style.maxWidth = '400px';
        document.body.appendChild(alertContainer);
    }

    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert" 
             style="margin-bottom: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertContainer.insertAdjacentHTML('beforeend', alertHTML);

    // Auto remove alert after 4 seconds
    setTimeout(() => {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            const alert = bootstrap.Alert.getOrCreateInstance(alertElement);
            alert.close();
        }
    }, 4000);
}

/**
 * Update navbar based on authentication status
 */
function updateNavbarForUser() {
    const loginLogoutBtn = document.getElementById('loginLogoutBtn');
    
    if (appState.isAuthenticated()) {
        const userName = appState.currentUser.name;
        loginLogoutBtn.innerHTML = `
            <span class="material-icons">logout</span>
            Logout
        `;
        loginLogoutBtn.title = `Logged in as: ${appState.currentUser.email}`;
    } else {
        loginLogoutBtn.innerHTML = `
            <span class="material-icons">login</span>
            Login
        `;
        loginLogoutBtn.title = 'Login to your account';
    }
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing Student Course Management Portal...');
    
    // Initialize navbar
    updateNavbarForUser();
    
    // Load initial page
    navigateTo('courses');
    
    console.log('Application initialized successfully!');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

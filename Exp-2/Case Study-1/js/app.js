// ==========================================
// Main Application File
// ==========================================

/**
 * Course Portal Application
 * A single-page application for managing student course enrollments
 * 
 * Features:
 * - View available courses
 * - User authentication (login/register)
 * - Enroll/unenroll from courses
 * - View enrolled courses
 * - Submit course feedback and ratings
 * - Responsive design with Bootstrap and Material UI
 */

console.log('%cCourse Portal Application Started', 'font-size: 16px; color: #0066cc; font-weight: bold;');
console.log('%cVersion: 1.0.0', 'font-size: 12px; color: #666;');
console.log('%cBuilt with Bootstrap & Material UI', 'font-size: 12px; color: #666;');

// ==========================================
// Application Configuration
// ==========================================

const APP_CONFIG = {
    name: 'Student Course Management Portal',
    version: '1.0.0',
    environment: 'production',
    debugMode: true,
    defaultPage: 'courses',
    sessionTimeout: 3600000, // 1 hour in milliseconds
};

// ==========================================
// Event Listeners
// ==========================================

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    handleWindowResize();
});

// Handle before unload
window.addEventListener('beforeunload', function(e) {
    // Save state to localStorage if needed
    if (appState.isAuthenticated()) {
        localStorage.setItem('lastUserSession', JSON.stringify({
            userName: appState.currentUser.name,
            email: appState.currentUser.email,
            timestamp: new Date()
        }));
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key - close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }

    // Ctrl/Cmd + K - Quick search/navigation
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could implement quick search here
    }
});

// ==========================================
// Helper Functions
// ==========================================

/**
 * Handle window resize events
 */
function handleWindowResize() {
    const width = window.innerWidth;
    
    // Add responsive behavior if needed
    if (width < 768) {
        // Mobile view
        document.body.style.fontSize = '14px';
    } else {
        // Desktop view
        document.body.style.fontSize = '16px';
    }
}

/**
 * Close all open modals
 */
function closeAllModals() {
    document.querySelectorAll('.modal.show').forEach(modal => {
        const instance = bootstrap.Modal.getInstance(modal);
        if (instance) {
            instance.hide();
        }
    });
}

/**
 * Check if browser supports required features
 */
function checkBrowserCompatibility() {
    const features = {
        localStorage: typeof(Storage) !== 'undefined',
        fetch: typeof(fetch) !== 'undefined',
        promises: typeof(Promise) !== 'undefined'
    };

    if (!Object.values(features).every(f => f)) {
        console.warn('Browser does not support all required features');
        showAlert('Your browser may not support all features of this application.', 'warning');
    }

    return features;
}

/**
 * Initialize service workers if available
 */
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('Service Worker registered successfully');
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }
}

/**
 * Log application analytics
 */
function logAnalytics(event, data = {}) {
    if (APP_CONFIG.debugMode) {
        console.log(`[Analytics] ${event}`, data);
    }

    // In production, send to analytics service
    // analytics.track(event, data);
}

/**
 * Restore session from localStorage
 */
function restoreSession() {
    try {
        const savedSession = localStorage.getItem('lastUserSession');
        if (savedSession) {
            const session = JSON.parse(savedSession);
            console.log('Found previous session for:', session.userName);
            
            // Could auto-login here if desired
            logAnalytics('session_restored', session);
        }
    } catch (e) {
        console.error('Error restoring session:', e);
    }
}

/**
 * Clear application cache
 */
function clearAppCache() {
    localStorage.removeItem('lastUserSession');
    console.log('Application cache cleared');
}

// ==========================================
// Global Error Handling
// ==========================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    
    if (APP_CONFIG.debugMode) {
        showAlert('An unexpected error occurred: ' + event.error.message, 'danger');
    }
    
    logAnalytics('application_error', {
        message: event.error.message,
        stack: event.error.stack
    });
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    logAnalytics('unhandled_rejection', {
        reason: event.reason
    });
});

// ==========================================
// Performance Monitoring
// ==========================================

/**
 * Log page load performance
 */
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        logAnalytics('page_load', { loadTime });
    }
}

// ==========================================
// Theme Management
// ==========================================

/**
 * Set application theme
 */
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('app-theme', themeName);
    console.log('Theme set to:', themeName);
}

/**
 * Get current theme
 */
function getTheme() {
    return localStorage.getItem('app-theme') || 'light';
}

/**
 * Initialize theme based on system preference
 */
function initializeTheme() {
    const savedTheme = getTheme();
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }
}

// ==========================================
// Application Bootstrap
// ==========================================

/**
 * Boot up the application
 */
function bootstrapApplication() {
    console.log('Bootstrapping application...');

    // Check browser compatibility
    checkBrowserCompatibility();

    // Initialize theme
    initializeTheme();

    // Restore previous session
    restoreSession();

    // Initialize service worker for offline support
    // initializeServiceWorker(); // Commented out for demo

    // Initialize the app (in components.js)
    // This will be called by DOMContentLoaded event

    console.log('Application bootstrap complete!');
}

/**
 * Cleanup on page unload
 */
function cleanupOnUnload() {
    // Save any pending state
    if (appState.isAuthenticated()) {
        logAnalytics('user_logout', {
            userName: appState.currentUser.name
        });
    }
}

// ==========================================
// Utility Functions
// ==========================================

/**
 * Format date for display
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format time for display
 */
function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Generate unique ID
 */
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function for event handlers
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for event handlers
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// Document Ready Event
// ==========================================

/**
 * Execute when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting application initialization');

    // Bootstrap the application
    bootstrapApplication();

    // Log performance metrics
    window.addEventListener('load', function() {
        logPerformanceMetrics();
    });

    // Setup cleanup on unload
    window.addEventListener('beforeunload', cleanupOnUnload);

    console.log('DOM Ready - Application is now interactive');
});

// ==========================================
// Export for use in other files (if needed)
// ==========================================

// Make global functions available
window.APP = {
    config: APP_CONFIG,
    setTheme,
    getTheme,
    clearCache: clearAppCache,
    logAnalytics,
    formatDate,
    formatTime,
    generateId,
    debounce,
    throttle
};

console.log('Application initialization script loaded successfully!');

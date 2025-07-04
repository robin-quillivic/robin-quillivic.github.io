// Academic Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarItems = document.querySelectorAll('.navbar-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile navigation toggle
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        
        // Update aria-expanded attribute
        const isExpanded = navbarMenu.classList.contains('active');
        navbarToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    navbarItems.forEach(item => {
        item.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', false);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', false);
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect and active link highlighting
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for navbar styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active link
        navbarItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .section').forEach(el => {
        observer.observe(el);
    });
    
    // Email and phone link handlers
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email click (could be used for analytics)
            console.log('Email clicked:', this.href);
        });
    });
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone click (could be used for analytics)
            console.log('Phone clicked:', this.href);
        });
    });
    
    // External link handler
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add rel="noopener noreferrer" for security
            if (!this.rel.includes('noopener')) {
                this.rel = this.rel ? this.rel + ' noopener noreferrer' : 'noopener noreferrer';
            }
            
            // Track external link clicks
            console.log('External link clicked:', this.href);
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', false);
        }
    });
    
    // Add focus management for mobile menu
    navbarToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Scroll to top functionality (could be extended with a button)
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add scroll to top on logo click
    document.querySelector('.navbar-brand a').addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#home') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Initialize page
    function initializePage() {
        // Set initial active link
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
        
        // Trigger scroll event to set initial states
        window.dispatchEvent(new Event('scroll'));
    }
    
    // Initialize when page loads
    initializePage();
    
    // Handle page resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarToggle.setAttribute('aria-expanded', false);
            }
        }, 250);
    });
    
    // Performance optimization: debounce scroll events
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
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Add print functionality
    function printPage() {
        window.print();
    }
    
    // Add copy email functionality
    function copyEmail(email) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Could show a toast notification here
                console.log('Email copied to clipboard');
            });
        }
    }
    
    // Add theme detection (for future dark mode support)
    function detectTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    // Listen for theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
    }
    
    // Initialize theme
    detectTheme();
    
    // Add error handling for external links
    window.addEventListener('error', function(e) {
        console.error('Page error:', e.error);
    });
    
    // Add performance monitoring
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }
    });
    
    console.log('Robin QUILLIVIC Academic Website initialized successfully');
});
// SecureScope Landing Page - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Global Variables
    // ====================
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.price-amount.monthly');
    const yearlyPrices = document.querySelectorAll('.price-amount.yearly');
    const monthlyLabels = document.querySelectorAll('.toggle-label.monthly');
    const yearlyLabels = document.querySelectorAll('.toggle-label.yearly');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const sendAnotherBtn = document.getElementById('send-another');
    
    // IntersectionObserver support flag
    let isIntersectionObserverSupported = 'IntersectionObserver' in window;
    
    // ====================
    // Mobile Navigation
    // ====================
    
    // Create overlay once and store reference
    let overlay = null;
    
    function createOverlay() {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            
            // Attach click listener once
            overlay.addEventListener('click', closeMobileMenu);
        }
        return overlay;
    }
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Toggle body scroll lock
        document.body.classList.toggle('menu-open');
        
        // Create/show overlay for mobile menu
        const overlay = createOverlay();
        overlay.classList.toggle('active');
    });
    
    // Close mobile menu function
    function closeMobileMenu() {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // ====================
    // Navbar Scroll Effect
    // ====================
    function handleScroll() {
        // Change navbar background on scroll
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Only call updateActiveSection if IntersectionObserver is not supported
        if (!isIntersectionObserverSupported) {
            updateActiveSection();
        }
    }
    
    // Debounce scroll handler for performance
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(handleScroll, 10);
    });
    
    // ====================
    // Scrollspy with IntersectionObserver
    // ====================
    function initScrollspy() {
        // Check if IntersectionObserver is supported
        if (isIntersectionObserverSupported) {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        setActiveNavLink(id);
                    }
                });
            }, observerOptions);
            
            // Observe all sections
            sections.forEach(section => {
                observer.observe(section);
            });
        } else {
            // Fallback to scroll event for older browsers
            console.log('IntersectionObserver not supported, using scroll event fallback');
            window.addEventListener('scroll', updateActiveSection);
        }
    }
    
    // Update active section based on scroll position (fallback)
    function updateActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            setActiveNavLink(currentSection);
        }
    }
    
    // Set active nav link
    function setActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ====================
    // Smooth Scrolling
    // ====================
    function initSmoothScrolling() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // If user prefers reduced motion, use instant scroll
                        if (prefersReducedMotion.matches) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'auto'
                            });
                        } else {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
        });
    }
    
    // ====================
    // FAQ Accordion
    // ====================
    function initFAQAccordion() {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle active class on parent item
                const parentItem = this.parentElement;
                parentItem.classList.toggle('active');
                
                // Close other FAQ items
                if (!isExpanded) {
                    faqQuestions.forEach(otherQuestion => {
                        if (otherQuestion !== this) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherQuestion.parentElement.classList.remove('active');
                        }
                    });
                }
            });
            
            // Keyboard support for FAQ
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // ====================
    // Pricing Toggle
    // ====================
    function initPricingToggle() {
        if (pricingToggle) {
            pricingToggle.addEventListener('change', function() {
                const isYearly = this.checked;
                
                // Toggle active class on labels
                monthlyLabels.forEach(label => {
                    label.classList.toggle('active', !isYearly);
                });
                
                yearlyLabels.forEach(label => {
                    label.classList.toggle('active', isYearly);
                });
                
                // Toggle price display
                monthlyPrices.forEach(price => {
                    price.style.display = isYearly ? 'none' : 'inline';
                });
                
                yearlyPrices.forEach(price => {
                    price.style.display = isYearly ? 'inline' : 'none';
                });
            });
        }
    }
    
    // ====================
    // Contact Form Validation
    // ====================
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset previous errors
                clearFormErrors();
                
                // Validate form fields
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                let isValid = true;
                
                // Name validation
                if (!name.value.trim()) {
                    showError('name-error', 'Name is required');
                    name.focus();
                    isValid = false;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim()) {
                    showError('email-error', 'Email is required');
                    if (isValid) email.focus();
                    isValid = false;
                } else if (!emailRegex.test(email.value)) {
                    showError('email-error', 'Please enter a valid email address');
                    if (isValid) email.focus();
                    isValid = false;
                }
                
                // Message validation
                if (!message.value.trim()) {
                    showError('message-error', 'Message is required');
                    if (isValid) message.focus();
                    isValid = false;
                }
                
                // If form is valid, show success message
                if (isValid) {
                    // In a real application, you would send the form data to a server here
                    // For this demo, we'll just show a success message
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    
                    // Reset form
                    contactForm.reset();
                }
            });
            
            // Clear errors when user starts typing
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('input', function() {
                    const errorId = this.id + '-error';
                    clearError(errorId);
                });
            });
            
            // Send another message button
            if (sendAnotherBtn) {
                sendAnotherBtn.addEventListener('click', function() {
                    formSuccess.classList.add('hidden');
                    contactForm.classList.remove('hidden');
                });
            }
        }
    }
    
    // Show form error
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    // Clear specific form error
    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    // Clear all form errors
    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // ====================
    // Initialize Animations on Scroll
    // ====================
    function initScrollAnimations() {
        // Simple animation for elements when they come into view
        const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial-card, .pricing-card');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Set initial state for animated elements
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            animationObserver.observe(element);
        });
    }
    
    // ====================
    // Initialize All Features
    // ====================
    function init() {
        // Initialize on page load
        handleScroll(); // Set initial navbar state
        initScrollspy();
        initSmoothScrolling();
        initFAQAccordion();
        initPricingToggle();
        initContactForm();
        initScrollAnimations();
        
        // Set initial pricing display
        if (pricingToggle) {
            const isYearly = pricingToggle.checked;
            monthlyPrices.forEach(price => {
                price.style.display = isYearly ? 'none' : 'inline';
            });
            yearlyPrices.forEach(price => {
                price.style.display = isYearly ? 'inline' : 'none';
            });
        }
    }
    
    // Initialize the application
    init();
});
# SecureScope Landing Page

A responsive, interactive landing page for a cybersecurity product called SecureScope.

## Features Implemented

### Core Requirements (Must Pass)
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Fixed navigation bar with scroll effects
  - Background changes from transparent to solid on scroll
  - Link styles change on scroll and hover
- ✅ Mobile navigation with hamburger menu
- ✅ Scrollspy highlighting active section
- ✅ Smooth scrolling to sections
- ✅ Accessibility features
- ✅ Performance optimizations

### Mobile Navigation Features
- ✅ Hamburger menu that opens/closes
- ✅ Close on link click
- ✅ Close on outside click
- ✅ Close on Escape key
- ✅ Prevent body scroll when menu is open
- ✅ Proper ARIA attributes (aria-expanded, aria-controls)

### Scrollspy Implementation
- ✅ Uses IntersectionObserver API (preferred)
- ✅ Fallback to scroll event for older browsers
- ✅ Highlights active nav link based on current section

### Smooth Scrolling
- ✅ Clicking nav items scrolls smoothly to sections
- ✅ Respects prefers-reduced-motion media query

### Accessibility Features
- ✅ Skip-to-content link
- ✅ Proper ARIA attributes on hamburger menu
- ✅ Keyboard navigation support (Tab, Escape)
- ✅ Visible focus styles
- ✅ Semantic HTML (header, main, section, footer, etc.)

### Performance & Clean Code
- ✅ No heavy images (uses SVG icons and CSS gradients)
- ✅ CSS variables for consistent theming
- ✅ Debounced scroll handlers
- ✅ Semantic HTML structure
- ✅ Optimized animations

### Interactive Elements
- ✅ FAQ accordion (keyboard accessible)
- ✅ Pricing toggle (Monthly/Yearly) using JavaScript
- ✅ Contact form validation with success message

### Landing Page Sections
- ✅ Hero section with headline and call-to-action buttons
- ✅ Features section (6 feature cards)
- ✅ How It Works section (3 steps)
- ✅ Testimonials section (3 cards)
- ✅ Pricing section (3 tiers with toggle)
- ✅ FAQ section (accordion with 5 items)
- ✅ Contact section (form with validation)
- ✅ Footer with links and social placeholders

## How to Run

1. Extract all files into a folder named `landing-page`
2. Open a terminal/command prompt in the `landing-page` folder
3. Start a local HTTP server:

**Using Python 3:**
```bash
python -m http.server 8000
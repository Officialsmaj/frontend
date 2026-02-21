// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Animated headline cycling
const headlineSpans = document.querySelectorAll('.animated-headline span');
let currentHeadlineIndex = 0;

function cycleHeadline() {
    headlineSpans.forEach((span, index) => {
        span.style.opacity = index === currentHeadlineIndex ? '1' : '0';
    });
    currentHeadlineIndex = (currentHeadlineIndex + 1) % headlineSpans.length;
}

setInterval(cycleHeadline, 2000);
cycleHeadline(); // Initial call

// Skills animation on scroll
const skillFills = document.querySelectorAll('.skill-fill');

function animateSkills() {
    skillFills.forEach(fill => {
        const percent = fill.getAttribute('data-percent');
        fill.style.width = percent + '%';
    });
}

function checkScroll() {
    const skillsSection = document.querySelector('#skills');
    const skillsTop = skillsSection.offsetTop;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight > skillsTop + 100) {
        animateSkills();
        window.removeEventListener('scroll', checkScroll);
    }
}

window.addEventListener('scroll', checkScroll);

// Project modal
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        modal.style.display = 'block';
        // Populate modal with project details (placeholder)
        const modalContent = modal.querySelector('.modal-content');
        modalContent.querySelector('h3').textContent = card.querySelector('h3').textContent;
        modalContent.querySelector('p').textContent = 'Detailed description of the project goes here.';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Button animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Social icons infinite animation (additional subtle rotate)
document.querySelectorAll('.icon').forEach(icon => {
    icon.style.animation += ', rotate 10s linear infinite';
});

// Contact form floating labels
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.style.transform = 'translateY(-20px)';
        label.style.fontSize = '12px';
        label.style.color = '#007bff';
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.style.transform = 'translateY(0)';
            label.style.fontSize = '16px';
            label.style.color = '#333';
        }
    });
});

// Download CV button (placeholder functionality)
document.querySelectorAll('.download-cv, .download-cv-full').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('CV download functionality would be implemented here.');
    });
});

// View Projects button scroll to projects section
document.querySelector('.view-projects').addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
});

// View Live link should open project directly and not trigger the card modal
document.querySelectorAll('.view-live').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// View Details button (already handled by modal)

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Scroll-triggered animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about, .skills, .projects, .cv, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

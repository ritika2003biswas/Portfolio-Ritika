/* Portfolio Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip for download resume button or empty hash
            if (href === '#' || this.id === 'download-resume') return;

            e.preventDefault();
            try {
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: targetPosition - 70,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                console.warn('Invalid selector:', href);
            }
        });
    });

    // Download Resume Handler (Modal Logic)
    const downloadBtn = document.getElementById('download-resume');
    const modal = document.getElementById('resume-modal');
    const closeModal = document.querySelector('.close-modal');
    const resumeForm = document.getElementById('resume-request-form');

    if (downloadBtn && modal) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            // Trigger reveal animation inside modal
            modal.querySelector('.modal-content').classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    if (resumeForm) {
        resumeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('requester-email').value;
            const message = document.getElementById('requester-message').value;
            const submitBtn = resumeForm.querySelector('button');
            
            // Construct direct Gmail Compose URL
            const subject = encodeURIComponent("Resume Request from Portfolio");
            const body = encodeURIComponent(`Hi Ritika,\n\nI would like to request your resume.\n\nMy Email: ${email}\nMessage: ${message}`);
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ritikabiswas154@gmail.com&su=${subject}&body=${body}`;

            submitBtn.innerText = 'Opening Gmail...';
            
            setTimeout(() => {
                window.open(gmailUrl, '_blank');
                modal.classList.remove('active');
                resumeForm.reset();
                submitBtn.innerText = 'Request Resume';
            }, 1000);
        });
    }

    // Form Submission Handling (Main Contact Form)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const msg = contactForm.querySelector('textarea').value;
            const btn = contactForm.querySelector('button');
            
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ritikabiswas154@gmail.com&su=${subject}&body=${body}`;

            btn.innerText = 'Opening Gmail...';
            
            setTimeout(() => {
                window.open(gmailUrl, '_blank');
                contactForm.reset();
                btn.innerText = 'Send Message';
            }, 1000);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const menuIcon = mobileMenuBtn.querySelector('i');
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            const menuIcon = mobileMenuBtn.querySelector('i');
            
            navLinks.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // AI Agent Chat Logic
    const aiTrigger = document.getElementById('ai-trigger');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const closeChat = document.getElementById('close-chat');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiInput = document.getElementById('ai-input');
    const chatMessages = document.getElementById('chat-messages');

    const ritikaData = {
        name: "Ritika Biswas",
        education: "Bachelor of Engineering in Computer Science and Design (2022-2026) at Atria Institute of Technology, Bangalore. Current CGPA is 8.8.",
        skills: "Python, Java, JavaScript, AI/ML (TensorFlow, PyTorch, Pandas), Web Dev (React, Node), SQL, and strong Management Skills.",
        projects: "1. Hearing Edge: Real-time audio enhancement app using Java, Python, Flutter. 2. Health Data Analysis: Analytics platform using Python, Pandas.",
        experience: "Student Brand Ambassador at The Esports Club and Social Media Lead at Atria Foundation.",
        certifications: "AI for Product Management, Generative AI, AI/ML, Deep Learning, and Java Full-Stack Development.",
        achievements: "Published research paper in IEEE conference proceedings.",
        contact: "Email: ritikabiswas154@gmail.com, LinkedIn: linkedin.com/in/ritika-biswas-6982a8237"
    };

    const getBotResponse = (query) => {
        const q = query.toLowerCase();
        if (q.includes('education') || q.includes('college') || q.includes('university')) return ritikaData.education;
        if (q.includes('skill') || q.includes('programming') || q.includes('technical') || q.includes('manage')) return ritikaData.skills;
        if (q.includes('project') || q.includes('build') || q.includes('work')) return ritikaData.projects;
        if (q.includes('exp') || q.includes('job') || q.includes('brand')) return ritikaData.experience;
        if (q.includes('certif')) return ritikaData.certifications;
        if (q.includes('achieve') || q.includes('paper') || q.includes('ieee')) return ritikaData.achievements;
        if (q.includes('contact') || q.includes('email') || q.includes('reach')) return ritikaData.contact;
        if (q.includes('hi') || q.includes('hello') || q.includes('who')) return "I'm Ritika's AI assistant. I can tell you about her education, skills, projects, and professional background. What would you like to know?";
        return "I'm sorry, I can only answer questions related to Ritika's professional profile. You can ask about her education, skills, or projects!";
    };

    if (aiTrigger) {
        aiTrigger.addEventListener('click', () => {
            aiChatWindow.classList.toggle('active');
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            aiChatWindow.classList.remove('active');
        });
    }

    if (aiChatForm) {
        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = aiInput.value.trim();
            if (!text) return;

            // Add user message
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-msg';
            userDiv.textContent = text;
            chatMessages.appendChild(userDiv);

            aiInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Add bot thinking state
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message bot-msg';
                botDiv.textContent = getBotResponse(text);
                chatMessages.appendChild(botDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
        });
    }
});

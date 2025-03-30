// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the preloader
    initPreloader();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize hero canvas
    initHeroCanvas();
    
    // Initialize carousel
    initCarousel();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Initialize 3D showcase
    initWebGLShowcase();
    
    // Initialize audio visualizer
    initAudioVisualizer();
    
    // Initialize testimonials
    initTestimonials();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize game cards
    initGameCards();
    
    // Initialize blog interactions
    initBlogInteractions();
});

// Preloader - Simplified version with guaranteed completion
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.progress');
    
    if (!preloader || !progress) {
        // If elements don't exist, just return and allow page to display
        document.body.classList.add('loaded');
        return;
    }
    
    // Set a maximum loading time (3 seconds)
    const maxLoadTime = 3000;
    const startTime = Date.now();
    
    // Guaranteed completion after maxLoadTime
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }, maxLoadTime);
    
    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        // Calculate elapsed time as percentage of maxLoadTime
        const elapsed = Date.now() - startTime;
        const percentComplete = Math.min(100, (elapsed / maxLoadTime) * 100);
        
        // Ensure progress always completes
        width = percentComplete;
        progress.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 500);
            }, 200);
        }
    }, 50);
}


// Custom Cursor
function initCustomCursor() {
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursorFollower || !cursorDot) return;
    
    // Show cursors after a short delay
    setTimeout(() => {
        cursorFollower.style.opacity = '1';
        cursorDot.style.opacity = '1';
    }, 1000);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorFollower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.3
        });
        
        gsap.to(cursorDot, {
            x: e.clientX - 4,
            y: e.clientY - 4,
            duration: 0.1
        });
    });
    
    // Cursor effects on hover
    const hoverables = document.querySelectorAll('a, button, .game-card, .blog-card, .social-icon');
    
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            gsap.to(cursorFollower, {
                scale: 1.5,
                borderColor: 'rgba(255, 255, 255, 1)',
                duration: 0.3
            });
        });
        
        hoverable.addEventListener('mouseleave', () => {
            gsap.to(cursorFollower, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                duration: 0.3
            });
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            gsap.to([cursorFollower, cursorDot], {
                opacity: 0,
                duration: 0.3
            });
        }
    });
    
    document.addEventListener('mouseover', () => {
        gsap.to([cursorFollower, cursorDot], {
            opacity: 1,
            duration: 0.3
        });
    });
}

// Navigation
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('nav');
    
    // Toggle mobile navigation
    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle nav
            nav.classList.toggle('nav-active');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Change navbar on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero Canvas with Particle System
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = '#ffffff';
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.size > 0.2) this.size -= 0.1;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    let particles = [];
    function initParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles with lines
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
                particles.push(new Particle());
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };
    
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
        
        // Create particles on mouse move
        for (let i = 0; i < 3; i++) {
            const particle = new Particle();
            particle.x = mouse.x;
            particle.y = mouse.y;
            particle.size = Math.random() * 5 + 2;
            particle.speedX = Math.random() * 3 - 1.5;
            particle.speedY = Math.random() * 3 - 1.5;
            particles.push(particle);
        }
    });
    
    initParticles();
    animateParticles();
}

// Carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelector('.carousel-indicators');
    
    if (!carousel || !carouselItems.length) return;
    
    let currentIndex = 0;
    
    // Update carousel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
        updateActiveState();
    }
    
    // Create indicators
    function createIndicators() {
        indicators.innerHTML = '';
        carouselItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            indicators.appendChild(indicator);
        });
    }
    
    // Update indicators
    function updateIndicators() {
        const indicatorDots = document.querySelectorAll('.indicator');
        indicatorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Update active state
    function updateActiveState() {
        carouselItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        });
    }
    
    // Auto-advance carousel
    let carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }, 5000);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        }, 5000);
    });
    
    createIndicators();
    updateCarousel();
}

// Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (!stats.length) return;
    
    let counted = false;
    
    function startCounting() {
        if (counted) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const increment = Math.ceil(target / 30);
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    if (count > target) count = target;
                    stat.textContent = count;
                    requestAnimationFrame(updateCount);
                }
            };
            
            updateCount();
        });
        
        counted = true;
    }
    
    // Start counting when section is in view
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
}

// WebGL 3D Showcase
function initWebGLShowcase() {
    const canvas = document.getElementById('game-showcase');
    if (!canvas || typeof THREE === 'undefined') return;
    
    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    // Set renderer size
    function resizeRenderer() {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create abstract 3D logo
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        emissive: 0x000000,
        metalness: 0.8,
        roughness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation state
    let rotationEnabled = true;
    let explodeAnimation = false;
    let scaleAnimation = false;
    let originalPositions = null;
    
    // Control buttons
    const rotateBtn = document.querySelector('[data-action="rotate"]');
    const scaleBtn = document.querySelector('[data-action="scale"]');
    const explodeBtn = document.querySelector('[data-action="explode"]');
    
    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            rotationEnabled = !rotationEnabled;
            rotateBtn.classList.toggle('active');
        });
    }
    
    if (scaleBtn) {
        scaleBtn.addEventListener('click', () => {
            scaleAnimation = !scaleAnimation;
            scaleBtn.classList.toggle('active');
        });
    }
    
    if (explodeBtn) {
        explodeBtn.addEventListener('click', () => {
            if (!explodeAnimation) {
                // Store original positions before exploding
                if (!originalPositions) {
                    originalPositions = Array.from(geometry.attributes.position.array);
                }
                
                explodeAnimation = true;
                explodeBtn.classList.add('active');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    explodeAnimation = false;
                    explodeBtn.classList.remove('active');
                    
                    // Reset positions
                    for (let i = 0; i < geometry.attributes.position.array.length; i++) {
                        geometry.attributes.position.array[i] = originalPositions[i];
                    }
                    geometry.attributes.position.needsUpdate = true;
                }, 2000);
            }
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate mesh
        if (rotationEnabled) {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            particlesMesh.rotation.x += 0.002;
            particlesMesh.rotation.y += 0.002;
        }
        
        // Scale animation
        if (scaleAnimation) {
            mesh.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.3;
            mesh.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.3;
            mesh.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.3;
        } else {
            mesh.scale.set(1, 1, 1);
        }
        
        // Explode animation
        if (explodeAnimation) {
            for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
                const x = geometry.attributes.position.array[i];
                const y = geometry.attributes.position.array[i + 1];
                const z = geometry.attributes.position.array[i + 2];
                
                const length = Math.sqrt(x * x + y * y + z * z);
                const normalizedX = x / length;
                const normalizedY = y / length;
                const normalizedZ = z / length;
                // Explode animation
   if (explodeAnimation) {
    for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
    const x = geometry.attributes.position.array[i];
    const y = geometry.attributes.position.array[i + 1];
    const z = geometry.attributes.position.array[i + 2];
    
    text
                const length = Math.sqrt(x * x + y * y + z * z);
                const normalizedX = x / length;
                const normalizedY = y / length;
                const normalizedZ = z / length;
                
                geometry.attributes.position.array[i] += normalizedX * 0.1;
                geometry.attributes.position.array[i + 1] += normalizedY * 0.1;
                geometry.attributes.position.array[i + 2] += normalizedZ * 0.1;
            }
            
            geometry.attributes.position.needsUpdate = true;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
    }
    
    // Audio Visualizer
    function initAudioVisualizer() {
    const canvas = document.getElementById('audio-canvas');
    const playButton = document.getElementById('play-audio');
    const volumeControl = document.getElementById('volume');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    text
    if (!canvas || !playButton || !volumeControl) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Audio setup
    let audioContext, audioSource, analyser;
    let audioElement = new Audio('audio-sample.mp3');
    audioElement.loop = true;
    
    let isPlaying = false;
    
    // Initialize audio context on user interaction
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioSource = audioContext.createMediaElementSource(audioElement);
            analyser = audioContext.createAnalyser();
            
            analyser.fftSize = 256;
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
        }
    }
    
    // Play/pause audio
    playButton.addEventListener('click', () => {
        initAudio();
        
        if (isPlaying) {
            audioElement.pause();
            playIcon.style.display = 'inline-block';
            pauseIcon.style.display = 'none';
        } else {
            audioElement.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        }
        
        isPlaying = !isPlaying;
    });
    
    // Volume control
    volumeControl.addEventListener('input', () => {
        audioElement.volume = volumeControl.value / 100;
    });
    
    // Visualize audio
    function visualize() {
        if (!analyser) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            
            analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                
                // Create gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        }
        
        renderFrame();
    }
    
    // Start visualization
    visualize();
    }
    
    // Testimonials
    function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    text
    if (!testimonials.length || !dotsContainer) return;
    
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonials();
        });
        dotsContainer.appendChild(dot);
    });
    
    // Update testimonials
    function updateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === currentIndex ? 'block' : 'none';
        });
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonials();
    }, 5000);
    
    // Initial update
    updateTestimonials();
    }
    
    // Form Handling
    function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    text
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData);
        
        // You would typically send this data to a server
        console.log('Form submitted with values:', formValues);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('active');
        }
        
        // Add active class on focus
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });
        
        // Remove active class if input is empty
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('active');
            }
        });
    });
    }
    
    // Game Cards
    function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    const gameButtons = document.querySelectorAll('.game-btn');
    
    text
    if (!gameCards.length) return;
    
    // Add 3D tilt effect on hover
    gameCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = mouseY / -10;
            const rotateY = mouseX / 10;
            
            card.querySelector('.game-card-inner').style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.game-card-inner').style.transform = '';
        });
    });
    
    // Game button interactions
    gameButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card flip
            
            const gameName = this.closest('.game-card-back').querySelector('h3').textContent;
            alert(`You selected ${gameName}. Redirecting to game details...`);
        });
    });
    }
    
    // Blog Interactions
    function initBlogInteractions() {
    const blogCards = document.querySelectorAll('.blog-card');
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    text
    if (!blogCards.length) return;
    
    // Add hover effect
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.blog-image img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.blog-image img').style.transform = 'scale(1)';
        });
    });
    
    // Read more interactions
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const blogTitle = this.closest('.blog-card').querySelector('h3').textContent;
            alert(`Opening article: "${blogTitle}"`);
        });
    });
    }
    
    // Add scroll reveal animations
    window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    
    text
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    });

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------
        NAVBAR SCROLL EFFECT
    -------------------------------------------------- */
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    /* --------------------------------------------------
        HERO SLIDE ANIMATIONS
    -------------------------------------------------- */
    // Select all possible animated elements once
    const heroTextElements = document.querySelectorAll('.hero-tagline, .hero-heading, .hero-btn');
    const heroCarousel = document.getElementById('heroCarousel');

    function resetHeroAnimations() {
        // Clear inline styles to allow re-animation
        heroTextElements.forEach(el => {
            el.style.animation = 'none';
            // Re-apply opacity 0 immediately after clearing the animation
            el.style.opacity = '0';
        });
        // Force a DOM reflow to make the animation restart
        void heroCarousel.offsetWidth;
    }

    function animateHero() {
        resetHeroAnimations();

        const activeSlide = document.querySelector('#heroCarousel .carousel-item.active');
        if (!activeSlide) return;

        const tagline = activeSlide.querySelector('.hero-tagline');
        const heading = activeSlide.querySelector('.hero-heading');
        const btn = activeSlide.querySelector('.hero-btn');

        // Apply the staggered animations
        if (tagline) {
            tagline.style.animation = 'fadeIn 0.8s ease-out forwards 0.4s';
            tagline.style.opacity = '0'; // Ensure starting opacity is 0
        }
        if (heading) {
            heading.style.animation = 'fadeInUp 0.8s ease-out forwards 0.8s';
            heading.style.opacity = '0'; // Ensure starting opacity is 0
        }
        if (btn) {
            btn.style.animation = 'fadeInUp 0.8s ease-out forwards 1.2s';
            btn.style.opacity = '0'; // Ensure starting opacity is 0
        }
    }

    // Initial animation load
    animateHero();

    // Re-animate on slide change
    if (heroCarousel) {
        heroCarousel.addEventListener('slid.bs.carousel', animateHero);
    }

    /* --------------------------------------------------
        SCROLL ANIMATION
    -------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    /* --------------------------------------------------
        PRICE AUTO-FILL LOGIC
    -------------------------------------------------- */
    const priceMap = {
        "Portrait Tattoos": "₹8,000 – ₹20,000+",
        "Color Tattoos": "₹5,000 – ₹15,000+",
        "Mandala Tattoos": "₹6,000 – ₹14,000+",
        "Tribal Tattoos": "₹4,000 – ₹10,000+",
        "Letter Tattoos": "₹2,000 – ₹5,000+",
        "Realistic Tattoos": "₹10,000 – ₹25,000+",
        "Black and Grey Tattoos": "₹5,000 – ₹12,000+",
        "Minimal Tattoos": "₹1,500 – ₹3,500+",
        "Watercolor Tattoos": "₹6,000 – ₹12,000+",
        "Geometric Tattoos": "₹5,000 – ₹11,000+",
        "Spiritual Tattoos": "₹4,000 – ₹9,000+",
        "Cover-Up Tattoos": "₹8,000 – ₹18,000+",
        "Tattoo Removal": "₹2,000 per session",
        "Ear Piercing": "₹500 – ₹1,500",
        "Nose Piercing": "₹800 – ₹2,000",
        "Body Piercing": "₹1,500 – ₹4,000"
    };

    const categorySelect = document.getElementById('category');
    const priceInput = document.getElementById('priceEstimate');

    if (categorySelect && priceInput) {
        categorySelect.addEventListener('change', e => {
            priceInput.value = priceMap[e.target.value] || "Select category first";
        });
    }

    /* --------------------------------------------------
        TIME RANGE LIMIT
    -------------------------------------------------- */
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.setAttribute('min', '10:00');
        timeInput.setAttribute('max', '22:00');
    }

    /* --------------------------------------------------
        REAL WEB3FORMS SUBMIT
    -------------------------------------------------- */
    const form = document.getElementById('bookingForm');
    const result = document.getElementById('formResult');

    if (form && result) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            result.innerHTML =
                '<div class="spinner-border text-gold" role="status"><span class="visually-hidden">Loading...</span></div>';

            const formData = new FormData(form);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    result.innerHTML =
                        '<div class="alert alert-success bg-darker text-gold border-gold-subtle mb-0">Thank you! Your booking request has been sent.</div>';
                    form.reset();
                    if (priceInput) priceInput.value = '';
                } else {
                    result.innerHTML =
                        '<div class="alert alert-danger bg-darker text-white border-gold-subtle mb-0">Something went wrong. Please try again.</div>';
                }
            } catch (error) {
                result.innerHTML =
                    '<div class="alert alert-danger bg-darker text-white border-gold-subtle mb-0">Network error. Please try again.</div>';
            }
        });
    }

    /* --------------------------------------------------
        OUR WORKS CAROUSEL
    -----------------------------------------------------
        OUR WORKS CAROUSEL LOGIC
        - Generates 30 images
        - Handles slider for desktop
        - Mobile uses CSS grid/wrap (collage view)
    -------------------------------------------------- */

    // Get carousel elements
    const worksTrack = document.getElementById('worksTrack');
    const worksPrev = document.getElementById('worksPrev');
    const worksNext = document.getElementById('worksNext');

    if (worksTrack && worksPrev && worksNext) {

       // Generate 30 tattoo-related images
const imageUrls = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600",
    "https://images.unsplash.com/photo-1520975922071-a98a8f6f27b4?w=600",
    "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600",
    "https://images.unsplash.com/photo-1520975698519-59c4445d88bf?w=600",
    "https://images.unsplash.com/photo-1517089596392-fb9a9033e05e?w=600",
    "https://images.unsplash.com/photo-1520975518720-52e75c0517a6?w=600",
    "https://images.unsplash.com/photo-1520976176158-47e04a3bd66c?w=600",
    "https://images.unsplash.com/photo-1507307531016-cb7b2d5bb7bf?w=600",
    "https://images.unsplash.com/photo-1520975584736-7e3c9cd4c4f2?w=600",
    "https://images.unsplash.com/photo-1517495306984-887943c9f299?w=600",
    "https://images.unsplash.com/photo-1535468852836-48b0e3f33ed8?w=600",
    "https://images.unsplash.com/photo-1541411438265-4f6e4e2a3c0b?w=600",
    "https://images.unsplash.com/photo-1549877459-1f5d7f1a6b2a?w=600",
    "https://images.unsplash.com/photo-1520975965820-c3f27171d1c7?w=600",
    "https://images.unsplash.com/photo-1520409364224-b37005fe4ba3?w=600",
    "https://images.unsplash.com/photo-1520976176158-47e04a3bd66c?w=600",
    "https://images.unsplash.com/photo-1520975866158-18e3d2e03d32?w=600",
    "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600",
    "https://images.unsplash.com/photo-1583241809001-1cb8c948ae61?w=600",
    "https://images.unsplash.com/photo-1582671280973-898203e5db7a?w=600",
    "https://images.unsplash.com/photo-1520963950232-3fd3f8c8a2cc?w=600",
    "https://images.unsplash.com/photo-1517837016564-e877c18bd873?w=600",
    "https://images.unsplash.com/photo-1540324995074-44b0b2e1e3f8?w=600",
    "https://images.unsplash.com/photo-1535468852836-48b0e3f33ed8?w=600",
    "https://images.unsplash.com/photo-1535468852836-48b0e3f33ed8?w=600",
    "https://images.unsplash.com/photo-1517837016564-e877c18bd873?w=600",
    "https://images.unsplash.com/photo-1520975866158-18e3d2e03d32?w=600",
    "https://images.unsplash.com/photo-1540324995074-44b0b2e1e3f8?w=600",
    "https://images.unsplash.com/photo-1583241809001-1cb8c948ae61?w=600",
    "https://images.unsplash.com/photo-1582671280973-898203e5db7a?w=600"
];

        // Add each image to the track
        imageUrls.forEach(url => {
            const div = document.createElement('div');
            div.className = 'work-item';
            div.innerHTML = `<img src="${url}" alt="Our Work">`;
            worksTrack.appendChild(div);
        });

        // Carousel scroll values
        let scrollAmount = 0;
        const itemWidth = 295; // 280px width + 15px gap

        // Next button -> move right
        worksNext.addEventListener('click', () => {
            const maxScroll = worksTrack.scrollWidth - worksTrack.parentElement.offsetWidth;
            scrollAmount += itemWidth * 2;
            if (scrollAmount > maxScroll) {
                scrollAmount = maxScroll;
            }
            worksTrack.style.transform = `translateX(-${scrollAmount}px)`;
        });

        // Previous button -> move left
        worksPrev.addEventListener('click', () => {
            scrollAmount -= itemWidth * 2;
            if (scrollAmount < 0) scrollAmount = 0;
            worksTrack.style.transform = `translateX(-${scrollAmount}px)`;
        });

        /* --------------------------------------------------
           AUTO-SCROLL FEATURE (ADDED)
           - Slowly auto-scrolls to the right every 3 seconds
           - Restarts from the beginning when reaching the end
        -------------------------------------------------- */
        setInterval(() => {
            const maxScroll = worksTrack.scrollWidth - worksTrack.parentElement.offsetWidth;

            // Move automatically
            scrollAmount += itemWidth;

            // If reached end, reset to start
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }

            worksTrack.style.transform = `translateX(-${scrollAmount}px)`;
        }, 3000); // Auto-scroll every 3 seconds
    }


});
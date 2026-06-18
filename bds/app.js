document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       SCROLL EFFECTS (HEADER & ACTIVE LINKS)
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link on scroll
        const scrollPosition = window.scrollY + 120;
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('#nav-menu a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on init to check current scroll position

    /* ==========================================================================
       MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle('open');
        mobileDrawer.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); // Prevent background scrolling
    };
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when a nav link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       MODAL REQUEST FOR FREE ESTIMATE
       ========================================================================== */
    const quoteModal = document.getElementById('quote-modal');
    const openModalButtons = document.querySelectorAll('.open-quote-modal');
    const closeModalButton = document.getElementById('modal-close-btn');
    const estimateForm = document.getElementById('estimate-form');
    const formSuccess = document.getElementById('form-success');
    const btnSuccessClose = document.getElementById('btn-success-close');
    
    // Form Inputs
    const inputName = document.getElementById('client-name');
    const inputPhone = document.getElementById('client-phone');
    const successName = document.getElementById('success-name');
    const successPhone = document.getElementById('success-phone');

    const openModal = () => {
        // Reset form states
        estimateForm.style.display = 'block';
        estimateForm.reset();
        formSuccess.classList.remove('active');
        
        // Open
        quoteModal.classList.add('open');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        quoteModal.classList.remove('open');
        // Delay restoring scroll until transition finishes
        setTimeout(() => {
            if (!mobileDrawer.classList.contains('open')) {
                document.body.classList.remove('no-scroll');
            }
        }, 300);
    };

    openModalButtons.forEach(btn => btn.addEventListener('click', openModal));
    closeModalButton.addEventListener('click', closeModal);
    
    // Close modal on background click
    quoteModal.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
            closeModal();
        }
    });

    // Handle Form Submit (Simulation)
    estimateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('btn-submit-quote');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Request <i class="fa-solid fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            // Update success message text
            successName.textContent = inputName.value;
            successPhone.textContent = inputPhone.value;
            
            // Toggle form & success message layout
            estimateForm.style.display = 'none';
            formSuccess.classList.add('active');
            
            // Restore button text
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1200); // Simulate network latency
    });

    // Close success message and close modal
    btnSuccessClose.addEventListener('click', closeModal);

    /* ==========================================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Viewport
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly higher
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       HERO FADE SLIDER
       ========================================================================== */
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; // Alternar a cada 4 segundos
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }
});

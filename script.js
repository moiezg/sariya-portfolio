/**
 * Sariya Seraj - Architecture Portfolio Website Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth frame updates for custom cursor follower
    function animateCursor() {
        // Linear interpolation for cursor
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Slightly slower interpolation for follower to create lag effect
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        
        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        if (follower) {
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start cursor animation loop
    if (cursor && follower) {
        animateCursor();
        
        // Add hover effects on interactive elements
        const hoverables = document.querySelectorAll('a, button, [role="button"], .zoom-btn, .sub-toggle-tabs button');
        
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                follower.classList.add('hovered');
                
                // If it is a zoom trigger, show zoom indicators
                if (el.classList.contains('zoom-btn') || el.classList.contains('art-img-container')) {
                    cursor.classList.add('zoom-state');
                    follower.classList.add('zoom-state');
                }
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                follower.classList.remove('hovered');
                cursor.classList.remove('zoom-state');
                follower.classList.remove('zoom-state');
            });
        });
    }

    // --- 2. Sticky Header Scroll Interaction ---
    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (!header) return;
        
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 150) {
            // Scrolling down - hide header
            if (currentScrollY > lastScrollY) {
                header.classList.add('hide');
            } else {
                // Scrolling up - show header
                header.classList.remove('hide');
                header.style.background = 'rgba(12, 13, 14, 0.9)'; // Darken background slightly when scrolled
            }
        } else {
            // Near top - show header and reset background opacity
            header.classList.remove('hide');
            header.style.background = 'rgba(12, 13, 14, 0.75)';
        }
        
        lastScrollY = currentScrollY;
    });

    // --- 3. Mobile Navigation Drawer ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileNavToggle && mobileNavOverlay) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mobileNavOverlay.classList.contains('open');
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
        
        function openMobileNav() {
            mobileNavOverlay.classList.add('open');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        }
        
        function closeMobileNav() {
            mobileNavOverlay.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Unlock scrolling
        }
    }

    // --- 4. Navigation Spy & Scroll Reveal ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const navSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // Mirror active states in mobile links
                mobileLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px' // Triggers active link when section occupies center-third
    });
    
    sections.forEach(section => {
        navSpyObserver.observe(section);
    });
    
    // Page Elements Scroll Reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Project Storytelling (Scrollytelling) ---
    const narrativeChapters = document.querySelectorAll('.narrative-chapter');
    const drawingFrames = document.querySelectorAll('.drawing-frame');
    
    const scrollyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetChapter = entry.target.getAttribute('data-chapter');
                
                // Set narrative chapter text highlighted
                narrativeChapters.forEach(chap => {
                    if (chap.getAttribute('data-chapter') === targetChapter) {
                        chap.classList.add('active-chapter');
                    } else {
                        chap.classList.remove('active-chapter');
                    }
                });
                
                // Set visual drawing frame active on left panel
                drawingFrames.forEach(frame => {
                    if (frame.getAttribute('data-chapter') === targetChapter) {
                        frame.classList.add('active');
                    } else {
                        frame.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-25% 0px -35% 0px', // Center region of viewport triggers visual swaps
        threshold: 0.2
    });
    
    narrativeChapters.forEach(chap => {
        scrollyObserver.observe(chap);
    });
    
    // Global sub-sheet toggle function for chapters with multiple layouts
    window.toggleSubSheet = function(button, index) {
        const frame = button.closest('.drawing-frame');
        if (!frame) return;
        
        // Toggle tab active class
        const buttons = frame.querySelectorAll('.sub-toggle-tabs button');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Toggle image files inside split-sheets
        const images = frame.querySelectorAll('.split-sheets img');
        images.forEach((img, idx) => {
            if (idx === index) {
                img.style.display = 'block';
                // Sync the Zoom button target source to the currently selected active image sheet
                const zoomBtn = frame.querySelector('.zoom-btn');
                if (zoomBtn) {
                    zoomBtn.setAttribute('data-src', img.getAttribute('src'));
                }
            } else {
                img.style.display = 'none';
            }
        });
    };

    // --- 6. Skills Card Progress Bar Animations ---
    const skillCards = document.querySelectorAll('.skill-card');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillCards.forEach(card => {
        skillsObserver.observe(card);
    });

    // --- 7. CAD Drawing Lightbox Viewer (with Zoom & Pan Dragging) ---
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxViewport = document.querySelector('.lightbox-viewport');
    
    const closeBtn = document.querySelector('.lightbox-close-btn');
    const zoomInBtn = document.querySelector('.zoom-in-btn');
    const zoomOutBtn = document.querySelector('.zoom-out-btn');
    const resetZoomBtn = document.querySelector('.reset-zoom-btn');
    
    // Zoom and pan variables
    let scale = 1;
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let translateX = 0, translateY = 0;
    
    // Open Lightbox
    const zoomTriggers = document.querySelectorAll('.zoom-btn, .art-img-container, .view-sheet-btn');
    
    zoomTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const src = trigger.getAttribute('data-src');
            if (!src) return;
            
            // Extract a relevant caption
            let captionText = "Drawing Sheet Detail";
            const metaTag = trigger.closest('.drawing-frame')?.querySelector('.drawing-meta-tag');
            const artTitle = document.querySelector('.art-title');
            
            if (metaTag) {
                captionText = metaTag.textContent;
            } else if (trigger.closest('.art-section')) {
                captionText = artTitle ? `${artTitle.textContent} - Site Plan` : "Creative Art Centre Drawing";
            }
            
            openLightbox(src, captionText);
        });
    });
    
    function openLightbox(src, caption) {
        if (!lightbox || !lightboxImg) return;
        
        lightboxImg.src = src;
        if (lightboxCaption) {
            lightboxCaption.textContent = caption;
        }
        
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
        
        // Reset scale and translate offsets
        resetZoom();
        
        // Add active hovered classes to custom cursor inside lightbox
        if (cursor) {
            cursor.classList.remove('zoom-state');
            follower.classList.remove('zoom-state');
        }
    }
    
    function closeLightbox() {
        if (!lightbox) return;
        
        lightbox.classList.remove('open');
        document.body.style.overflow = ''; // Enable page scrolling
        
        if (lightboxImg) {
            lightboxImg.src = '';
        }
    }
    
    // Close events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Close if clicking outside controls and the viewport drawing image
            if (e.target === lightbox || e.target === lightboxViewport || e.target === lightbox.querySelector('.lightbox-content-container')) {
                closeLightbox();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Zoom and Position transformations
    function updateTransform() {
        if (!lightboxImg) return;
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        currentX = 0;
        currentY = 0;
        updateTransform();
    }
    
    // Zoom buttons events
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            scale = Math.min(scale * 1.3, 5); // Cap max zoom at 5x
            updateTransform();
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            scale = Math.max(scale / 1.3, 0.8); // Floor min zoom at 0.8x
            updateTransform();
        });
    }
    
    if (resetZoomBtn) {
        resetZoomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetZoom();
        });
    }
    
    // Mouse wheel zoom
    if (lightboxViewport) {
        lightboxViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY;
            if (delta < 0) {
                scale = Math.min(scale * 1.1, 5);
            } else {
                scale = Math.max(scale / 1.1, 0.8);
            }
            updateTransform();
        }, { passive: false });
        
        // --- Drag to Pan functionality ---
        lightboxViewport.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Only left click
            e.preventDefault();
            
            isDragging = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            
            updateTransform();
        });
        
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                currentX = translateX;
                currentY = translateY;
            }
        });
        
        // Touch supports for mobile panning
        lightboxViewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - currentX;
                startY = e.touches[0].clientY - currentY;
            }
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            
            updateTransform();
        }, { passive: false });
        
        window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                currentX = translateX;
                currentY = translateY;
            }
        });
    }
});

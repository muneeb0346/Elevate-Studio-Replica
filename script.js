// NavDropDown Fiunctionality
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownList = document.querySelector('.dropdown-list');
    const dropdown = document.querySelector('.dropdown');

    function closeDropdown() {
        dropdownList.style.display = 'none';
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }

    function openDropdown() {
        dropdownList.style.display = 'block';
        dropdownToggle.setAttribute('aria-expanded', 'true');
    }

    dropdownToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        const currentDisplay = window.getComputedStyle(dropdownList).display;
        if (currentDisplay === 'none') {
            openDropdown();
        } else {
            closeDropdown();
        }
    });

    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    dropdownList.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) {
            closeDropdown();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeDropdown();
        }
    });
});

// Hero Section Scroll-position Based Animation
document.addEventListener('DOMContentLoaded', () => {
    const desktopBreakpoint = 992;

    const desktopSettings = {
        startPercent: 0.5,
        endPercent: 0.85
    };

    const tabletSettings = {
        startPercent: 0.65,
        endPercent: 1.0
    };

    const animationContainer = document.querySelector('.hero-section');

    if (!animationContainer) {
        console.error("Animation container (.hero-section) not found.");
        return;
    }

    const elevateImage = document.getElementById('elevate');
    const studioImage = document.getElementById('studio');

    if (!elevateImage || !studioImage) {
        console.error("Animation elements not found inside .hero-section.");
        return;
    }

    let currentSettings;
    let dynamicPixelSettings = { startScroll: 0, endScroll: 0 };

    let targetElevateX = 0;
    let currentElevateX = 0;
    let targetStudioX = 0;
    let currentStudioX = 0;
    const smoothingFactor = 0.1;

    function calculatePixelValues() {
        const containerTop = animationContainer.offsetTop;
        const containerHeight = animationContainer.offsetHeight;
        const viewportHeight = window.innerHeight;

        const journeyStart = containerTop - viewportHeight;
        const journeyEnd = containerTop + containerHeight;
        const totalJourney = journeyEnd - journeyStart;

        dynamicPixelSettings.startScroll = journeyStart + (totalJourney * currentSettings.startPercent);
        dynamicPixelSettings.endScroll = journeyStart + (totalJourney * currentSettings.endPercent);
    }

    function updateTargetValues() {
        const currentScroll = window.scrollY;
        const animationRange = dynamicPixelSettings.endScroll - dynamicPixelSettings.startScroll;

        if (animationRange <= 0) {
            if (currentScroll < dynamicPixelSettings.startScroll) {
                targetElevateX = 0;
                targetStudioX = 0;
            } else if (currentScroll > dynamicPixelSettings.endScroll) {
                targetElevateX = -100;
                targetStudioX = 100;
            }
            return;
        }

        let scrollProgress = (currentScroll - dynamicPixelSettings.startScroll) / animationRange;
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        targetElevateX = -100 * scrollProgress;
        targetStudioX = 100 * scrollProgress;
    }

    function checkBreakpoint() {
        if (window.innerWidth >= desktopBreakpoint) {
            currentSettings = desktopSettings;
        } else {
            currentSettings = tabletSettings;
        }
        calculatePixelValues();
        updateTargetValues();
    }

    function smoothAnimationLoop() {
        let deltaElevate = targetElevateX - currentElevateX;
        let deltaStudio = targetStudioX - currentStudioX;

        currentElevateX += deltaElevate * smoothingFactor;
        currentStudioX += deltaStudio * smoothingFactor;

        if (Math.abs(deltaElevate) < 0.01) currentElevateX = targetElevateX;
        if (Math.abs(deltaStudio) < 0.01) currentStudioX = targetStudioX;

        elevateImage.style.transform = `translateX(${currentElevateX}%)`;
        studioImage.style.transform = `translateX(${currentStudioX}%)`;

        requestAnimationFrame(smoothAnimationLoop);
    }

    function throttle(func, limit) {
        let inThrottle;
        return function () {
            if (!inThrottle) {
                func.apply(this, arguments);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    const throttledUpdate = throttle(updateTargetValues, 16);
    const throttledResize = throttle(checkBreakpoint, 200);

    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('resize', throttledResize);

    checkBreakpoint();
    smoothAnimationLoop();
});

// Animations on Scroll Handler
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-down, .grow-in, .grow-big-in, .fade-in');
    console.log(elementsToAnimate);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
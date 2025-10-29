// NavDropDown Fiunctionality
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownList = document.querySelector('.dropdown-list');
    const dropdown = document.querySelector('.dropdown');

    function closeDropdown() {
        dropdownList.style.display = 'none';
    }

    function openDropdown() {
        dropdownList.style.display = 'block';
    }

    // 1. Toggle dropdown on button click
    dropdownToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        const currentDisplay = window.getComputedStyle(dropdownList).display;
        if (currentDisplay === 'none') {
            openDropdown();
        } else {
            closeDropdown();
        }
    });

    // 2. Close dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    // 3. Close dropdown when any link or button inside is clicked
    dropdownList.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) {
            closeDropdown();
        }
    });

    // 4. Close dropdown on 'Escape' key press
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
        startPercent: 0.0,
        endPercent: 0.7
    };

    const tabletSettings = {
        startPercent: 0.0,
        endPercent: 1.0
    };

    const animationContainer = document.querySelector('.div-block');

    if (!animationContainer) {
        console.error("Animation container (.div-block) not found.");
        return;
    }

    const elevateImage = document.getElementById('elevate');
    const studioImage = document.getElementById('studio');

    if (!elevateImage || !studioImage) {
        console.error("Animation elements not found inside .div-block.");
        return;
    }

    let currentSettings;
    let dynamicPixelSettings = { startScroll: 0, endScroll: 0 };

    let targetElevateX = 0;
    let currentElevateX = 0;
    let targetStudioX = 0;
    let currentStudioX = 0;
    const smoothingFactor = 0.2;

    function calculatePixelValues() {
        const containerHeight = animationContainer.offsetHeight;

        dynamicPixelSettings.startScroll = containerHeight * currentSettings.startPercent;
        dynamicPixelSettings.endScroll = containerHeight * currentSettings.endPercent;
    }

    function updateTargetValues() {
        const currentScroll = window.scrollY;
        const animationRange = dynamicPixelSettings.endScroll - dynamicPixelSettings.startScroll;

        if (animationRange <= 0) return;

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

    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('resize', throttle(checkBreakpoint, 200));

    checkBreakpoint();
    smoothAnimationLoop();
});
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
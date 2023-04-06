(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 300) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 300) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 300) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".menu__icon")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".menu__icon")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
                document.querySelector(".menu__body").classList.toggle("menu-open");
                document.querySelector(".blackout").classList.toggle("active");
            }
            if (bodyLockStatus && e.target.closest(".menu__link")) {
                bodyUnlock();
                document.documentElement.classList.remove("menu-open");
                document.querySelector(".menu__body").classList.remove("menu-open");
                document.querySelector(".blackout").classList.remove("active");
            }
            if (bodyLockStatus && !e.target.closest(".menu__body")) {
                bodyUnlock();
                document.documentElement.classList.remove("menu-open");
                document.querySelector(".menu__body").classList.remove("menu-open");
                document.querySelector(".blackout").classList.remove("active");
            }
        }));
    }
    const popupLinks = document.querySelectorAll(".popup-link");
    const closeIcon = document.querySelector(".popup__close");
    if (popupLinks.length > 0) popupLinks.forEach((link => {
        link.addEventListener("click", (function(event) {
            const popup = document.querySelector(".popup");
            popupOpen(popup);
            event.preventDefault();
        }));
    }));
    if (closeIcon) closeIcon.addEventListener("click", (function(event) {
        popupClose(event.target.closest(".popup"));
    }));
    function popupOpen(popup) {
        if (popup && bodyLockStatus) {
            bodyLock();
            popup.classList.add("popup-open");
            popup.addEventListener("click", (function(event) {
                if (!event.target.closest(".popup__content")) popupClose(event.target.closest(".popup"));
            }));
        }
    }
    function popupClose(popup) {
        if (bodyLockStatus) {
            bodyUnlock();
            popup.classList.remove("popup-open");
        }
    }
    isWebp();
    menuInit();
})();
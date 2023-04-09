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
    const arrowLeft = document.querySelector(".arrow--l");
    const arrowRight = document.querySelector(".arrow--r");
    const slider = document.querySelector(".slider__wrapper");
    let columnLeft = document.querySelector(".column-left");
    let columnRight = document.querySelector(".column-right");
    let petsInfo;
    let activeNames = [];
    let prevActiveNames = [];
    const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    (async () => {
        const file = "files/pets.json";
        const result = await fetch(file);
        petsInfo = await result.json();
    })();
    function createCard(i) {
        let index;
        do {
            index = getRandomNum(1, 8);
        } while (activeNames.includes(`${petsInfo[index]["name"]}`) || prevActiveNames.includes(`${petsInfo[index]["name"]}`));
        const card = document.createElement("div");
        card.classList.add("pets__column");
        card.classList.add(`column--${++i}`);
        card.innerHTML = `\n\t\t\t\t\t\t<div class="pets__card card popup-link">\n\t\t\t\t\t\t\t<div class="card__image"><img src="${petsInfo[index]["img"]}" alt="pet"></div>\n\t\t\t\t\t\t\t<div class="card__name">${petsInfo[index]["name"]}</div>\n\t\t\t\t\t\t\t<a href="#" class="card__button btn btn--w"><span>Learn more</span></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t`;
        activeNames.push(petsInfo[index]["name"]);
        return card;
    }
    const moveLeft = () => {
        prevActiveNames = [];
        for (let petsColumn of columnLeft.children) {
            let card = petsColumn.children[0];
            prevActiveNames.push(card.children[1].textContent);
        }
        slider.classList.add("move-left");
        arrowLeft.removeEventListener("click", moveLeft);
        arrowRight.removeEventListener("click", moveRight);
    };
    const moveRight = () => {
        prevActiveNames = [];
        for (let petsColumn of columnRight.children) {
            let card = petsColumn.children[0];
            prevActiveNames.push(card.children[1].textContent);
        }
        slider.classList.add("move-right");
        arrowLeft.removeEventListener("click", moveLeft);
        arrowRight.removeEventListener("click", moveRight);
    };
    arrowLeft.addEventListener("click", moveLeft);
    arrowRight.addEventListener("click", moveRight);
    slider.addEventListener("animationend", (animationEvent => {
        if ("move-left" === animationEvent.animationName) {
            slider.classList.remove("move-left");
            document.querySelector(".column-active").innerHTML = columnLeft.innerHTML;
        } else {
            slider.classList.remove("move-right");
            document.querySelector(".column-active").innerHTML = columnRight.innerHTML;
        }
        columnLeft = changeColumn(columnLeft);
        columnRight = changeColumn(columnRight);
        arrowLeft.addEventListener("click", moveLeft);
        arrowRight.addEventListener("click", moveRight);
    }));
    function changeColumn(column) {
        column.innerHTML = "";
        activeNames = [];
        for (let i = 0; i < 3; i++) {
            const card = createCard(i);
            column.append(card);
        }
        return column;
    }
    const popupLinks = document.querySelectorAll(".popup-link");
    const closeIcon = document.querySelector(".popup__close");
    const popupImage = document.querySelector(".popup__image");
    const popupTitle = document.querySelector(".popup__title");
    const popupSubtitle = document.querySelector(".popup__subtitle");
    const popupText = document.querySelector(".popup__text");
    const popupList = document.querySelectorAll(".popup__list--item");
    if (popupLinks.length > 0) popupLinks.forEach((link => {
        link.addEventListener("click", (function(event) {
            const popup = document.querySelector(".popup");
            const petName = link.children[1].textContent;
            popupFill(popup, petName);
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
    async function popupFill(popup, petName) {
        const file = "files/pets.json";
        const result = await fetch(file);
        const petsInfo = await result.json();
        const length = petsInfo.length;
        let infoIndex;
        for (infoIndex = 0; infoIndex < length; infoIndex++) if (petsInfo[infoIndex]["name"] === petName) break;
        popupImage.firstChild.setAttribute("src", petsInfo[infoIndex]["img"]);
        popupTitle.textContent = petsInfo[infoIndex]["name"];
        popupSubtitle.textContent = petsInfo[infoIndex]["type"] + " - " + petsInfo[infoIndex]["breed"];
        popupText.textContent = petsInfo[infoIndex]["description"];
        popupList[0].lastChild.textContent = petsInfo[infoIndex]["age"];
        popupList[1].lastChild.textContent = petsInfo[infoIndex]["inoculations"].join(", ");
        popupList[2].lastChild.textContent = petsInfo[infoIndex]["diseases"].join(", ");
        popupList[3].lastChild.textContent = petsInfo[infoIndex]["parasites"].join(", ");
    }
    isWebp();
    menuInit();
})();
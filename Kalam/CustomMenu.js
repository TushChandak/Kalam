nsCustomMenu = {



    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //
    // H E L P E R    F U N C T I O N S
    //
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    /**
     * Function to check if we clicked inside an element with a particular class
     * name.
     * 
     * @param {Object} e The event
     * @param {String} className The class name to check against
     * @return {Boolean}
     */
    clickInsideElement: function (e, className) {
        var el = e.srcElement || e.target;

        if (el.classList.contains(className)) {
            return el;
        } else {
            while (el = el.parentNode) {
                if (el.classList && el.classList.contains(className)) {
                    return el;
                }
            }
        }

        return false;
    },

    /**
     * Get's exact position of event.
     * 
     * @param {Object} e The event passed in
     * @return {Object} Returns the x and y position
     */
    getPosition: function (e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    },
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //
    // C O R E    F U N C T I O N S
    //
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    /**
     * Variables.
     */
    contextMenuClassName: "context-menu",
    contextMenuItemClassName: "context-menu__item",
    contextMenuLinkClassName: "context-menu__link",
    contextMenuActive: "context-menu--active",

    taskItemClassName: "MarkCursor",
    taskItemInContext: null,

    clickCoords: null,
    clickCoordsX: null,
    clickCoordsY: null,

    menu: document.querySelector("#context-menu"),
    menuItems: this.menu.querySelectorAll(".context-menu__item"),
    menuState: 0,
    menuWidth: 0,
    menuHeight: 0,
    menuPosition: 0,
    menuPositionX: 0,
    menuPositionY: 0,

    windowWidth: 0,
    windowHeight: 0,
    /**
               * Initialise our application's code.
               */

    /**
             * Listens for contextmenu events.
             */
    contextListener: function () {
        document.addEventListener("contextmenu", function (e) {
            nsCustomMenu.taskItemInContext = nsCustomMenu.clickInsideElement(e, nsCustomMenu.taskItemClassName);

            if (nsCustomMenu.taskItemInContext) {
                e.preventDefault();
                nsCustomMenu.toggleMenuOn();
                nsCustomMenu.positionMenu(e);
            } else {
                nsCustomMenu.taskItemInContext = null;
                nsCustomMenu.toggleMenuOff();
            }
        });
    },
    /**
             * Listens for click events.
             */
    clickListener: function () {
        document.addEventListener("click", function (e) {
            var clickeElIsLink = nsCustomMenu.clickInsideElement(e, nsCustomMenu.contextMenuLinkClassName);

            if (clickeElIsLink) {
                e.preventDefault();
                nsCustomMenu.menuItemListener(clickeElIsLink);
            } else {
                var button = e.which || e.button;
                if (button === 1) {
                    nsCustomMenu.toggleMenuOff();
                }
            }
        });
    },
    /**
             * Listens for keyup events.
             */
    keyupListener: function () {
        window.onkeyup = function (e) {
            if (e.keyCode === 27) {
                nsCustomMenu.toggleMenuOff();
            }
        }
    },
    /**
             * Window resize event listener
             */
    resizeListener: function () {
        window.onresize = function (e) {
            nsCustomMenu.toggleMenuOff();
        };
    },

    /**
     * Turns the custom context menu on.
     */
    toggleMenuOn: function () {
        if (nsCustomMenu.menuState !== 1) {
            nsCustomMenu.menuState = 1;
            nsCustomMenu.menu.classList.add(nsCustomMenu.contextMenuActive);
        }
    },
    /**
             * Turns the custom context menu off.
             */
    toggleMenuOff: function () {
        if (nsCustomMenu.menuState !== 0) {
            nsCustomMenu.menuState = 0;
            nsCustomMenu.menu.classList.remove(nsCustomMenu.contextMenuActive);
        }
    },
    /**
             * Positions the menu properly.
             * 
             * @param {Object} e The event
             */
    positionMenu: function (e) {
        nsCustomMenu.clickCoords = nsCustomMenu.getPosition(e);
        nsCustomMenu.clickCoordsX = nsCustomMenu.clickCoords.x;
        nsCustomMenu.clickCoordsY = nsCustomMenu.clickCoords.y;

        nsCustomMenu.menuWidth = nsCustomMenu.menu.offsetWidth + 4;
        nsCustomMenu.menuHeight = nsCustomMenu.menu.offsetHeight + 4;

        nsCustomMenu.windowWidth = nsCustomMenu.window.innerWidth;
        nsCustomMenu.windowHeight = nsCustomMenu.window.innerHeight;

        if ((nsCustomMenu.windowWidth - nsCustomMenu.clickCoordsX) < nsCustomMenu.menuWidth) {
            nsCustomMenu.menu.style.left = nsCustomMenu.windowWidth - nsCustomMenu.menuWidth + "px";
        } else {
            nsCustomMenu.menu.style.left = nsCustomMenu.clickCoordsX + "px";
        }

        if ((nsCustomMenu.windowHeight - nsCustomMenu.clickCoordsY) < nsCustomMenu.menuHeight) {
            nsCustomMenu.menu.style.top = nsCustomMenu.windowHeight - nsCustomMenu.menuHeight + "px";
        } else {
            nsCustomMenu.menu.style.top = nsCustomMenu.clickCoordsY + "px";
        }
    },

    /**
     * Dummy action function that logs an action when a menu item link is clicked
     * 
     * @param {HTMLElement} link The link that was clicked
     */
    menuItemListener: function (link) {
        console.log("Task ID - " + nsCustomMenu.taskItemInContext.getAttribute("data-id") + ", Task action - " + nsCustomMenu.link.getAttribute("data-action"));
        nsCustomMenu.toggleMenuOff();
    },
    init: function () {
        alert("sd");
        nsCustomMenu.contextListener();
        nsCustomMenu.clickListener();
        nsCustomMenu.keyupListener();
        nsCustomMenu.resizeListener();
    },
}



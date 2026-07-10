export function initializeAnimations() {

    const sidebar =
        document.getElementById("sidebar");

    const content =
        document.querySelector(".content-area");

    if (!sidebar || !content) return;

    function updateLayout() {

        if (window.innerWidth <= 768) {

            content.style.marginLeft = "0";

            return;

        }

        if (sidebar.classList.contains("collapsed")) {

            content.style.marginLeft = "80px";

        } else {

            content.style.marginLeft = "260px";

        }

    }

    updateLayout();

    const observer = new MutationObserver(updateLayout);

    observer.observe(sidebar, {

        attributes: true,

        attributeFilter: ["class"]

    });

    window.addEventListener("resize", updateLayout);

}
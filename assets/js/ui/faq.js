export function initializeFaq() {

    const items = document.querySelectorAll(".faq-item");

    if (!items.length) return;

    items.forEach((item) => {

        const button = item.querySelector(".faq-question");

        if (!button) return;

        if (button.dataset.bound) return;
        button.dataset.bound = "true";

        button.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            items.forEach((i) => i.classList.remove("active"));

            if (!isActive) {
                item.classList.add("active");
            }

        });

    });

}
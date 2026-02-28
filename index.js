document.addEventListener("DOMContentLoaded", () => {
    
    // =======================
    // 1. 3D TILT EFFECT (Existing)
    // =======================
    const cards = document.querySelectorAll(".card"); // For languages.html cards
    const imageCards = document.querySelectorAll(".image-card"); // For index.html images

    // Helper function for tilt logic
    const applyTilt = (element) => {
        element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Tilt calculation
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Update CSS vars for glow
            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });

        element.addEventListener("mouseleave", () => {
            element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
        });
    };

    // Apply to both sets of cards if they exist
    cards.forEach(applyTilt);
    imageCards.forEach(applyTilt);


    // =======================
    // 2. MODAL LOGIC (New)
    // =======================
    const modal = document.getElementById("infoModal");
    const closeBtn = document.querySelector(".close-btn");
    
    // Elements inside modal to update
    const mFlag = document.getElementById("m-flag");
    const mCountry = document.getElementById("m-country");
    const mDesc = document.getElementById("m-desc");
    const mFact = document.getElementById("m-fact");

    // Open Modal when Image Card is clicked
    if (modal) {
        imageCards.forEach(card => {
            card.addEventListener("click", () => {
                // Get data from clicked card
                const country = card.getAttribute("data-country");
                const flag = card.getAttribute("data-flag");
                const desc = card.getAttribute("data-desc");
                const fact = card.getAttribute("data-fact");

                // Populate Modal
                mCountry.textContent = country;
                mFlag.textContent = flag;
                mDesc.textContent = desc;
                mFact.textContent = fact;

                // Show Modal
                modal.classList.add("active");
            });
        });

        // Close Modal on X button click
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // Close Modal when clicking outside the box
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });

        // Close Modal on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                modal.classList.remove("active");
            }
        });
    }

    // =======================
    // 3. SEARCH FILTER (New)
    // =======================
    const searchInput = document.getElementById("searchInput");
    const countryCards = document.querySelectorAll(".portal-card");

    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const term = e.target.value.toLowerCase();

            countryCards.forEach(card => {
                const name = card.getAttribute("data-name").toLowerCase();
                const lang = card.getAttribute("data-lang").toLowerCase();

                if (name.includes(term) || lang.includes(term)) {
                    card.style.display = "block";
                    // Add a tiny animation reset to make it pop
                    card.style.animation = "fadeUp 0.5s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

});


document.addEventListener("DOMContentLoaded", () => {
    
    // =======================
    // 1. 3D HOLOGRAPHIC TILT 
    // =======================
    const imageCards = document.querySelectorAll(".image-card");

    const applyTilt = (element) => {
        element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // Increased intensity
            const rotateY = ((x - centerX) / centerX) * 15;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener("mouseleave", () => {
            element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
        });
    };

    imageCards.forEach(applyTilt);

    // =======================
    // 2. GAME LOGIC & MODAL
    // =======================
    const modal = document.getElementById("infoModal");
    const closeBtn = document.querySelector(".close-btn");
    const mFlag = document.getElementById("m-flag");
    const mCountry = document.getElementById("m-country");
    const mDesc = document.getElementById("m-desc");
    const mFact = document.getElementById("m-fact");
    
    let score = 0;
    const scoreDisplay = document.getElementById("score");

    if (modal) {
        imageCards.forEach(card => {
            card.addEventListener("click", () => {
                // Game Mechanic: Update Score if not already discovered
                if (!card.classList.contains("discovered")) {
                    card.classList.add("discovered");
                    card.querySelector(".status-badge").textContent = "Extracted";
                    score++;
                    scoreDisplay.textContent = score;
                    
                    // Simple pop animation on score update
                    scoreDisplay.style.transform = "scale(1.5)";
                    scoreDisplay.style.color = "#ff4d4d";
                    setTimeout(() => {
                        scoreDisplay.style.transform = "scale(1)";
                        scoreDisplay.style.color = "#fff";
                    }, 300);
                }

                // Populate Modal
                mCountry.textContent = card.getAttribute("data-country");
                mFlag.textContent = card.getAttribute("data-flag");
                mDesc.textContent = card.getAttribute("data-desc");
                mFact.textContent = card.getAttribute("data-fact");

                // Show Modal
                modal.classList.add("active");
            });
        });

        const closeModal = () => modal.classList.remove("active");

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
        });
    }

    // =======================
    // 3. SEARCH / FILTER
    // =======================
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const term = e.target.value.toLowerCase();

            imageCards.forEach(card => {
                const name = card.getAttribute("data-country").toLowerCase();
                const desc = card.getAttribute("data-desc").toLowerCase();

                if (name.includes(term) || desc.includes(term)) {
                    card.style.display = "block";
                    card.style.animation = "fadeUp 0.5s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});
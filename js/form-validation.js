const form = document.querySelector("#contact-form");

if (form) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const subjectInput = document.querySelector("#subject");
    const messageInput = document.querySelector("#message");

    const successMessage = document.querySelector(".form-success");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let isValid = true;

        // Clear previous messages
        document.querySelectorAll(".form-error").forEach(function (error) {
            error.textContent = "";
        });

        successMessage.textContent = "";

        // Name validation
        if (nameInput.value.trim() === "") {
            nameInput
                .closest(".form-group")
                .querySelector(".form-error")
                .textContent = "Please enter your name.";

            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === "") {
            emailInput
                .closest(".form-group")
                .querySelector(".form-error")
                .textContent = "Please enter your email.";

            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailInput
                .closest(".form-group")
                .querySelector(".form-error")
                .textContent = "Please enter a valid email.";

            isValid = false;
        }

        // Subject validation
        if (subjectInput.value.trim() === "") {
            subjectInput
                .closest(".form-group")
                .querySelector(".form-error")
                .textContent = "Please enter a subject.";

            isValid = false;
        }

        // Message validation
        if (messageInput.value.trim() === "") {
            messageInput
                .closest(".form-group")
                .querySelector(".form-error")
                .textContent = "Please enter your message.";

            isValid = false;
        }

        // Stop if validation fails
        if (!isValid) {
            return;
        }

        // Disable button while sending
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                successMessage.textContent =
                    "Thank you! Your message has been sent successfully.";

                form.reset();
            } else {
                successMessage.textContent =
                    "Something went wrong. Please try again.";
            }

        } catch (error) {
            successMessage.textContent =
                "Unable to send your message. Please try again later.";
        }

        // Restore button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
}
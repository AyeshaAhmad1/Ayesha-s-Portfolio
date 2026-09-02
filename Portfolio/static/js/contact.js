document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.getElementById("contact-form");
    const contactStatus = document.getElementById("contact-status");

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        contactStatus.textContent = "Sending message...";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch("/contact/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {

                contactStatus.textContent = "Message sent successfully!";

                contactForm.reset();

            } else {

                contactStatus.textContent =
                    "Error sending message. Please try again.";

            }

        } catch (error) {

            console.error("Contact form error:", error);

            contactStatus.textContent =
                "Unable to send your message. Please try again.";

        }

    });

});
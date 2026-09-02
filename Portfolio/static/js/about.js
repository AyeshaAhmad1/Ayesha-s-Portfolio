document.addEventListener("DOMContentLoaded", async function () {

    console.log("About JavaScript loaded");

    const introduction = document.querySelector(".about_intro");
    const education = document.querySelector(".education-card");
    const location = document.querySelector(".location-card");
    const interestscard = document.querySelector(".interests-card");
    const techstackContainer = document.querySelector(".tech_stack_container");

    try {

        const response = await fetch("/about/data/");

        if (!response.ok) {
            throw new Error("Failed to connect");
        }

        const data = await response.json();

        console.log("Data received:", data);


        
        // =========================================
        // INTRODUCTION
        // =========================================

       
        data.introduction.forEach(paragraph => {
            const p = document.createElement("p");
            p.textContent = paragraph;

            introduction.appendChild(p);
            });
      


        // =========================================
        // EDUCATION
        // =========================================

        education.innerHTML = `
            <div class="info_icon">
                <i class="fa-solid fa-graduation-cap"></i>
            </div>

            <h3>Education</h3>

            <p>
                <strong>University:</strong>
                ${data.Education.University}
            </p>

            <p>
                <strong>Degree:</strong>
                ${data.Education.Degree}
            </p>

            <p>
                <strong>Semester:</strong>
                ${data.Education.Semester}
            </p>
            <p>
                <strong>CGPA:</strong>
                ${data.Education.CGPA}
            </p>
        `;


        // =========================================
        // LOCATION
        // =========================================

        location.innerHTML = `
            <div class="info_icon">
                <i class="fa-solid fa-location-dot"></i>
            </div>

            <h3>Location</h3>

            <p>${data.Location.city}</p>

            <p>${data.Location.country}</p>
        `;


        // =========================================
        // INTERESTS
        // =========================================

        interestscard.innerHTML = `
            <div class="info_icon">
                <i class="fa-solid fa-heart"></i>
            </div>

            <h3>Interests</h3>

            <ul>
                ${data.Interests.map(interest =>
                    `<li>${interest}</li>`
                ).join("")}
            </ul>
        `;


        // =========================================
        // TECH STACK
        // =========================================

        techstackContainer.innerHTML = `
            <div class="tech-stack-container">

                ${data.Tech_stack.map(tech => `
                    <div class="tech-item">

                        <i class="${tech.icon}"></i>

                        <span>${tech.name}</span>

                    </div>
                `).join("")}

            </div>
        `;


    } catch (error) {

        console.error("Error fetching about data:", error);

    }

});
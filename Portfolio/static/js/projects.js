
document.addEventListener("DOMContentLoaded", function () {

    console.log("project javascript loaded");

    const projectlist = document.getElementById("projects-list");


    async function loadproject() {

        try {

            const response = await fetch("/projects/data/");

            const projects = await response.json();


            projectlist.innerHTML = "";


            projects.forEach(function (project) {


                // Project item
                const projectItem = document.createElement("article");

                projectItem.classList.add("project-item");


                // Project image
                const projectImage = document.createElement("img");

                projectImage.src = project.image;

                projectImage.alt = project.name;

                projectItem.appendChild(projectImage);


                // Project content
                const projectContent = document.createElement("div");

                projectContent.classList.add("project-content");


                // Project title
                const projectTitle = document.createElement("h2");

                projectTitle.classList.add("project-title");

                projectTitle.textContent = project.name;


                // Project description
                const projectDescription = document.createElement("p");

                projectDescription.classList.add("project-description");

                projectDescription.textContent = project.description;


                // Tech stack
                const techStack = document.createElement("p");

                techStack.classList.add("project-tech-stack");

                techStack.textContent = project.tech_stack;


                // Project links
                const projectLinks = document.createElement("div");

                projectLinks.classList.add("project-links");


                // GitHub link
                const githubLink = document.createElement("a");

                githubLink.classList.add(
                    "project-link",
                    "github-link"
                );

                githubLink.href = project.git_url;

                githubLink.textContent = "GitHub";

                githubLink.target = "_blank";

                githubLink.rel = "noopener noreferrer";

                projectLinks.appendChild(githubLink);


                // Live Demo link
                if (project.live_demo) {

                    const liveDemoLink = document.createElement("a");

                    liveDemoLink.classList.add(
                        "project-link",
                        "demo-link"
                    );

                    liveDemoLink.href = project.live_demo;

                    liveDemoLink.textContent = "Live Demo";

                    liveDemoLink.target = "_blank";

                    liveDemoLink.rel = "noopener noreferrer";

                    projectLinks.appendChild(liveDemoLink);

                }


                // Add content
                projectContent.appendChild(projectTitle);

                projectContent.appendChild(projectDescription);

                projectContent.appendChild(techStack);

                projectContent.appendChild(projectLinks);


                // Add content to project item
                projectItem.appendChild(projectContent);


                // Add project to the page
                projectlist.appendChild(projectItem);

            });

        }

        catch (error) {

            console.error("Error loading projects:", error);

        }

    }


    // Run the function
    loadproject();

});


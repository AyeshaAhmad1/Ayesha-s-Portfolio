const languagesList = document.getElementById('languages-list');
const skillCategory = document.querySelector('.skill-category');
const webTechnologiesList = document.getElementById('web-technologies-list');
const frameworksToolsList = document.getElementById('frameworks-tools-list');
const skillLevelList = document.getElementById('skill-level-list');

document.addEventListener('DOMContentLoaded', async function () {

    console.log("Skills JavaScript loaded");

    const response = await fetch('/skills/data/');

    const data = await response.json();




    languagesList.innerHTML = data.languages.map(language => `
    
        <div class="skill-box">

            <i class="${language.icon}"></i>

            <span>${language.name}</span>

        </div>

    `).join('');

    webTechnologiesList.innerHTML = data.Technologies.map(tech => `
        <div class = "skill-box">

            <i class="${tech.icon}"></i>

            <span>${tech.name}</span>

        </div>

    `).join('');
    frameworksToolsList.innerHTML = data.Tools.map(tools => `
        <div class = "skill-box">

            <i class="${tools.icon}"></i>

            <span>${tools.name}</span>

        </div>
        
    `).join('');

    const allSkills = [
    ...data.languages,
    ...data.Technologies,
    
    ];

    skillLevelList.innerHTML = allSkills.map(skill => `
    
    <div class="skill-level-card">

        <div class="skill-level-info">

            <i class="${skill.icon}"></i>

            <div>

                <h3>${skill.name}</h3>

                <span>${skill.label}</span>

            </div>

        </div>

        <div class="skill-dots">


        
        ${
            Array.from({length : 10} , (_, index) => `
        <span class = "dot ${index < skill.level ? 'filled' : ''}"></span> `).join( " " )
        }
    

        

        </div>

        <p>${skill.note}</p>

    </div>

`).join('');
    })

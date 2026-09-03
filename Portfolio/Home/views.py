from django.core.serializers import python
from django.shortcuts import render
from django.http import JsonResponse
from .models import Project
import os
import resend

def home (request):
    return render(request , 'home.html')
def about(request):
    return render(request, 'about.html')
def skills(request):
    return render(request ,'skills.html')
def projects(request):
    return render(request , 'projects.html')

def about_data(request):
    data ={
       "introduction": [
            """I am a Software Engineering student at the National University of
            Modern Languages (NUML), Faisalabad, currently building my foundation
            in software development and exploring different areas of technology.
            My programming journey began with learning the fundamentals of
            programming, where I started understanding how logic, problem-solving,
            and structured thinking can be used to turn an idea into a working
            solution.""",

            """As I continued learning, I explored languages and technologies such as
            C++, Java, and Python, which helped me understand different approaches
            to software development. Over time, my interest moved toward building
            real-world applications, leading me to work with Django and develop
            full-stack projects such as Aura, an AI-powered voice assistant.""",

            """I enjoy continuously learning new technologies, improving my development
            skills, and turning ideas into practical applications that solve
            real-world problems."""
        ],
        "Education" : {
            "University" : "National University of Modern Languages (NUML), Faisalabad",
            "Degree" : "BS Software Engineering",
            "Semester" : "3rd Semester",
            "CGPA" : "3.95/4.0",
            },
        "Location" : {
            "city" : "Faisalabad",
            "country" : "Pakistan",
        },
        "Interests" : [
            "Backend development",
            "Web development",
            "Machine learning and data science",
            "Software Engineering",
        ],
        "Tech_stack" : [
            { "name": "Python", "icon": "devicon-python-plain" },
            { "name": "Django", "icon": "devicon-django-plain" },
            { "name": "C++", "icon": "devicon-cplusplus-plain" },
            { "name": "Java", "icon": "devicon-java-plain" },
            { "name": "HTML5", "icon": "devicon-html5-plain" },
            { "name": "CSS3", "icon": "devicon-css3-plain" },
            { "name": "JavaScript", "icon": "devicon-javascript-plain" },
            { "name": "GitHub", "icon": "devicon-github-plain" },
            { "name": "Git", "icon": "devicon-git-plain" },
            {"name" : "VS CODE" , "icon" : "devicon-vscode-plain"},
        ]
    }
    return JsonResponse(data)

def skills_data(request):
    data = {
        "languages" : [
            {
                "name" : "Python",
                "level" : 9,
                "label" : "Advanced",
                "icon": "devicon-python-plain",
                "note" : "strong foundation with practicle experience in python development."

            },
            {
                "name" : "C++",
                "level" : 9,
                "label" : "Advanced",
                "icon": "devicon-cplusplus-plain",
                "note" : "Strong understanding of programming fundamentals and problem solving."
                
            },
            {
                "name" : "Java",
                "level" : 8,
                "label" : "Comfortable",
                "icon": "devicon-java-plain",
                "note" : "Experience with object-oriented programming and desktop applications."
                            
            },

        ],
        "Technologies" : [
            {
                "name": "Django",
                "level": 7,
                "label": "Comfortable",
                "icon": "devicon-django-plain",
                "note": "Hands-on experience building and deploying full-stack web applications."
            },
            {
                "name": "HTML",
                "level": 8,
                "label": "Comfortable",
                "icon": "devicon-html5-plain",
                "note": "Strong understanding of structuring responsive web interfaces."
             },
                         {
                "name": "CSS",
                "level": 6,
                "label": "Fundamentals",
                "icon": "devicon-css3-plain",
                "note": "Comfortable creating responsive and customized user interfaces."
            },
            {
                "name": "JavaScript",
                "level": 7,
                "label": "Comfortable",
                "icon": "devicon-javascript-plain",
                "note": "Experience with DOM manipulation, asynchronous requests, and dynamic interfaces."
            }
            ],
            "Tools" : [
                {
                    "name" : "Git",
                    "icon": "devicon-git-plain"
                },
                {
                    "name" : "GitHub",
                    "icon": "devicon-github-plain"
                },
                {
                    "name" : "VS CODE",
                    "icon": "devicon-vscode-plain"
                },

            ]

        
    }
    return JsonResponse(data)
   

def projects_data(request):
    projects = Project.objects.all()

    images = {
        "Aura AI Assistant": "/static/static/projects/AURAgui.jpeg",
        "Aura_Voice_Assistent": "/static/static/projects/pythonaura.png",
        "Online Voting System with Admin Control": "/static/static/projects/onlinevotingjava.png",
        "Tic-Tac-Toe Game": "/static/static/projects/tictactoe.png",
        "Rock Paper Scissors Game": "/static/static/projects/rockpaperscissors.png",
        "KBC Quiz Game": "/static/static/projects/KBC.png",
        "Java Swing Calculator Application": "/static/static/projects/calculator.png",
        "Student Contact Form – Java Swing GUI Application": "/static/static/projects/studentcontactform.png",
        "E-Voting System – C++ Console-Based Application": "/static/static/projects/c++voting.png",
    }

    data = []

    for project in projects:
        data.append({
            "name": project.name,
            "description": project.description,
            "image": images.get(project.name, ""),
            "tech_stack": project.tech_stack,
            "git_url": project.git_url,
            "live_demo": project.live_demo or "",
        })

    return JsonResponse(data, safe=False)




def contact(request):
    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        purpose = request.POST.get("purpose")

        resend.api_key = os.getenv("RESEND_API_KEY")

        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": ["developer.ayeshaahmad@gmail.com"],
            "subject": f"Portfolio Contact - {name}",
            "html": f"""
                <h2>New Portfolio Contact</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Purpose to connect:</strong></p>
                <p>{purpose}</p>
            """
        })

        return JsonResponse({
            "status": "success",
            "message": "Submitted successfully"
        })

    return render(request, "contact.html")
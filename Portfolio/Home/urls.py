from django.urls import path
from . import views

urlpatterns = [

    path("", views.home, name="home"),

    path("about/", views.about, name="about"),
    path("about/data/", views.about_data, name="about_data"),

    path("skills/", views.skills, name="skills"),
    path("skills/data/", views.skills_data, name="skills_data"),

    path("projects/", views.projects, name="projects"),
    path("projects/data/", views.projects_data, name="projects_data"),

    path("contact/", views.contact, name="contact"),


]
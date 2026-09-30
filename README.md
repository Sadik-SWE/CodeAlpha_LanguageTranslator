# 🌐 CodeAlpha Language Translator

A modern, responsive, and full-stack language translation web application developed as part of my **CodeAlpha Internship**.

The project demonstrates practical experience in building a frontend interface, developing a RESTful backend API, integrating an external translation service, handling asynchronous requests and errors, and deploying a web application.

---

## 🚀 Live Demo

🔗 **Live Application:**  
https://code-alpha-language-translator-two.vercel.app/

💻 **GitHub Repository:**  
https://github.com/Sadik-SWE/CodeAlpha_LanguageTranslator

---

## 📌 Project Overview

**CodeAlpha Language Translator** is a web-based translation application that allows users to translate text between multiple languages through a simple and responsive interface.

The application follows a client-server architecture where the frontend communicates with a Node.js/Express backend through a REST API. The backend processes translation requests and communicates with the external translation service.

This project was developed to gain practical experience with:

- Frontend development
- REST API development
- Backend integration
- Asynchronous JavaScript
- API request/response handling
- Error handling
- Git & GitHub
- Web deployment

---

## ✨ Features

- 🌍 Multi-language translation
- 🔄 Swap source and target languages
- 📋 Copy translated text with one click
- ⚡ API-based real-time translation
- 🔄 Translation loading indicator
- ❌ Error handling and validation
- ⌨️ `Ctrl + Enter` keyboard shortcut for translation
- 📱 Responsive user interface
- 🔌 RESTful backend API
- 🌐 Live web deployment

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Translation Service

- MyMemory Translation API

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

### Deployment

- Vercel

---

## 🏗️ Project Architecture

```text
                    User
                     │
                     ▼
             ┌─────────────────┐
             │    Frontend     │
             │  HTML/CSS/JS    │
             └────────┬────────┘
                      │
                      │ HTTP POST
                      ▼
             ┌─────────────────┐
             │  Express.js     │
             │  REST API       │
             └────────┬────────┘
                      │
                      │ Translation Request
                      ▼
             ┌─────────────────┐
             │ MyMemory API    │
             │ Translation     │
             └────────┬────────┘
                      │
                      │ Translation Result
                      ▼
             ┌─────────────────┐
             │    Frontend     │
             │ Display Result  │
             └─────────────────┘

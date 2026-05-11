# 🔗 Linklytics — URL Shortener Application

Welcome to **Linklytics**, a full-stack URL shortener application! This project allows users to convert long URLs into easily shareable short links, while providing detailed click analytics and a personal dashboard for managing links.

## 🚀 Key Features

### 👤 User Authentication & Security
- **User Registration & Login:** Secure account creation and login flows.
- **JWT-Based Authentication:** Protected routes and API endpoints using JSON Web Tokens (JWT).
- **Password Encryption:** Passwords are encrypted using BCrypt before storing in the database.
- **Role-Based Access Control:** Differentiates between public actions (like redirection) and protected actions (like viewing a dashboard).

### 🔗 URL Management
- **Shorten URLs:** Convert any long URL into a compact, random 8-character short code.
- **Custom Alias / Vanity URLs:** Choose your own recognizable name instead of a random string (e.g., `linklytics.com/my-portfolio`).
- **Link Expiry:** Set specific expiration dates and times for links to automatically disable them.
- **Manage & Delete Links:** Authenticated users can view, manage, and permanently delete their generated short links at any time.
- **One-Click Copy:** Easily copy short links to your clipboard directly from the dashboard.
- **Instant Redirection:** Seamlessly redirect from the short URL to the original destination.

### 📱 QR Code Generation
- **Free Standalone QR Generator:** A dedicated public page where anyone can generate, customize (colors and sizes), and download high-quality PNG QR codes for any link.
- **Dashboard QR Codes:** Automatically generates a toggleable QR code for every shortened link inside the user dashboard.

### 📊 Analytics & Tracking
- **Click Tracking:** Every time a short link is visited, the system records the event.
- **Geo & Device Analytics:** Automatically extracts and displays the visitor's Country, City, Device Type (Mobile/Desktop), Browser, and Referer data for every single click.
- **Total Clicks:** View the aggregate number of clicks across all your short links.
- **Visual Graphs:** The dashboard features bar charts to visualize click analytics over time.

### 🛠️ Technical Stack Highlights
- **Frontend (React + Vite):** A modern, fast, and responsive user interface with protected routing and state management (Context API).
- **Backend (Spring Boot):** A robust Java backend using Spring Security, Spring Data JPA, and RESTful APIs.
- **Database (MySQL):** Relational database tracking users, URL mappings, and click events.
- **CORS Configured:** Secure cross-origin resource sharing between the React frontend and Spring Boot backend.

## 📁 Project Structure Overview

This repository contains two main modules:
- **`url-shortener-sb/`** - The Spring Boot backend.
- **`url-shortener-react/`** - The React + Vite frontend.

For a detailed breakdown of how the frontend and backend communicate, data flows, and project architecture, please check out the [Project Workflow Guide](PROJECT_WORKFLOW.md).

## 🚀 Getting Started

To run the project locally, please refer to the detailed instructions in the [Project Workflow Guide - How to Run the Project](PROJECT_WORKFLOW.md#🚀-how-to-run-the-project) section.

You will need:
- Java 17+
- Node.js 18+ and npm
- MySQL Server (Port 3306)

# JS Mini Apps: Interactive UI Challenges
## This task is included in my frontend training program in Asal.

A collection of small, interactive JavaScript applications built to sharpen core web development skills.  
The focus is on DOM manipulation, UI state handling, validation logic, and dynamic rendering.

This project includes five distinct mini-apps, ranging from simple converters to a canvas-based graphics tool.

---

# 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

# 📁 Project Structure

```
shamsaziz03-js-ui-tasks/
├── circle-drawer/
├── crud-operations/
├── flight-booker/
├── temperature-converter/
└── timer/
```

---

#  Task 1: Temperature Converter

Convert between Celsius and Fahrenheit in real time.

### Features:
-  **Bidirectional Sync**
  - C → F: `C * 9/5 + 32`
  - F → C: `(F - 32) * 5/9`
-  Input validation (ignores invalid values)

---

#  Task 2: Flight Booker

A booking form with dynamic validation and UI behavior.

### Features:
-  One-way / Return toggle
-  Return date enabled/disabled dynamically
-  Invalid dates disable submission
-  Visual feedback for incorrect inputs

---

#  Task 3: Timer

Interactive timer with adjustable duration.

### Features:
-  Live duration adjustment via slider
-  Real-time progress tracking
-  Auto stop & resume behavior
-  Two implementations:
  - `setInterval`
  - `setTimeout`

---

#  Task 4: CRUD Operations

A mini database for managing names.

### Features:
-  Create entries
-  Read from list
-  Update selected item
-  Delete entries
-  Prefix filtering (by surname)
-  Buttons enabled only when selection exists

---

#  Task 5: Circle Drawer

Canvas-based interactive drawing tool.

### Features:
-  Click to create circles
-  Hover detection & highlighting
-  Resize via context menu slider
-  Undo / Redo system
-  State tracking for all actions

---

#  How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/js-mini-apps.git
```

### 2. Navigate into the project

```bash
cd js-mini-apps
```

### 3. Open any app in your browser

#### Example:

```bash
# Temperature Converter
open temperature-converter/index.html

# Flight Booker
open flight-booker/index.html
```

(Or just double-click the `index.html` file)

---

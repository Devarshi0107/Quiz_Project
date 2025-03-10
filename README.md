# 🎓 Quiz Generator Project

The **Quiz Generator Project** is a web-based application that empowers teachers to create, configure, and distribute multiple-choice question (MCQ) exams easily. With support for uploading questions via JSON or Excel files, the system can generate randomized sets of questions based on difficulty levels and schedule exams with specific time ranges and student roll number assignments. Export options to PDF and Excel are also available.

---

## 🚀 Features

- **Question Upload**  
  Easily upload MCQ data using JSON or Excel files. The system automatically parses and imports questions with properties such as:
  - **Question Text**
  - **Options**
  - **Correct Answer**
  - **Difficulty Level**
  - **Marks**

- **Exam Configuration**  
  Configure detailed exam settings including:
  - **Exam Name**
  - **Schedule Date** (with past dates disabled)
  - **Start & End Times** (formatted with IST offset)
  - **Branch & Batch**
  - **Roll Number Range**

- **MCQ Generation & Set Assignment**  
  Generate multiple sets of questions by specifying numbers for easy, medium, and hard questions. The system:
  - Randomly selects questions without duplication
  - Automatically assigns sets to students using a round-robin algorithm

- **Export Options**  
  Export quizzes in various formats:
  - **PDF Export** (via jsPDF & jsPDF-AutoTable)
  - **Excel Export** (using XLSX)

- **Date Handling**  
  The schedule date input disables past dates, ensuring only future dates are selectable. Date/time values are formatted using Moment Timezone to display the correct IST offset.

---

## 🛠️ Technologies Used

### Frontend
- **React**
- **Tailwind CSS**
- **jsPDF & jsPDF-AutoTable**
- **XLSX (SheetJS)**
- **Moment & Moment-Timezone**

### Backend
- **Node.js**
- **Express**
- **MongoDB** with **Mongoose**

---

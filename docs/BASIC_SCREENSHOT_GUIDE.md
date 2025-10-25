# 📸 Basic Screenshot Guide - Essential Features Only

This guide covers the **essential screenshots** needed to demonstrate the Real-Time Code Sharing System's core functionality.

## 🎯 **Essential Screenshots (Must Have)**

### 🚀 **System Setup (4 screenshots)**

#### **1. Project Structure**
- **File**: `01-project-structure.png`
- **Description**: Main project folder showing all components
- **Content**: Root directory with backend-server, lecturer-interface, vscode-extension, docs

#### **2. System Startup**
- **File**: `02-system-startup.png`
- **Description**: Backend and frontend servers starting
- **Content**: Terminal/PowerShell showing both services starting successfully

#### **3. Student VSCode Instances**
- **File**: `03-student-vscode-instances.png`
- **Description**: Multiple VSCode windows for students
- **Content**: Desktop showing 4 VSCode windows (Alice, Bob, Charlie, Diana)

#### **4. Extension Installation**
- **File**: `04-extension-installation.png`
- **Description**: Installing the code sharing extension
- **Content**: VSCode command palette showing "Extensions: Install from VSIX"

### 👨‍🏫 **Lecturer Interface (6 screenshots)**

#### **5. Empty Dashboard**
- **File**: `05-empty-dashboard.png`
- **Description**: Lecturer interface with no submissions
- **Content**: Browser showing header with 0 submissions, 0 students, 0 correct, 0 active questions

#### **6. Statistics Cards**
- **File**: `06-statistics-cards.png`
- **Description**: 4 statistics cards in header
- **Content**: Submissions, Students, Correct, Active Q cards in one row

#### **7. Questions Tab**
- **File**: `07-questions-tab.png`
- **Description**: Questions management interface
- **Content**: Questions tab showing "Create Question" button

#### **8. Create Question**
- **File**: `08-create-question.png`
- **Description**: Question creation form
- **Content**: Modal with title, text, language, difficulty fields filled

#### **9. Active Questions**
- **File**: `09-active-questions.png`
- **Description**: List of created questions
- **Content**: Grid showing question cards with "Active" status

#### **10. Student List**
- **File**: `10-student-list.png`
- **Description**: Student management modal
- **Content**: Modal showing list of students with submission counts

### 💻 **Code Sharing Process (6 screenshots)**

#### **11. Student Writing Code**
- **File**: `11-student-writing-code.png`
- **Description**: Student writing code in VSCode
- **Content**: VSCode editor with JavaScript code, extension panel visible

#### **12. Code Selection**
- **File**: `12-code-selection.png`
- **Description**: Student selecting code to share
- **Content**: VSCode with highlighted/selected code

#### **13. Share Code**
- **File**: `13-share-code.png`
- **Description**: Student clicking share button
- **Content**: Extension panel showing "Share Code" button being clicked

#### **14. First Submission**
- **File**: `14-first-submission.png`
- **Description**: Lecturer interface showing first submission
- **Content**: Dashboard with 1 submission, 1 student, statistics updated

#### **15. Multiple Submissions**
- **File**: `15-multiple-submissions.png`
- **Description**: Multiple submission cards
- **Content**: Grid showing 3-4 submission cards from different students

#### **16. AI Review**
- **File**: `16-ai-review.png`
- **Description**: Submission with AI review feedback
- **Content**: Submission card showing AI review badge and feedback section

## 📋 **Basic Screenshot Checklist**

### ✅ **Phase 1: System Setup**
- [ ] Project structure overview
- [ ] System startup (backend + frontend)
- [ ] 4 student VSCode instances created
- [ ] Extension installed in VSCode

### ✅ **Phase 2: Lecturer Interface**
- [ ] Empty dashboard with statistics
- [ ] Questions tab and creation
- [ ] Active questions list
- [ ] Student list modal

### ✅ **Phase 3: Code Sharing**
- [ ] Student writing code
- [ ] Code selection and sharing
- [ ] First submission received
- [ ] Multiple submissions display
- [ ] AI review system

### ✅ **Phase 4: Responsive Design**
- [ ] Mobile interface
- [ ] Tablet interface

## 🎨 **Sample Data for Screenshots**

### **Student Names**
- Alice Johnson
- Bob Smith
- Charlie Brown
- Diana Prince

### **Sample Questions**
1. **Hello World** (JavaScript) - Easy
2. **Sum of Array** (Python) - Medium
3. **Prime Check** (Java) - Medium
4. **Sort Numbers** (C++) - Hard

### **Sample Code Examples**
```javascript
// JavaScript - Hello World
console.log('Hello, World!');

// JavaScript - Sum Array
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
```

```python
# Python - Sum Array
def sum_array(arr):
    return sum(arr)

# Python - Hello World
print('Hello, World!')
```

```java
// Java - Prime Check
public static boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

## 🚀 **Quick Setup Commands**

```bash
# 1. Create 4 student instances
.\setup-complete-system.ps1

# 2. Start the system
.\start-complete-system.ps1

# 3. Install extension in each VSCode instance
# Press Ctrl+Shift+P → "Extensions: Install from VSIX"
# Select: vscode-extension\code-sharing-extension-1.0.0.vsix

# 4. Open lecturer interface
# http://localhost:3000
```

## 📸 **Screenshot Specifications**

- **Resolution**: 1920x1080 minimum
- **Format**: PNG
- **Browser**: Chrome or Edge
- **Naming**: [Number]-[Description].png
- **Location**: `docs/screenshots/`

## 🎯 **Priority Order**

### **High Priority (Core Demo)**
1. System startup and student setup
2. Lecturer dashboard and statistics
3. Question creation and management
4. Code sharing process
5. AI review system

### **Medium Priority (Enhanced Demo)**
6. Multiple submissions display
7. Student management
8. Responsive design

### **Low Priority (Nice to Have)**
9. Advanced filtering
10. Export functionality
11. Error handling

## ✅ **Quality Checklist**

Before finalizing each screenshot:
- [ ] Text is readable and clear
- [ ] UI elements are properly aligned
- [ ] Colors and contrast are good
- [ ] Consistent with other screenshots
- [ ] Properly named and numbered
- [ ] Saved in correct location

This basic guide covers the **18 essential screenshots** needed to demonstrate the core functionality of the Real-Time Code Sharing System.

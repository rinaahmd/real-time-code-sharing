# 📝 Question Management Guide

Complete guide for creating, managing, and monitoring coding questions in the Real-Time Code Sharing system.

## 🎯 Question Management Overview

The question management system allows lecturers to:
- **Create coding questions** with different difficulty levels
- **Activate/deactivate questions** to control availability
- **Monitor submissions** and student performance
- **Track progress** and provide feedback
- **Export results** for analysis

## 📋 Creating Questions

### **Step 1: Access Question Creation**
1. **Open Lecturer Interface**: Navigate to `http://localhost:3000`
2. **Click Questions Tab**: Located in the main navigation
3. **Click "Create Question"**: Green button in the top-right

### **Step 2: Fill Question Details**

#### **Required Fields**
- **Title**: Brief, descriptive title (e.g., "Print Numbers 1 to 10")
- **Text**: Full question description with requirements
- **Language**: Programming language for the question
- **Difficulty**: Easy, Medium, or Hard

#### **Optional Fields**
- **Time Limit**: Maximum time allowed (in minutes)
- **Additional Instructions**: Extra guidance for students

### **Step 3: Question Types and Examples**

#### **Loop Exercises**
```
Title: Print Numbers 1 to 10
Language: Python
Difficulty: Easy
Text: Write a program that prints numbers from 1 to 10. 
Use a for loop to accomplish this task.
Expected Output: 1 2 3 4 5 6 7 8 9 10
```

#### **Function Writing**
```
Title: Calculate Sum of Array
Language: JavaScript
Difficulty: Medium
Text: Write a function that takes an array of numbers 
and returns the sum of all elements.
Example: calculateSum([1, 2, 3, 4, 5]) should return 15
```

#### **Conditional Logic**
```
Title: Check Even or Odd
Language: Java
Difficulty: Easy
Text: Write a program that takes a number as input 
and determines if it is even or odd. Print the result.
```

#### **Algorithm Problems**
```
Title: Find Maximum Number
Language: Python
Difficulty: Medium
Text: Write a function that finds the maximum number 
in an array of integers.
Example: findMax([3, 7, 2, 9, 1]) should return 9
```

## 🎮 Managing Questions

### **Question Status**

#### **Active Questions**
- **Status**: 🟢 Active (available to students)
- **Visibility**: Students can see and answer
- **Notifications**: Students get notified when activated
- **Submissions**: Accepting new submissions

#### **Inactive Questions**
- **Status**: 🔴 Inactive (hidden from students)
- **Visibility**: Not visible to students
- **Submissions**: Not accepting new submissions
- **History**: Previous submissions preserved

### **Question Actions**

#### **Activate Question**
1. **Find Question**: Locate in questions list
2. **Click "Activate"**: Green button next to question
3. **Confirm**: Question becomes available to students
4. **Notification**: Students receive notification

#### **Deactivate Question**
1. **Find Question**: Locate in questions list
2. **Click "Deactivate"**: Red button next to question
3. **Confirm**: Question becomes unavailable
4. **Stop Submissions**: No new submissions accepted

#### **Edit Question**
1. **Click Question**: Select question from list
2. **Click "Edit"**: Pencil icon
3. **Modify Details**: Update title, text, or settings
4. **Save Changes**: Click "Update Question"

#### **Delete Question**
1. **Click Question**: Select question from list
2. **Click "Delete"**: Trash icon
3. **Confirm Deletion**: Warning dialog appears
4. **Permanent Removal**: Question and submissions deleted

## 📊 Monitoring Submissions

### **Viewing Submissions by Question**
1. **Click Question**: Select question from list
2. **View Submissions**: See all answers for that question
3. **Filter Options**: Sort by student, score, or date
4. **Export Data**: Download submissions as JSON

### **Submission Details**
Each submission shows:
- **Student Name**: Who submitted the answer
- **Code**: Full code with syntax highlighting
- **Language**: Programming language used
- **Score**: AI-generated score (0-100)
- **Status**: Correct ✅ or Needs Improvement ❌
- **Feedback**: AI-generated comments
- **Suggestions**: Improvement recommendations
- **Timestamp**: When submitted

### **AI Review System**

#### **Scoring Criteria**
- **Code Structure**: Proper syntax and formatting
- **Logic Correctness**: Does it solve the problem?
- **Language Features**: Appropriate use of language constructs
- **Code Quality**: Comments, readability, best practices
- **Completeness**: Addresses all requirements

#### **Feedback Types**
- **Positive Feedback**: Acknowledges good practices
- **Constructive Criticism**: Points out areas for improvement
- **Specific Suggestions**: Actionable improvement tips
- **Learning Points**: Educational insights

## 📈 Performance Analytics

### **Question Statistics**
- **Total Submissions**: Number of answers received
- **Correct Answers**: Percentage of correct solutions
- **Average Score**: Mean score across all submissions
- **Student Participation**: How many students attempted
- **Completion Rate**: Percentage who submitted answers

### **Student Performance**
- **Individual Scores**: Track student progress
- **Improvement Over Time**: See learning progression
- **Weak Areas**: Identify topics needing more practice
- **Strong Areas**: Recognize student strengths

### **Class Analytics**
- **Overall Performance**: Class-wide statistics
- **Question Difficulty**: Which questions are hardest
- **Language Proficiency**: Performance by programming language
- **Time Analysis**: How long students take to solve

## 🎯 Best Practices

### **Question Design**

#### **Clear Instructions**
- **Specific Requirements**: What exactly should the code do?
- **Input/Output Examples**: Show expected behavior
- **Edge Cases**: Mention special conditions
- **Constraints**: Any limitations or requirements

#### **Appropriate Difficulty**
- **Beginner Level**: Simple loops, basic functions
- **Intermediate Level**: Arrays, string manipulation
- **Advanced Level**: Complex algorithms, data structures

#### **Language-Specific Guidelines**
- **Python**: Emphasize readability and simplicity
- **JavaScript**: Focus on functions and arrays
- **Java**: Highlight object-oriented concepts
- **C/C++**: Focus on memory management and pointers

### **Question Management**

#### **Timing**
- **Activate Early**: Give students time to see questions
- **Reasonable Time Limits**: Don't rush students
- **Deactivate Promptly**: Stop accepting submissions when done
- **Regular Updates**: Keep questions fresh and relevant

#### **Feedback**
- **Review AI Suggestions**: Check if feedback is helpful
- **Provide Additional Comments**: Add your own insights
- **Encourage Improvement**: Use positive reinforcement
- **Address Common Mistakes**: Help students learn from errors

## 🔧 Troubleshooting

### **Common Issues**

#### **Questions Not Appearing**
**Problem**: Students can't see questions
**Solutions**:
- Check if question is activated
- Verify student VSCode extension is connected
- Ensure backend server is running
- Check question visibility settings

#### **Submissions Not Received**
**Problem**: Student submissions not appearing
**Solutions**:
- Check WebSocket connection
- Verify question is still active
- Ensure student extension is working
- Check backend server logs

#### **AI Review Issues**
**Problem**: Incorrect or missing feedback
**Solutions**:
- Check code language detection
- Verify question requirements are clear
- Review AI scoring criteria
- Test with sample code

### **Performance Issues**
- **Slow Loading**: Check server performance
- **High Memory Usage**: Monitor database size
- **Connection Problems**: Verify network stability

## 📤 Export and Backup

### **Exporting Data**
1. **All Submissions**: Download complete dataset
2. **By Question**: Export specific question data
3. **By Student**: Export individual student progress
4. **By Date Range**: Export submissions from specific period

### **Data Formats**
- **JSON**: Machine-readable format
- **CSV**: Spreadsheet-compatible format
- **PDF**: Human-readable reports

### **Backup Strategy**
- **Regular Exports**: Weekly data backups
- **Before Changes**: Backup before major updates
- **Multiple Formats**: Keep data in different formats
- **Offsite Storage**: Store backups securely

## 🎉 Success Metrics

### **Engagement Indicators**
- **High Participation**: Most students submit answers
- **Multiple Attempts**: Students try different approaches
- **Improvement Over Time**: Scores increase with practice
- **Active Discussion**: Students ask questions and help each other

### **Learning Outcomes**
- **Concept Mastery**: Students understand programming concepts
- **Problem-Solving Skills**: Ability to break down problems
- **Code Quality**: Writing clean, readable code
- **Language Proficiency**: Comfortable with programming languages

## 🔄 Continuous Improvement

### **Question Refinement**
- **Monitor Performance**: Track which questions work well
- **Update Content**: Keep questions current and relevant
- **Adjust Difficulty**: Match student skill levels
- **Add Variety**: Include different types of problems

### **System Enhancement**
- **Feature Requests**: Gather feedback from students
- **Performance Optimization**: Improve system speed
- **UI Improvements**: Enhance user experience
- **Integration**: Connect with other educational tools

---

**Ready to create engaging coding questions? Start with simple exercises and build up to complex challenges!** 🚀

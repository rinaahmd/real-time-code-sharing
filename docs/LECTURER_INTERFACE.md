# 👨‍🏫 Lecturer Interface Guide

Complete guide for using the web-based lecturer interface to manage the Real-Time Code Sharing system.

## 🌐 Accessing the Interface

### **Opening the Interface**
1. **Start the System**: Ensure backend and frontend are running
2. **Open Browser**: Navigate to `http://localhost:3000`
3. **Login**: No authentication required for demo purposes

### **System Requirements**
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Resolution**: Minimum 1024x768 (responsive design)
- **JavaScript**: Must be enabled

## 🎯 Interface Overview

### **Main Dashboard**
The lecturer interface consists of several key sections:

```
┌─────────────────────────────────────────────────────────────┐
│  Real-Time Code Sharing System                             │
├─────────────────────────────────────────────────────────────┤
│  📊 Statistics Dashboard                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Total   │ │ Active  │ │ Online  │ │ Active │          │
│  │ Codes   │ │ Students│ │ Students│ │Questions│          │
│  │   5     │ │    2    │ │    0    │ │    4   │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
├─────────────────────────────────────────────────────────────┤
│  📝 Code Submissions (Real-time)                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Student: abed | Python | Score: 70% ✅              │  │
│  │ for i in range(1, 11):                              │  │
│  │     print(i)                                        │  │
│  │ [Copy] [View Details]                               │  │
│  └─────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  📋 Navigation Tabs                                       │
│  [Submissions] [Questions] [Students] [Settings]          │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Statistics Dashboard

### **Key Metrics**
- **Total Codes**: Number of code submissions received
- **Active Students**: Students currently connected
- **Online Students**: Students with active VSCode instances
- **Active Questions**: Questions currently available to students

### **Real-time Updates**
- Statistics update automatically every few seconds
- Green indicators show active connections
- Red indicators show disconnected states

## 📝 Code Submissions Management

### **Viewing Submissions**
1. **Main Tab**: Default view shows all submissions
2. **Real-time**: New submissions appear instantly
3. **Chronological**: Most recent submissions first
4. **Filtered**: Use filters to find specific submissions

### **Submission Details**
Each submission shows:
- **Student Name**: Who submitted the code
- **Language**: Programming language used
- **Score**: AI-generated score (0-100)
- **Status**: Correct ✅ or Needs Improvement ❌
- **Timestamp**: When submitted
- **Code**: Full code with syntax highlighting

### **Actions Available**
- **📋 Copy Code**: One-click copy to clipboard
- **👁️ View Details**: Expand for full information
- **🔍 Search**: Find specific submissions
- **📥 Export**: Download all submissions as JSON

### **Filtering Options**
- **By Student**: Filter submissions by student name
- **By Language**: Show only specific programming languages
- **By Question**: Filter by specific questions
- **By Score**: Show only high/low scoring submissions
- **By Status**: Correct vs. incorrect submissions

## 📋 Question Management

### **Creating Questions**
1. **Navigate**: Click "Questions" tab
2. **Create**: Click "Create Question" button
3. **Fill Details**:
   - **Title**: Brief description
   - **Text**: Full question description
   - **Language**: Programming language
   - **Difficulty**: Easy/Medium/Hard
   - **Time Limit**: Minutes allowed
4. **Save**: Click "Create Question"

### **Question Types**
- **Algorithm Problems**: Sorting, searching, etc.
- **Loop Exercises**: Iteration practice
- **Function Writing**: Method/function creation
- **Data Structure**: Arrays, lists, etc.
- **Debugging**: Fix existing code

### **Managing Questions**
- **Activate/Deactivate**: Control question availability
- **Edit**: Modify question details
- **Delete**: Remove questions
- **View Submissions**: See all answers for a question

### **Question Status**
- **🟢 Active**: Available to students
- **🔴 Inactive**: Hidden from students
- **📊 Statistics**: View submission counts

## 👥 Student Management

### **Student List**
1. **Access**: Click "Students" tab or click "Students" stat
2. **View**: See all students who have submitted code
3. **Details**: Click on student name for detailed view

### **Student Information**
- **Name**: Student identifier
- **Submissions**: Number of code submissions
- **Last Activity**: When they last submitted code
- **Performance**: Average scores
- **Questions Answered**: Which questions they've attempted

### **Student Actions**
- **View History**: See all submissions from a student
- **Filter Submissions**: Show only their submissions
- **Performance Analysis**: Track improvement over time

## ⚙️ Settings and Configuration

### **System Settings**
- **Auto-refresh**: Enable/disable real-time updates
- **Notifications**: Sound/visual notifications
- **Theme**: Light/Dark mode
- **Language**: Interface language

### **Export Options**
- **All Submissions**: Download complete dataset
- **By Question**: Export specific question submissions
- **By Student**: Export individual student data
- **By Date Range**: Export submissions from specific period

### **Clear Data**
- **Clear All**: Remove all submissions
- **Clear by Question**: Remove specific question data
- **Reset Statistics**: Reset all counters

## 🔔 Notifications and Alerts

### **Real-time Notifications**
- **New Submission**: Toast notification for new code
- **Student Connected**: When student joins
- **Student Disconnected**: When student leaves
- **Question Activated**: When question becomes available

### **Notification Types**
- **Success**: Green notifications for positive events
- **Warning**: Yellow notifications for attention needed
- **Error**: Red notifications for problems
- **Info**: Blue notifications for general information

## 📱 Mobile Responsiveness

### **Mobile Features**
- **Responsive Design**: Works on tablets and phones
- **Touch-friendly**: Large buttons and touch targets
- **Swipe Navigation**: Easy navigation on mobile
- **Readable Text**: Optimized font sizes

### **Mobile Limitations**
- **Code Viewing**: May require horizontal scrolling
- **Complex Actions**: Some features easier on desktop
- **Performance**: May be slower on older devices

## 🔧 Troubleshooting

### **Common Issues**

#### **Interface Not Loading**
**Problem**: Blank page or loading errors
**Solutions**:
- Check if frontend server is running
- Verify `http://localhost:3000` is accessible
- Clear browser cache
- Try different browser

#### **No Real-time Updates**
**Problem**: Submissions not appearing automatically
**Solutions**:
- Check WebSocket connection
- Verify backend server is running
- Refresh the page
- Check browser console for errors

#### **Statistics Not Updating**
**Problem**: Dashboard stats are incorrect
**Solutions**:
- Refresh the page
- Check database connection
- Verify backend API endpoints
- Clear browser cache

### **Performance Issues**
- **Slow Loading**: Check network connection
- **High Memory Usage**: Close unused browser tabs
- **Frozen Interface**: Refresh the page

## 💡 Best Practices

### **Effective Question Creation**
1. **Clear Instructions**: Write unambiguous requirements
2. **Appropriate Difficulty**: Match student skill level
3. **Time Limits**: Set realistic time constraints
4. **Examples**: Provide sample inputs/outputs
5. **Test Cases**: Include edge cases

### **Student Engagement**
1. **Activate Questions**: Make questions available promptly
2. **Provide Feedback**: Use AI suggestions to guide students
3. **Encourage Participation**: Acknowledge good submissions
4. **Monitor Progress**: Track student improvement
5. **Address Issues**: Help struggling students

### **System Management**
1. **Regular Backups**: Export data regularly
2. **Monitor Performance**: Watch for system issues
3. **Update Questions**: Keep content fresh and relevant
4. **Clear Old Data**: Remove outdated submissions
5. **Test Features**: Verify system functionality

## 🎉 Success Stories

Lecturers using this system report:
- **Increased Engagement**: Students more active in class
- **Better Feedback**: Immediate code review capabilities
- **Time Savings**: No need to collect assignments manually
- **Improved Learning**: Students see immediate results
- **Professional Environment**: Industry-standard tools

## 🔄 System Updates

### **Automatic Updates**
- **Frontend**: Updates automatically when server restarts
- **Features**: New features added regularly
- **Bug Fixes**: Issues resolved promptly

### **Manual Updates**
- **Browser Refresh**: Refresh page for updates
- **Clear Cache**: Clear browser cache if needed
- **Restart Services**: Restart backend/frontend if issues

---

**Ready to manage your classroom? Open the interface and start creating questions!** 🚀

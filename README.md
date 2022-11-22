# HR Proejct

_Beaconfire Group Project by Team 3_
_(Tongda Yin, John Nguyen, Jinyan Li)_

## <ins>Goal

We want to create an employee/HR website portal for managing the new employee onboarding process. Employees will be able to update personal information, upload required documents for identification and work authorization, and monitor their housing situation.

HR will be able to access employee information and make changes regarding the onboarding status or housing assignments.

---

## <ins>Requirements

1. Coding

   - Backend: Typescript, Node.js Express server

     - The server must be organized based on the MVC architecture.

   - Frontend: SCSS, Typescript, React (function components), Redux, React-redux
     - Axios
     - 1+ UI component libraries (MUI, react-bootstrap, ant design, …)
     - Any React form library (formik, react hook form, react final form,...)
     - Optional: data visualization library
     - Your project must make use of reusable components, at least for the sections on the employee personal information page.
       - https://blog.logrocket.com/building-reusable-ui-components-with-react-hooks/

2. Set up your team’s Github repository and add the Training Managers as collaborators.

   - ehuang@beaconfireinc.com
   - ljiang@beaconfireinc.com

3. Set up your team’s Jira SCRUM Project and add the Training Managers. - Use this to manage the project (assign tickets for feature implementations and bugfixes).

4. Teams

   - Leads will be in charge of deciding on the project design (UI, organizing the project file structure), assigning workloads, and making sure everything progresses smoothly.

   - The Git repository should follow best practices regarding branches, commits, merging, pull requests, etc.

   - Leads will participate in daily stand-up meetings with the Training Managers. They will report about the following:
     1. What features have you implemented so far?
     2. What issues/bugs have you encountered?
     3. What is each member in charge of, and what is their progress?
     4. (optional) Demo the current project

---

## <ins>Features

| Employees               | HR                      |
| ----------------------- | ----------------------- |
| Login<br>Navigation bar | Login<br>Navigation bar |
| Registration            | Employee Profiles       |
| Onboarding Application  | Visa Status Management  |
| Personal information    | Hiring Management       |
| Visa status management  | Housing Management      |
| Housing                 |                         |
|                         |                         |

### <ins>_For Employees_

1. Registration page

   - An HR representative must generate a registration token and a link to the registration page, then send it to a new employee’s email. This is the only way for new employees to access the registration page. See **<ins>HR #Hiring Management.**

     - It should be able to send an actual email message to a valid email address. Here are some options for sending emails: emailjs, nodemailer

   - Users must provide a unique username, password, and unique email (doesn’t need to be real, but should follow the email format like prefix@domain).
     - On successful registration, users should be automatically and randomly assigned to a house. See **<ins>HR #Housing Management**.

2. Login page

   - Users should provide their username and password to log in, after which they are redirected to the Personal Information page.
   - If they are not logged in, they **<ins>only** have access to the login page.
   - If logged in, users can access the entire website.
   - If the user has an active session or valid token, then after refreshing the page, they should still be logged in.

3. Onboarding Application page

   - Onboarding applications can have one of three statuses: Pending, Approved, Rejected.

   - Users should be redirected to this page after they log in, only in the following cases:

     1. **Never submitted**: they’ll fill in the application fields and submit for the first time.

     2. **Rejected**: they’ll be able to view feedback on why their application was rejected, make changes, and resubmit.

     3. **Pending**: they’ve submitted the application, so the page should say “Please wait for HR to review your application.” They can view the submitted application (not editable) and a list of all documents that they’ve uploaded.

        - They should be able to download each document.
        - They should be able to open a preview of the document in the browser.

     4. If approved, they should be redirected to the home page.

   - Input fields (bold fields are **required**, and the rest are optional for the user)

     1. **First name**, **last name**, middle name, preferred name
     2. Profile picture (with a default placeholder)
     3. **Current address** (building/apt #, street name, city, state, zip)
     4. **Cell phone number**, work phone number
     5. Car information (make, model, color)
     6. Email (pre-filled based on email that received registration token, cannot be edited)
     7. **SSN**, **date of birth**, gender (male, female, i do not wish to answer)
     8. “**Are you a citizen or permanent resident of the U.S?**”
        - Yes: choose “**Green Card**” or “**Citizen**”
        - No: “**What is your work authorization?**” (require them to upload files, you can test it with blank pdfs)
          1. H1-B, L2, F1(CPT/OPT), H4, Other
          2. If F1(CPT/OPT): show an input field for uploading their OPT Receipt. See **<ins>Employee #Visa Status Management**.
          3. If other: show an input box to specify the visa title
          4. Start and end date
     9. “**Do you have a driver’s license?**”
        - Yes: **driver’s license number**, **expiration date**, and an **uploaded copy of the license**
     10. Reference (who referred you to this company? There can only be 1)
         - **First name**, **last name**, middle name, **phone**, **email**, **relationship**
     11. **Emergency contact(s)** (1+)
         - **First name**, **last name**, middle name, **phone**, **email**, **relationship**

   - Summary of uploaded files or documents (if applicable)
     1. Profile picture
     2. Driver’s license
     3. Work authorization

4. Navigation bar

   - **Personal Information**, **Visa Status Management**, **Housing**, **Logout** (if logged in)

5. Personal Information page (organized into sections)

   1. The following sections should have a button that enables users to edit the fields. Clicking the edit button would replace it with a “Cancel” and “Save” button. If they click “Cancel”, the website should ask if they want to discard all of their changes, and if they click “Yes”, all changes should be undone.
   2. Name
      - First name, last name, middle name, preferred name
      - Profile picture
      - Email
      - SSN, date of birth, gender
   3. Address
      - Building/apt #, street name, city, state, zip
   4. Contact Info
      - Cell phone number, work phone number
   5. Employment
      - Visa title, start date, end date
   6. Emergency contact
      - First name, last name, middle name, phone, email, relationship
   7. Documents
      - The list of uploaded documents (driver’s license, work authorization).
      - They should be able to download each document.
      - They should be able to open a preview of the document in the browser.

6. Visa Status Management page

   1. Users should be able to manage their work authorization documents. For this project, we’re focusing on OPT visas, so the following only applies if the user selected OPT for their onboarding application. Otherwise, the page should not show any of these documents. This page is used to track the status of their uploaded documents and required next steps.

   2. Documents should be uploaded in this order, one by one. Users can only upload the next document after the previous document has been approved by HR.

   - OPT Receipt (submitted in onboarding application, waiting for approval)
     1. If pending, there should be a message “Waiting for HR to approve your OPT Receipt”.
     2. If approved, there should be a message “Please upload a copy of your OPT EAD”.
     3. If rejected, users should see HR’s feedback. See **<ins>HR #Visa Status Management**.
   - OPT EAD
     1. If pending, there should be a message “Waiting for HR to approve your OPT EAD“.
     2. If approved, there should be a message “Please download and fill out the I-983 form”.
     3. If rejected, users should see HR’s feedback. See **<ins>HR #Visa Status Management**.
   - I-983
     1. There should be two documents available for download, “Empty Template” and “Sample Template” (can be blank pdfs). There must also be a button to upload the filled out form.
     2. If pending, there should be a message “Waiting for HR to approve and sign your I-983“.
     3. If approved, there should be a message “Please send the I-983 along with all necessary documents to your school and upload the new I-20”.
     4. If rejected, users should see HR’s feedback. See **<ins>HR #Visa Status Management**.
   - I-20
     1. If pending, there should be a message “Waiting for HR to approve your I-20“.
     2. If approved, there should be a message “All documents have been approved”.
     3. If rejected, users should see HR’s feedback. See **<ins>HR #Visa Status Management**.

7. Housing

   1. **<ins>House Details**: Users should be able to view their assigned housing details. They are unable to modify anything.
      - Address
      - List of roommates (preferred or legal full name and phone number)
   2. **<ins>Facility Reports**: Users should be able to report facility issues by providing basic information. After submitting the report, they will be able to communicate with HR through a thread of comments for that report.
      - Creating a Facility Report
        - Title
        - Description
      - Viewing existing reports (users can only see the reports that they’ve submitted)
        - Title
        - Description
        - Created By
        - Timestamp
        - Status (Open, In Progress, Closed)
      - Adding or updating comments on a Facility Report
        - Description
      - Viewing a report’s list of comments
        - Description
        - Created By
        - Timestamp (either last modified or time created)

### <ins>_For HR_

1. Login page

   - This should be exactly the same as the employee’s login page. The system should detect whether an account is for an employee or HR.
     - HR accounts can be hard-coded in the database.
     - HR is just an employee with the HR role

2. Navigation bar

   - **Home**, **Employee Profiles**, **Visa Status Management**, **Hiring Management**, **Housing Management**, **Logout** (if logged in)

3. Employee Profiles page

   1. Allows HR to see a summary of each employee’s profile, search for a particular employee, and view their entire profile.
   2. **<ins>Summary View** (list total number of employees, and order them alphabetically by last name)
      - Name (legal full name)
        - The name should be a link that opens a new tab that displays the entire profile.
      - SSN
      - Work Authorization Title
      - Phone Number
      - Email
   3. **<ins>Search bar**
      - Type in the employee’s first name, last name, preferred name, and it should display a matching list on every key press.
      - Cover all cases for search

4. Visa Status Management page

   1. **<ins>In Progress**: Lists all employees who have not yet uploaded and been approved for all required OPT documents. It should specify what the next step is for that employee.

      - Ex: sent registration token: next step is to submit onboarding application
      - Ex: submitted OPT receipt: next step is to wait for HR approval
      - For each employee:

        1. Name (legal full name)
        2. Work Authorization
           - Title
           - Start and end date
           - Number of Days Remaining
        3. Next steps
        4. Action
           1. If the next step involves waiting for HR approval, show the uploaded document that requires approval. Allow the HR to view a preview of that document in the browser.
              - HR should be able to Approve or Reject the document. If they reject it, they can also give feedback. This feedback should be visible to the employee when they access their visa status management page.
           2. If the next step involves submitting the next document, show the “Send Notification” button.
              - This button will send an email to the employee as a reminder for their next steps

   2. **<ins>All**: Lists all visa-status employees. This is for looking at their uploaded documents. HR can search to filter for a particular employee.

      1. For each employee:

         - All data in section 1, except the Action category.
         - All documents that were uploaded & approved.
           - HR should be able to download each document.
           - HR should be able to open a preview of the document in the browser.

      2. Search bar

         - Type in the employee’s first name, last name, preferred name, and it should display a matching list on every key press.
         - Cover all cases for search results: one record found, multiple records found, no records found

5. Hiring Management page

   1. HR should be able to generate registration tokens and review onboarding applications.

   2. **Registration Token**

      - A “Generate token and send email” button that does what it says; the new employee should receive an email with a link. Clicking this link takes them to the registration page.
      - The registration token should only be valid for 3 hours.
      - There should be a history of email addresses that received a registration link. It should show the email address, person’s name, registration link, and status for whether this email address has been submitted in an onboarding application.

   3. **Onboarding Application Review**

      1. There should be three sections, one for each application status.

      2. **<ins>Pending**: HR should be able to view all submitted, pending onboarding applications. For each employee:

         - Full name
         - Email
         - “View Application”
           1. When clicked, open a new tab that displays the entire form.
           2. HR should be able to Approve or Reject the application. If they reject it, they can also give feedback on the application. This feedback should be visible to the employee when they access their rejected onboarding application.

      3. **<ins>Rejected**: HR can view all submitted, rejected applications. Display all the same things, except that when clicking “View Application”, they do not have the option to give feedback, approve, or reject the application.

      4. **<ins>Approved**: HR can view all submitted, approved applications. Display all the same things, except that when clicking “View Application”, they do not have the option to give feedback, approve, or reject the application.

6. Housing Management page

7. HR should be able to view existing houses, add new houses, and delete houses.

8. **<ins>Summary View**: for each house

   1. Address
   2. Landlord
      - Legal full name
      - Phone number
      - Email
   3. Number of employee residents
   4. If HR clicks on the summary view, it should show additional details:
      - Facility Information
        1. Number of beds, mattresses, tables, chairs
        2. Facility reports for that house (title, date, status)
           - Display 3-5 reports per page, sorted by date/time created
           - Each report should display the title, description, created by, timestamp, and status (Open, In Progress, Closed)
           - It should also display the list of comments (description, created by, timestamp)
           - HR should be able to add or update their owncomments
      - Employee Information
        1. Preferred or legal full name
           - The name should be a link that displays that employee profile.
        2. Phone number
        3. Email
        4. Car information

9. **<ins>Adding Houses**:
   - Provide an address, landlord information, basic facility information

---

## <ins>NOTE

For any features that involve user input, invalid inputs should be appropriately handled, and users should be notified via alerts or DOM manipulation.

The UI’s design is entirely up to you. Please focus on implementing the correct functionality to avoid spending too much time on styling. We recommend starting the project in this order:

- Data modeling (entities, relationships, schemas)
- Set up the MVC-based backend structure
- To implement each page or feature, start with backend routing and then connect it to the frontend for that page or feature.

---

## <ins>Good Practices

1. Pay attention to user authorization and input validation (client & server-side).

   - Users should not be able to access other users’ profiles, documents, etc.
   - Handle page navigation via directly typing in the url vs. clicking redirect links on the page.

2. React app file structure should be organized. Ex:
   - src/
     - components/
       - This would contain folders that represent components used in a particular page. There may be a folder for components that are shared across pages, like a navigation bar.
     - pages/
     - redux/
     - utils/
       - This may contain files for AJAX/axios calls or authentication.

---

## <ins>Submission

1. You do not need to submit anything anywhere or record a video demo. The “deadline” is the day of the demo, when you are presenting your project.
2. For the presentation, your slides should cover the following topics:
   - Tech stack (what third-party libraries & services were used on the frontend and backend?)
   - Frontend architecture (file structure)
   - Backend architecture (file structure)
   - Data modeling (models, relationships)
   - Feature list (implemented, not implemented)
     - Which features did you struggle on, and specifically what part of the implementation?
     - When talking about the remaining unfinished features, talk about how you would approach those implementations on a high level.
   - Work Contributions (who did what)
     - Also present your jira storyboard setup.
   - Demo Outline: (the workflow for onboarding & visa status management, from both the employee and HR perspective)
     - Registration (generate & send token, navigate to signup page)
     - Onboarding Application
     - HR Hiring Management (Emails, Onboarding Feedback, Approval, & Rejection)
     - Employee Visa Management (Upload & Download)
     - HR Visa Management (Preview & Download)
     - Employee (Personal Information, Housing)
     - HR (Employee Profile, Housing)

---
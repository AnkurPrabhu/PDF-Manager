# PDF-Manager : Your Personal PDF Manager

Tech Stack used: MERN,Firebase Storage(for stroring pdfs)


## Must have Features Completed

- [x] User Signup and Authentication:
a. Users can create an account by providing essential information such as name,
email address, and password.
b. Authentication mechanisms should be implemented to ensure secure access to
the application.
- [x] File Upload:
a. Authenticated users can upload a PDF file to the system.
b. The PDF files should be securely stored and accessible only to authorized users.
c. The application should validate the uploaded files to ensure they are in PDF
- [x] Dashboard:
a. Users should be able to see the list of uploaded files which they have access to.
b. Clicking on it will take them to a specific pdf file.
- [x] File Sharing:
a. Users should have the ability to share PDF files with authenticated users.
b. Sharing can be done generating unique links.
- [x] Commenting:
a. Authenticated Users should be able to add comments.
b. Authenticated Users should be able to see the comments.
- [x] Security and Data Privacy:
a. Only authorized users can access PDF files and comments.
b. User passwords should be securely hashed and stored.
[x] User Interface and Design:
a. The application should have an intuitive and user-friendly interface.
b. The UI should provide clear navigation, PDF file preview, and easy-to-use
commenting features.

## Good to have Features Completed
- [x] File Sharing:
a. File can be shared with Unauthenticated users(external users).
b. Send an email to the invitee on sharing the PDF
c. Unauthenticated users(external users) should be able to access a PDF file via
the shared URL.
= [x] Invited User File Access and Commenting:
a. Authenticated Users should be able to reply to existing comments.
b. The system should support basic text formatting options (bold, italic, bullet points)
for comments.
c. Invited Unauthenticated(external) users can add comments/replies related to the
PDF file on a sidebar.
- [x] User Interface
a. Responsive design should be implemented to support various devices and
screen sizes.




## Future Enhancements:

-  Chat System
-  edting pdfs
-  downlaod pdfs
-  group access to a pdf
-  time/token expiry based access
  

## Getting Started

To get started with the application, follow these steps:

1. Clone the backend and frontend repositories: `https://github.com/AnkurPrabhu/PDF-backend ` and `https://github.com/AnkurPrabhu/PDF-frontend`
2. Install the dependencies: `npm install`
3. set up the firebase storage and put the api keys in the front-end app by creating a firebase.js file
6. Configure Mongodb database connection in the application.
7. Run the application: `npm run start for frontend `
8. for backend i would suggest installing nodemon and running it with : nodemon command

### .envs

- frontend:-
   1.  REACT_APP_BACKEND=http://localhost:3001/api/
   
- backend:
  1. MONGO_URI=< Your mongo uri >/pdf
  2. SECRET= <you secret name>
  3. ORIGIN=http://localhost:3000 
     
      


# Captionator-5000

**A Firebase reference application**

This project was developed as a demonstration and reference for the Firebase (v9) cloud platform.  Four aspects of Firebase have been used here: 

* Authentication
* Firestore Database
* Storage
* Hosting

Additionally, the user interface was built in React and styled using TailwindCSS.

## Features

* User sign up via email/password or using their Google account
* Security privileges:
  * Anonymous users have read only access to the front page and individual pictures
  * Signed in users have access to upload pictures, propose captions, and vote on captions
  * Admin users have access to delete pictures and captions, as well as give/remove admin rights to other users
* File uploads - limited to signed in users and enforces that files uploaded are images and less than 20MB in size
* The site is hosted using Firebase

## General Configuration

 [Configuration File](src\firebase\firebase.js)

There is a misstep here:  In the future, I will use GitHub Secrets to store the `firebaseConfig` object.  Since this is a public github and the app is configured to be locked into the free tier, I'm not worried about it this time. 

## Authentication

[UI References](src\components\oauth) 

* AuthStatusWidget.js:  Displays user signed in OR sign in/sign up links
* firebaseFunctions.js:  Central location for all authentication functions
* OAuth.js:  Controlling widget for displaying SignIn.js, SignUp.js, or ForgotPassword.js 

[AuthContext](src\context) :  Exposes user login state to the application 

## Firestore Database

The database functionality is spread out over the components that use them.  What I learned in the course of doing this project is that it's best to keep the Firestore calls as close as possible to the state that they update.  With features that are global, putting the functionality into a React Context is a good idea, but for the features in this app, it was cleanest to have them inside the components tracking the state.  Here are the files to look at:

* [IndividualPicture.js](src/pages/IndividualPicture.js)
  * Query a document on load from inside a `useEffect`, no subscription
  * Query a set of documents on load from inside a `useEffect` and subscribe to changes
  * Update a document
* [PictureListPage.js](src/pages/PictureListPage.js)
  * Query a set of documents on load from inside a `useEffect` and subscribe to changes
* [AdminPage.js](src/pages/AdminPage.js)
  * Query a set of documents on load from inside a `useEffect` and subscribe to changes
  * Update a document
  * When combined with the [security rules](firestore.rules), this page enables users marked as admins to delete pictures and comments
* [UploadPicture.js](src/pages/UploadPicture.js)
  * Generate a link from Firebase Storage and populate it into a Firestore document for later use in an `img` tag

## Storage

Firebase Storage effectively gives you a secured file system in the cloud to work from.  You can see an example of how to use it inside of [UploadPicture.js](src/pages/UploadPicture.js).  

The [security rules](security.rules) file shows an example of how to connect the storage security rules with information inside of a Firestore database for application configurable access.

## Hosting

Firebase Hosting just... works.  However, you can review the [package.json](package.json) file to see the deploy script for this project.

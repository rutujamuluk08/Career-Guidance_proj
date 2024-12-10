// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Student login functionality
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in as:", user.email);
        window.location.href = "college-selection.html";
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
      
    // Student Sign-Up Function
    document.getElementById("student-signup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Add user to Firestore after sign-up
        const db = firebase.firestore();
        db.collection("students").doc(user.uid).set({
          email: email,
          role: "student", // Assign role as student
        });
        alert("Student registered successfully!");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  });
  
  // Admin Login Function
  document.getElementById("admin-login-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = firebase.firestore();
        db.collection("students").doc(user.uid).get()
          .then((doc) => {
            if (doc.exists && doc.data().role === "admin") {
              // Admin is logged in
              alert("Admin logged in successfully!");
              window.location.href = "admin-dashboard.html";
            } else {
              alert("Access Denied! Not an admin.");
            }
          });
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  });
  });
  
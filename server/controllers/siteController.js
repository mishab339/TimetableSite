require('../models/database');
const studentCollection = require('../models/studentUser');
const facultyCollection = require('../models/facultyUser');


module.exports = {
    login: async(req,res)=>{
        res.render("login", { errors: {}, username: "" });
    },
    role:async(req,res)=>{
        res.render('role')
    },

    signup: async(req,res)=>{
      const { usertype } = req.body; 
      
      if(usertype==='Student'){
        res.render("studentSignup");
      }
      else if(usertype==='Faculty'){
        res.render("facultySignup");
      }
      else{
        res.render("facultySignup");
      }
      
      

        //res.render("signup");
    },

    studentSignup_validation: async(req,res)=>{
        const data = req.body;  // Store the entire request body
        const { name, email, phone, username, password, usertype,course, semester } = data;  // Destructure individual fields from `data`
        const errors = {};
        

        // Validate input fields
        if (!name) {
            errors.name = "*Name is required.";
        }
        if (!email) {
            errors.email = "*Email is required.";
        }
        if (!phone) {
            errors.phone = "*Phone number is required.";
        }
        if (!username) {
            errors.username = "*Username is required.";
        }
        if (!password) {
            errors.password = "*Password is required.";
        }
        if (!usertype) {
          errors.usertype = "*Usertype is required.";
      }
        if (!course) {
            errors.course = "*Course is required.";
        }
        if (!semester) {
            errors.semester = "*Semester is required.";
        }

        // If there are validation errors, re-render the signup page with error messages
        if (Object.keys(errors).length > 0) {
            return res.render("studentSignup", {
            errors, 
            username: req.body.username, 
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            course: req.body.course,
            semester: req.body.semester,
            });
        }

        try {
            // Check if the username already exists in the database
            const existingUser = await studentCollection.findOne({ username });

            // If the username exists, return an error message
            if (existingUser) {
            errors.username = "Username already taken. Please choose another one.";
            return res.render("studentSignup", {
                errors, 
                username: req.body.username, 
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                course: req.body.course,
                semester: req.body.semester
            });
            }

            // Insert data into the database
            await studentCollection.insertMany([data]);

            // Redirect to welcome page
            res.render("welcomeSignup", { name: data.name });
        } catch (error) {
          
            console.error("Error during signup:", error);
            res.send("Error during signup. Please try again.");
        }
            },

            facultySignup_validation: async(req,res)=>{
              const data = req.body;  // Store the entire request body
              const { name, email, phone, username, password, usertype } = data;  // Destructure individual fields from `data`
              const errors = {};
              
      
              // Validate input fields
              if (!name) {
                  errors.name = "*Name is required.";
              }
              if (!email) {
                  errors.email = "*Email is required.";
              }
              if (!phone) {
                  errors.phone = "*Phone number is required.";
              }
              if (!username) {
                  errors.username = "*Username is required.";
              }
              if (!password) {
                  errors.password = "*Password is required.";
              }
              if (!usertype) {
                errors.usertype = "*Usertype is required.";
            }
              
      
              // If there are validation errors, re-render the signup page with error messages
              if (Object.keys(errors).length > 0) {
                  return res.render("facultySignup", {
                  errors, 
                  username: req.body.username, 
                  name: req.body.name,
                  email: req.body.email,
                  phone: req.body.phone,
                  password: req.body.password,
                  usertype: req.body.usertype,
                 
                  });
              }
      
              try {
                  // Check if the username already exists in the database
                  const existingUser = await facultyCollection.findOne({ username });
      
                  // If the username exists, return an error message
                  if (existingUser) {
                  errors.username = "Username already taken. Please choose another one.";
                  return res.render("facultySignup", {
                      errors, 
                      username: req.body.username, 
                      name: req.body.name,
                      email: req.body.email,
                      phone: req.body.phone,
                      password: req.body.password,
                      usertype: req.body.usertype,
                      
                  });
                  }
      
                  // Insert data into the database
                  await facultyCollection.insertMany([data]);
      
                  // Redirect to welcome page
                  res.render("welcomeSignup", { name: data.name });
              } catch (error) {
                  console.error("Error during signup:", error);
                  res.send("Error during signup. Please try again.");
              }
                  },






      login_validation: async(req,res)=>{
                const { username, password, yeartype,usertype } = req.body;
                const errors = {};
              
                // Validate input fields
                if (!username) {
                  errors.username = "*Username is required.";
                }
                if (!password) {
                  errors.password = "*Password is required.";
                }
                if (!yeartype) {
                  errors.yeartype = "*yeartype is required.";
                }
                if (!usertype) {
                  errors.usertype = "*Role is required.";
                }
              
                // If there are validation errors, re-render the login page with error messages
                if (Object.keys(errors).length > 0) {
                  return res.render("login", { errors, username });
                }
                if(usertype==='Student'){
              
                try {
                  const user = await studentCollection.findOne({ username });
              
                  // Check if the username exists
                  if (!user) {
                    errors.username = "Username not found.";
                    return res.render("login", { errors, username,password });
                  }
              
                  // Check if the password matches
                  if (user.password !== password) {
                    errors.password = "Incorrect password.";
                    return res.render("login", { errors, username });
                  }
                  if (user.usertype !== usertype) {
                    errors.usertype = "Role not matched.";
                    return res.render("login", { errors, username,password });
                  }
              
                  // Store user info in session
                  req.session.username = user.username;
                  req.session.name = user.name;
                  req.session.usertype = user.usertype;

                  
                  // Redirect to home page and pass the username
              
                  
                    res.render('studentHome',{ name: user.name });
                 
                               
                } 
                catch (error) {
                  console.error("Error during login:", error);
                  res.send("Error during login. Please try again.");
                }
              }
              else if(usertype==='Faculty'){
                try {
                  const user = await facultyCollection.findOne({ username });
              
                  // Check if the username exists
                  if (!user) {
                    errors.username = "Username not found.";
                    return res.render("login", { errors, username,password });
                  }
              
                  // Check if the password matches
                  if (user.password !== password) {
                    errors.password = "Incorrect password.";
                    return res.render("login", { errors, username });
                  }
                  if (user.usertype !== usertype) {
                    errors.usertype = "Role not matched.";
                    return res.render("login", { errors, username,password });
                  }
                  // Store user info in session
                  req.session.username = user.username;
                  req.session.name = user.name;
                  req.session.usertype = user.usertype;         
                  // Redirect to home page and pass the username          
                  
                   res.render('facultyHome',{ name: user.name });                                               
                } 
                catch (error) {
                  console.error("Error during login:", error);
                  res.send("Error during login. Please try again.");
                }
              }

            },
                       //DIRECTING TO HOME PAGE
                     
            studentHome: async (req, res) => {
              const name = req.session.name;
            // Retrieve the name from session
              if (!name) {
                  return res.redirect('/login'); // Redirect to login if session is not set
              }
              res.render('studentHome', { name }); // Pass the name to the view
          },

          facultyHome: async (req, res) => {
            const name = req.session.name;
         
            if (!name) {
                return res.redirect('/login'); // Redirect to login if session is not set
            }
            res.render('facultyHome', { name }); // Pass the name to the view
        },
 
          studentProfile:async(req,res)=>{
            const name = req.session.name;
            try {
              // Find the user in the database by 'name'
              const user = await studentCollection.findOne({ name });
      
              // Check if the user exists in the database
              if (!user) {
                  return res.redirect('/login'); // If user not found, redirect to login
              }
      
              // Pass the entire user object to the profile view
              res.render('studentProfile', {
                  username: user.username,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  course:user.course,
                  semester:user.semester,
                  
                  // Add other user data you want to pass
              });
          } catch (error) {
              console.error("Error fetching user data:", error);
              res.send("Error fetching user data.");
          }
          },

          facultyProfile:async(req,res)=>{
            const name = req.session.name;
            try {
              // Find the user in the database by 'name'
              const user = await facultyCollection.findOne({ name });
      
              // Check if the user exists in the database
              if (!user) {
                  return res.redirect('/login'); // If user not found, redirect to login
              }
      
              // Pass the entire user object to the profile view
              res.render('facultyProfile', {
                  username: user.username,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  usertype:user.usertype,
                  
                  // Add other user data you want to pass
              });
          } catch (error) {
              console.error("Error fetching user data:", error);
              res.send("Error fetching user data.");
          }
          },

        viewStudTimetable:async(req,res)=>{
          
            res.render('viewStudTimetable');
         
          },
          viewFacTimetable:async(req,res)=>{
          
            res.render('viewStudTimetable');
         
          },
          //logut handling
          logout:async(req,res)=>{
            // For session-based authentication
            req.session.destroy((err) => {
            if (err) {
               console.error(err);
                 return res.redirect('/studentHome'); // Redirect to home even if an error occurs
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            return res.redirect('/login'); // Redirect to the login page
           });
          }
        


}
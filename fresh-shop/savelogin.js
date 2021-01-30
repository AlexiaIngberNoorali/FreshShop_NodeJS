<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <html>
<head>
</head>
<body>
 <!-- Registration form  -->
 <h1> Login </h1>
 <%- include ('./partials/message') %>

 <form action="/user/login" method="POST">
 <div>
 <label for="email">Email</label>
 <input
 type="email"
 name="email"
 placeholder="Enter Email"
 />
 </div>
 <div>
	 <label for="password">Password</label>
	 <input
	   type="password"
	   name="password"
	   placeholder="Enter Password"
	 />
   
 </div>
 <button type="submit" class="btn btn-primary btn-block">Login</button>
	
 </form>
</body>
</html>
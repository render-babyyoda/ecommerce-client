# cookieJar
Our team set out to create an ecommerce website that delivers cookies straight to your door. We created a site where you can buy & view your purchases all in one place. Our next step is to integrate Stripe and allow user's to write reviews on their favorite cookies.

# Links
Backend Repo
- https://github.com/render-babyyoda/ecommerce-backend
Deployed Backend
- https://intense-mesa-95377.herokuapp.com/
Deployed Client
- https://render-babyyoda.github.io/ecommerce-client/#/

# Planning Process and Problem-Solving Strategy
Wireframes and user stories were created and then translated over to our kanban board to schedule our tasks. On day one we hard coded the data for our cookies and displayed them to the homepage. After getting the resource data to show in React Cards, we added the purchase (POST) functionality to create a purchase. Once backend routes were complete, axios calls were added to the frontend and the layout started to take shape. After initial CRUD functionality, we successfully got an index of our resources to show with edit functions. Finally, we styled the app with a warm color scheme and cookie logos.

# Team Culture Code
Communicate branches & when to pull new information
Keeping team in loop
Giving constructive criticism
Being open-minded to constructive criticism
Reach out with issues
Be supportive


# User
- email
- hashedPassword
- token

# Purchases
- item_name : string
- item_price : number
- date_of_purchase : date
- notes: string
- owner: ref to user

# User Stories
- Version 1

As a user, I want to sign in
As a user, I want to sign in
as a user, i want to sign out
as a user, I want to change my password
as a user, I want to see what items are for sale
as a user, I want to purchase an item (create)
as a user, I want to view my purchased items (index)
as a user, i want to update my purchase (patch)
- Version 2

integrate stripe https://github.com/stripe/react-stripe-js
https://www.pluralsight.com/guides/how-to-integrate-stripe-with-react
----------- REQUIREMENTS END HERE --------

- Version 3

as a user, I want to add item to shopping cart (patch)
as a user, I want to remove item from shopping cart (patch/delete)
as a user, I want to add purchase items in shopping card (post)
- Version 4

as an admin, i want to add items

# Technologies Used
* HTML/SCSS
* JavaScript
* Bootstrap
* Axios

# wireframe
![Imgur](https://imgur.com/bNCqZnz.png)
![Imgur](https://imgur.com/orH9gvx.png)

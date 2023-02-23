- Errors during production 

CreatePostForm would not display error messages as expected and would always redirect me to sign in page.
After changing my form code considerably I finally realised it must be something else causing it. Evenetually saw that when defining my axiosReq interceptor in CurrentUserContext.js, I wrote the post request endpoint as "dj-rest/auth/token/refresh/ instead of dj-rest-auth/token/refresh/ and this then fixed the error affecting my form.

When defining the handlePin function in Post.js, I discovered an error where when you unpin a post and try to pin it once again an error is raised. I eventually concluded the error must be originating from one of my requests as both handlePin and handleUnpin functioned as expected when tested independantly. I finally noticed that I had missed "await" before the axios.post request in my handlePin function. Once this was added, the pinning functionality started working as planned.

When coding PostList.js, I came across a bug which prevented my posts from rendering on the home screen as expected. After comparing and testing various different pieces of code, I noticed that when declaring pathname to useLocation() in postList.js I used {} brackets around pathname instead of []. After changing this the problem was resolved.

When making my profilePage.js, I got an error saying the results was not defined in the following line 
"const [profile] = pageProfile.results;"
After some digging, I remembered I had not declared the pageProfile variable with the empty results array inside in ProfileDataContext.js. When I added this, my code then started to work as expected.


changes i made 

- editProfileForm.js Form.File line 136 added classname = d-none and line 145 changed image to profile_image so profile image preview shows as expected.

- move the edit profile dropdown from line 55 to line 67 and put it in a span with the profile username

- Add the extra location field to all required lines of code in EditProfileForm.js and add line 112-118 in profilepage.js (the same code as the bio but adjust it for location and add a font awesome icon by it)

- In editProfileForm.js, move the follow/unfollow button down below the bio and location - it looks way better

- Adjust he styles of profilePage in ProfilePage.module.css (add BioLocation styles and take bold away from Username)

- Create UseRedirect.js and hook to redirect users depending on loggedin status. Call this hook in the signinform and createaccountform.js as well as on the createPostForm.js page
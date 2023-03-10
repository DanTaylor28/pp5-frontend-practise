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

- Remove strict.mode tags wrapped around my components in index.js to get rid of some console errors

- Define the 3 tokentimestamp functions in utils.js and apply them to specific functions throughout the application to get rid of console errors (navbar.js, currentusercontext.js)

- run npm audit fix to see if I can fix any npm errors in the console.

- Create PageNotFound.js and module.css file to make a better looking page not found message. Call this component in App.js instead of the p tag message.

- Adjust react bootstrap imports in my components so they display like 
import Spinner from "react-bootstrap/Spinner"

- Change the title in index.html to my project name 

- Refetch user posts on login/out by importing and using useCurrentUser hook in PostList.js and adding currentUser to the dependency array along with the other 3 dependencies.

- In my api, in comments/serialziers.py add comment_liked_id to my fields and define the get_comment_liked_id the same way as you got the pinned_id but change the required parts.

- In comment.js include the code from line 77-109 which adds the thumbs up button next to the comment along with an if statement showing the correct font awesome icon. Also add comment_liked_id to the list of props at the top of the file.

- Define handleCommentLike in Comment.js and call it in the onclick value for the like button next to the comment.

- Define handleCommentUnlike in Comment.js and call it in the onclick value for the unlike button next to the comment.

- Switch out the bootstrap buttons you used for the comment likes in comment.js to a standard button tag to stop it lighting up in the blue color when you click it.

- Add line 50-63 in PostList.js to make searchbar show on smaller screens

- Add SearchMobile input to PostList.module.css
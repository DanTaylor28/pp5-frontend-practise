import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./api/axiosDefaults";
import CreateAccountForm from "./pages/auth/CreateAccountForm";
import SignInForm from "./pages/auth/SignInForm";
import CreatePostForm from "./pages/posts/CreatePostForm";
import PostDetail from "./pages/posts/PostDetail";
import PostList from "./pages/posts/PostList";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EditPostForm from "./pages/posts/EditPostForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import PasswordForm from "./pages/profiles/PasswordForm";
import EditProfileForm from "./pages/profiles/EditProfileForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.HomePage}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostList
                message="Follow some profiles or adjust your search to see some posts!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/pinboard"
            render={() => (
              <PostList
                message="Nothing to show.. Please adjust your search or pin some posts!"
                filter={`pins__owner__profile=${profile_id}&ordering=-pins__timestamp&`}
              />
            )}
          />
          <Route
            exact
            path="/discover"
            render={() => (
              <PostList message="Nothing to show.. Please adjust your search!" />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route
            exact
            path="/create/account"
            render={() => <CreateAccountForm />}
          />
          <Route exact path="/create/post" render={() => <CreatePostForm />} />
          <Route exact path="/posts/edit/:id" render={() => <EditPostForm />} />
          <Route exact path="/posts/:id" render={() => <PostDetail />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/edit/:id/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/edit/:id/password"
            render={() => <PasswordForm />}
          />
          <Route
            exact
            path="/profiles/edit/:id"
            render={() => <EditProfileForm />}
          />
          <Route render={() => <p>Page not found..</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;

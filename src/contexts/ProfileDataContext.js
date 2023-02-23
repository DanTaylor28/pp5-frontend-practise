import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    mostFollowedProfiles: { results: [] },
  });
  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(clickedProfile, profile, data.id)
          ),
        },
        mostFollowedProfiles: {
          ...prevState.mostFollowedProfiles,
          results: prevState.mostFollowedProfiles.results.map((profile) =>
            followHelper(clickedProfile, profile, data.id)
          ),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        mostFollowedProfiles: {
          ...prevState.mostFollowedProfiles,
          results: prevState.mostFollowedProfiles.results.map((profile) =>
            unfollowHelper(clickedProfile, profile)
          ),
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-num_of_followers"
        );
        setProfileData((prevState) => ({
          ...prevState,
          mostFollowedProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

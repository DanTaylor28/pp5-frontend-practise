import React from "react";
import { Dropdown } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";
import { useHistory } from "react-router-dom";

const IconToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`${btnStyles.EditDeleteIcon} fa-solid fa-pen`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const EditDeleteDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown drop="left">
      <Dropdown.Toggle as={IconToggle} />
      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item onClick={handleEdit} aria-label="edit-post">
          <i className="fa-solid fa-file-pen"></i>
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDelete} aria-label="delete-post">
          <i className="fa-solid fa-trash"></i>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export function EditProfileDropdown({ id }) {
  const history = useHistory();

  return (
    <Dropdown drop="left" className="ml-auto px-3">
      <Dropdown.Toggle as={IconToggle} />
      <Dropdown.Menu className="text-center">
        <Dropdown.Item
          onClick={() => history.push(`/profiles/edit/${id}`)}
          aria-label="edit-profile"
        >
          <i className="fa-solid fa-file-pen"></i>
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/edit/${id}/username`)}
          aria-label="edit-username"
        >
          <i className="fa-solid fa-file-pen"></i>
          Change Username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/edit/${id}/password`)}
          aria-label="edit-password"
        >
          <i className="fa-solid fa-file-pen"></i>
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

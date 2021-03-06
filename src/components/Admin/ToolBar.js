import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useAdminContext } from "../Context/AdminContext";
import MessageBox from "./MessageBox";
import { useNavigate } from "react-router-dom";
function ToolBar() {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const {
    isManagePressed,
    setIsManagePressed,
    onSearch,
    deleteMessageShowed,
    showDeleteMessage,
    closeDeleteMessage,
    onDeleteClicked,
    selectedTab,
  } = useAdminContext();

  return (
    <div className="toolbar">
      <div className="search-bar">
        <input
          placeholder="Search"
          type="text"
          size="50"
          ref={searchRef}
        ></input>
        <button
          className="btn-search"
          onClick={() => onSearch(searchRef.current.value)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
        </button>
      </div>
      <div className="toolbar-options">
        {isManagePressed ? (
          <div className="toolbar-btn-grp">
            <button
              className="btn-gray"
              onClick={() => setIsManagePressed(false)}
            >
              Cancel
            </button>
            <button className="btn-red" onClick={() => showDeleteMessage()}>
              Delete
            </button>
            <button
              className="btn-blue"
              onClick={() =>
                navigate(`/admin/${selectedTab.toLowerCase()}/add`)
              }
            >
              Add Item
            </button>
          </div>
        ) : (
          <button className="btn-blue" onClick={() => setIsManagePressed(true)}>
            Manage
          </button>
        )}
        {deleteMessageShowed && (
          <MessageBox
            message="Are you sure you want to delete?"
            btn1Text="Delete"
            btn2Text="Cancel"
            btn1EventHandler={onDeleteClicked}
            btn2EventHandler={closeDeleteMessage}
          />
        )}
      </div>
    </div>
  );
}
export default ToolBar;

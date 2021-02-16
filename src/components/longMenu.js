import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
  'Edit',
  'Delete'
  
];

const ITEM_HEIGHT = 48;

export default function LongMenu({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    fetch(`http://localhost:4000/api/delete_comment/${id}`, {method:"DELETE"})
    .then((response)=>response.json())
    .then((data)=> console.log(data))
    setAnchorEl(null);
  };
  const handleEdit = () =>{
    fetch(`http://localhost:4000/api/delete_comment/${id}`, {method:"DELETE"})
    .then((response)=>response.json())
    .then((data)=> console.log(data))
    setAnchorEl(null);
  };
  const handleClose = () =>{
    setAnchorEl(null);
  };

  return (
    <div style={{position: "absolute",top: "-1px",right: "-1px", marginLeft:"5px"}}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key="Edit" selected='Edit' onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem key="Delete" onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

import { useId, useState } from "react";
import { Button, Menu as MuiMenu, MenuItem } from "@mui/material";

const Menu = () => {
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const list = ["가", "나", "다", "라"];

  return (
    <div>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        메뉴
      </Button>
      <MuiMenu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
          },
        }}
      >
        {list.map((item) => (
          <MenuItem onClick={handleClose} key={item}>
            {item}
          </MenuItem>
        ))}
      </MuiMenu>
    </div>
  );
};

export default Menu;

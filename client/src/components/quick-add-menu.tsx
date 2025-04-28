import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const QuickAddMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IoAddCircleOutline size={"28px"} />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Button
            size="small"
            disableRipple
            component={Link}
            to="/warehouses/add"
          >
            Add Warhouse
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            size="small"
            disableRipple
            component={Link}
            to="/products/add"
          >
            Add Product
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button size="small" disableRipple component={Link} to="/vendor/add">
            Add Vendor
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

{
  /*
    </> */
}

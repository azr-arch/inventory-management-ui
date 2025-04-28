import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { QuickAddMenu } from "./quick-add-menu";

const navRoutes = [
  {
    href: "/warehouses",
    label: "Warehouse",
  },
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/purchase",
    label: "Purchase Orders",
  },
  {
    href: "/sale",
    label: "Sales Orders",
  },
  {
    href: "/vendor",
    label: "Vendor",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Link to={"/"}>
            <Box
              component="img"
              src="https://uat-orggencrm.s3.ap-south-1.amazonaws.com/client1/public/logo.png"
              alt="Logo"
              sx={{
                height: 40,
                mr: 2,
                display: { xs: "none", md: "flex" },
                bgcolor: "white",
                p: 0.5,
                borderRadius: 1,
              }}
            />
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: 1,
            }}
          >
            <QuickAddMenu />
            <Tooltip title="Support No.:8104797220">
              <IconButton color="inherit">
                <MdOutlineSupportAgent size={"28px"} />
              </IconButton>
            </Tooltip>
            <Typography variant="body1">8104797220</Typography>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: "1.5rem",
              },
            }}
          >
            {navRoutes.map((route) => (
              <Link
                to={route.href}
                key={route.href}
                data-active={pathname.includes(route.href)}
                className="nav-link"
              >
                {route.label}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// {/ Add Icon with dropdown /}
//             <Tooltip title="Add">
//               <IconButton
//                 color="inherit"
//                 // onClick={(e) =>
//                 //   handleMenuOpen(e, [
//                 //     { name: "Add Ticket", route: "/ticket/add" },
//                 //     { name: "Add Activity", route: "/activity/add-activity" },
//                 //   ])
//                 // }
//               >
//                 <IoAddCircleOutline />
//               </IconButton>
//             </Tooltip>

//
//             {/ Support Icon with badge /}
//             <Tooltip title="Support No.:8104797220">
//               <IconButton color="inherit">
//                 <MdOutlineSupportAgent />
//               </IconButton>
//             </Tooltip>
//

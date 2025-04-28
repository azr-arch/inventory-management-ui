import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { ConfirmModal } from "./modal/confirm-modal";

export const WarehouseCard = ({
  warehouse,
}: {
  warehouse: {
    id: number;
    name: string;
    desc: string;
    code: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
}) => {
  const { id, name, desc, code, city, country } = warehouse;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"Delete warehouse"}
        description="
                Are you sure you want to delete this warehouse? This action cannot be
                undone and will permanently remove all associated data."
        onConfirm={() => {}}
      />
      <Card
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "box-shadow 0.3s",
          maxWidth: { lg: "800px" },
          mx: "auto",
          boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
          ":hover": {
            boxShadow: "0 0px 10px rgba(0, 0, 0, 0.1)",
          },
          p: 2,
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{name}</Typography>
            <Chip label={code} size="small" color="primary" />
          </Box>

          <Typography variant="body2" color="text.secondary" mt={1}>
            {desc}
          </Typography>

          <Box display="flex" alignItems="center" mt={2}>
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{`${city}, ${country}`}</Typography>
          </Box>
        </CardContent>

        <CardActions>
          <Button
            component={Link}
            to={`/warehouses/${id}`}
            sx={{ ml: "auto", textTransform: "capitalize" }}
            size="small"
            color="primary"
            variant="outlined"
            startIcon={<Visibility />}
          >
            View
          </Button>
          <Button
            component={Link}
            to={`/warehouses/edit/${id}`}
            sx={{ ml: "auto", textTransform: "capitalize" }}
            size="small"
            color="info"
            variant="outlined"
            startIcon={<Edit />}
          >
            Edit
          </Button>
          <Button
            // component={Link}
            // to={`/warehouse/${id}`}
            sx={{ ml: "auto", textTransform: "capitalize" }}
            size="small"
            color="error"
            variant="outlined"
            startIcon={<Delete />}
            onClick={handleOpenDeleteModal}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

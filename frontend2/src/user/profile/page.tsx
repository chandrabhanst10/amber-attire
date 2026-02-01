"use client"
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, UserProfileData } from "../../redux/slices/userSlice";
import { AppDispatch, useAppSelector } from "../../redux/store";
import CustomButton from "../../Components/CustomButton";
import ProfileSkeleton from "../../Components/skeletons/ProfileSkeleton";
import UserLayout from "../../layout";


const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileData>({
    "_id": "",
    "name": "",
    "email": "",
    "phone": "",
    "isVerified": false,
    "role": "",
    "createdAt": "",
    "updatedAt": "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useAppSelector((state) => (state.user))
  const [billingAddress, setBillingAddress] = useState("123, Bhopal, India");
  const [shippingAddress, setShippingAddress] = useState("456, Mumbai, India");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");

  useEffect(() => {
    getUserProfileData();
  }, []);

  const getUserProfileData = async () => {
    let response = await dispatch(getUserProfile());
    if (getUserProfile.fulfilled.match(response)) {
      setUserData(response.payload); // ✅ payload is already UserProfileData
    } else {
      console.error("Error:", response.payload);
    }
  }
  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleProfilePicChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  if (loading) {
    return (
      // Assuming UserLayout is needed or handled by parent. 
      // If UserProfile renders layout, I should wrap it.
      // Based on code, it doesn't seem to render layout.
      // I'll import UserLayout to be safe.
      <UserLayout>
        <ProfileSkeleton />
      </UserLayout>
    )
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar src={profilePic} sx={{ width: 100, height: 100 }} />
        <IconButton component="label" sx={cameraIconStyle}>
          <CameraAltIcon />
          <input type="file" hidden accept="image/*" onChange={handleProfilePicChange} />
        </IconButton>
      </ProfileHeader>
      <Typography variant="h5" fontWeight="bold" align="center" margin={2}>
        My Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <StyledTextField
            fullWidth
            label="Full Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <StyledTextField
            fullWidth
            label="Email Address"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <StyledTextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        {isEditing && <Grid size={{ xs: 12, sm: 12 }}>
          <StyledTextField
            fullWidth
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>}
      </Grid>

      <ActionButtons>
        {isEditing ? (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <CustomButton
              label="Cancel"
              onClick={() => setIsEditing(false)}
              fullWidth={true}
            />
            <SaveButton variant="contained" startIcon={<SaveIcon />} onClick={toggleEdit}>
              Save Changes
            </SaveButton>
          </Box>
        ) : (

          <EditButton variant="outlined" startIcon={<EditIcon />} onClick={toggleEdit}>
            Edit Profile
          </EditButton>
        )}
      </ActionButtons>
    </ProfileContainer>
  );
};

export default UserProfile
const ProfileContainer = styled(Box)(({ theme }) => ({
  maxWidth: "700px",
  margin: "auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: "15px",
  },
}));

const ProfileHeader = styled(Box)({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  marginBottom: "20px",
});

const cameraIconStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "white",
  borderRadius: "50%",
  padding: "5px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
};

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const StyledCard = styled(Card)({
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  padding: "10px",
});

const ActionButtons = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
});

const EditButton = styled(Button)({
  borderColor: "black",
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  padding: "10px 20px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#333",
  },
});

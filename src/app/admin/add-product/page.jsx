"use client"
import React from "react";
import { Box, Grid, TextField, Typography, Button, Switch, Select, MenuItem, Chip, FormControlLabel, InputLabel, FormControl, OutlinedInput } from "@mui/material";
import WithAdminLayout from "@/app/HOC/WithAdminLayout";

const sizes = ["S", "M", "L", "XL"];

const AddProduct = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Button variant="text" sx={{ mb: 2 }}>
        &lt; Back
      </Button>

      <Typography variant="h5" fontWeight="bold" mb={3} color="#fff">
        Add Product
      </Typography>

      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item  size={{xs:12, md:8}}>
          <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
            {/* Information */}
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Information
            </Typography>
            <TextField fullWidth label="Product Name" placeholder="Summer T-Shirt" margin="normal" />
            <TextField
              fullWidth
              label="Product Description"
              multiline
              rows={4}
              margin="normal"
              placeholder="Product description"
            />

            {/* Images */}
            <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
              Images
            </Typography>
            <Box
              border="2px dashed #ccc"
              p={3}
              textAlign="center"
              borderRadius={2}
              sx={{ cursor: "pointer" }}
            >
              <Button variant="contained">Add File</Button>
              <Typography variant="body2" color="textSecondary" mt={1}>
                Or drag and drop files
              </Typography>
            </Box>

            {/* Price */}
            <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
              Price
            </Typography>
            <Grid container spacing={2}>
              <Grid item  size={{xs:12, sm:6,}}>
                <TextField fullWidth label="Product Price" />
              </Grid>
              <Grid item size={{xs:12, sm:6,}}>
                <TextField fullWidth label="Discount Price" />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Add tax for this product"
              sx={{ mt: 2 }}
            />

            {/* Different Options */}
            <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
              Different Options
            </Typography>
            <FormControlLabel
              control={<Switch color="primary" defaultChecked />}
              label="This product has multiple options"
            />
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item  size={{xs:12, sm:4,}}>
                  <FormControl fullWidth >
                    <InputLabel>Size</InputLabel>
                    <Select defaultValue="" label="Size">
                      <MenuItem value="Size">Size</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid itemsize={{xs:12, sm:8}}>
                  <FormControl fullWidth>
                    <InputLabel>Values</InputLabel>
                    <Select
                      multiple
                      value={sizes}
                      input={<OutlinedInput label="Values" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button variant="text" sx={{ mt: 2 }}>
                Add More
              </Button>
            </Box>

            {/* Shipping */}
            <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
              Shipping
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={{xs:12, sm:6}}>
                <TextField fullWidth label="Weight" />
              </Grid>
              <Grid item size={{xs:12, sm:6}}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select defaultValue="" label="Country">
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="This is a digital item"
              sx={{ mt: 2 }}
            />
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item size={{xs:12, md:4}}>
          <Grid container direction="column" spacing={2}>
            {/* Categories */}
            <Grid item>
              <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Categories
                </Typography>
                <FormControlLabel control={<Switch />} label="Women" />
                <FormControlLabel control={<Switch />} label="Men" />
                <FormControlLabel control={<Switch />} label="T-Shirt" />
                <FormControlLabel control={<Switch />} label="Hoodie" />
                <FormControlLabel control={<Switch />} label="Dress" />
                <Button variant="text" sx={{ mt: 1 }}>
                  Create New
                </Button>
              </Box>
            </Grid>

            {/* Tags */}
            <Grid item>
              <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Tags
                </Typography>
                <TextField fullWidth label="Add Tags" margin="normal" />
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  <Chip label="T-Shirt" />
                  <Chip label="Men Clothes" />
                  <Chip label="Summer Collection" />
                </Box>
              </Box>
            </Grid>

            {/* SEO Settings */}
            <Grid item>
              <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  SEO Settings
                </Typography>
                <TextField fullWidth label="Title" margin="normal" />
                <TextField fullWidth label="Description" multiline rows={3} margin="normal" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
        <Button variant="outlined" sx={{color:"#fff",border:"1px solid #fff"}}>
          Cancel
        </Button>
        <Button variant="outliend" sx={{color:"#fff",border:"1px solid #fff"}}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default WithAdminLayout(AddProduct);

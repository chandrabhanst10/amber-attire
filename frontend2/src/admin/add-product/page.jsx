"use client"
import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Switch, Select, MenuItem, Chip, FormControlLabel, InputLabel, FormControl, OutlinedInput, IconButton, Checkbox, ListItemText, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../lib/axiosInstance";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { addProduct, uploadImages } from "../../redux/slices/productSlice";


const sizes = ["S", "M", "L", "XL", "XXL"];
const types = [{ name: "Elephant", tag: "EL" }, { name: "Horse", tag: "HR" }, { name: "Eagle", tag: "ER" },];
const colors = [
  { name: "Red", hexCode: "#FF0000" },
  { name: "Blue", hexCode: "#0000FF" },
  { name: "Green", hexCode: "#00FF00" }
];

const fits = ["Regular", "Slim", "Loose", "Oversized"];
const sleeveTypes = ["Half Sleeve", "Full Sleeve", "Sleeveless"];
const neckTypes = ["Round Neck", "V Neck", "Collared"];
const fabrics = ["Cotton", "Polyester", "Linen"];
const materialCares = ["Machine wash", "Hand wash only"];

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tag: "", tags: [], sizes: [], fits: [], images: [], imageCode: "", colors: [] });
  const [images, setImages] = useState([])
  const [upload, setUpload] = useState(false);
  const dispatch = useDispatch()
  const { loading, imageUploaded } = useSelector((state) => state.product);
  const [uploadLoading, setUploadLoading] = useState(false)


  const handleFiles = async (event) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    setImages(files)
    const base64Files = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              name: file.name,
              type: file.type,
              data: reader.result.split(",")[1], // remove data:image/*;base64,
            });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...base64Files],
    }));
    event.target.value = "";
  };


  const handleBack = () => {
    navigate("/admin/products")
  };
  const handleOnchange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.checked ? "category" : event.target.name]: event.target.checked ? event.target.name : event.target.value
    }))
  }

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index), // ✅ remove by index
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && formData.tag.trim() !== "") {
      e.preventDefault(); // prevent form submit

      if (!formData.tags.includes(formData.tag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.tags.trim()],
          tag: ""
        }));
      } else {
        setFormData((prev) => ({ ...prev, tag: "" }));
      }
    }
  };

  const handleDelete = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToDelete),
    }));
  };

  const generateCode = useMemo(() => {
    const { type, sizes, stock, sku } = formData;

    const safeType = type ?? "";         // if undefined/null → ""
    const safeSize = sizes?.[0] ?? "";   // safely access first size
    const safeStock = stock ?? "";
    const safeSku = sku ?? "";

    if (!safeType && !safeSize) return ""; // only return empty if both missing
    setFormData((prev) => ({
      ...prev,
      imageCode: `${safeType.toUpperCase()}-${safeSize.toUpperCase()}-${safeStock.toUpperCase()}-${safeSku.toUpperCase()}-${Date.now()}`
    }))
    return `${safeType.toUpperCase()}-${safeSize.toUpperCase()}-${safeStock.toUpperCase()}-${safeSku.toUpperCase()}-${Date.now()}`;
  }, [formData.type, formData.sizes, formData.stock, formData.sku]);



  const handleChange = (event, field) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  useEffect(() => {
    if (imageUploaded) {
      setUploadLoading(false);
      setUpload(true)
    }
  }, [imageUploaded])
  const uploadMediaOnAws = async () => {
    setUploadLoading(true)
    await dispatch(uploadImages({ files: images, imageCode: formData.imageCode }))
  }

  const handleSubmitDisable = (formData) => {
    const checks = [
      // required strings
      () => ["productName", "slug", "description", "shortDescription", "category", "type", "sleeveType", "neckType", "fabric", "materialCare", "imageCode"]
        .some(f => !formData[f]?.toString().trim()),

      // required numbers
      () => !(formData.price > 0 && formData.discountPrice >= 0 && formData.stock >= 0),

      // required arrays
      () => ["tags", "sizes", "fits"].some(f => !formData[f]?.length),
    ];

    return checks.some(fn => fn()); // true = disable
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await dispatch(addProduct(formData))
    if (response.payload.data.product) {
      navigate("/admin/products")
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      {loading && <Loader />}
      {/* <Button variant="text" sx={{color: "#fff" }} onClick={handleBack}>
        &lt; Back
      </Button> */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="#fff">
            Add Product
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={2} gap={2}>
            <Button variant="outlined" sx={{ color: "#fff", border: "1px solid #fff" }} onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="outliend" type="submit" sx={{ color: "#fff", border: "1px solid #fff" }} disabled={handleSubmitDisable(formData)} onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField required fullWidth label="Product Name" placeholder="Summer T-Shirt" margin="normal" name={"productName"} value={formData.productName} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField required fullWidth label="Slug" placeholder="slug" margin="normal" name={"slug"} value={formData.slug} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Product Description"
                    margin="normal"
                    placeholder="Product description"
                    value={formData.description}
                    name="description"
                    onChange={handleOnchange}
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Short Description"
                    margin="normal"
                    placeholder="short description"
                    value={formData.shortDescription}
                    name="shortDescription"
                    onChange={handleOnchange}
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}></Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
                    Type/Size
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                          label="Type"
                          value={formData.type}
                          name="type"
                          onChange={handleOnchange}
                          required
                        >
                          {types.map((size) => (
                            <MenuItem key={size} value={size.tag}>
                              {size.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Size</InputLabel>
                        <Select
                          labelId="sizes-label"
                          multiple
                          value={formData.sizes}
                          onChange={(e) => handleChange(e, "sizes")}
                          input={<OutlinedInput label="Sizes" />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                              <Checkbox checked={formData?.sizes?.indexOf(size) > -1} />
                              <ListItemText primary={size} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  {/* Price */}
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
                    Price
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <TextField required fullWidth label="Product Price" name="price" value={formData.price} onChange={handleOnchange} />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <TextField required fullWidth label="Discount Price" name="discountPrice" value={formData.discountPrice} onChange={handleOnchange} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
                    Variants for Clothing
                  </Typography>
                  <Grid container spacing={2}>
                    {/* Color */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Colors</InputLabel>
                        <Select
                          label="Colors"
                          multiple
                          name="colors"
                          value={formData.colors}
                          onChange={(e) => handleOnchange(e, "colors")}
                          input={<OutlinedInput label="Colors" />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {colors.map((color) => (
                            <MenuItem key={color} value={color}>
                              <Checkbox checked={formData?.colors?.indexOf(color) > -1} />
                              <ListItemText primary={color.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Fit */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Fit</InputLabel>
                        <Select
                          labelId="fits-label"
                          multiple
                          value={formData.fits}
                          onChange={(e) => handleChange(e, "fits")}
                          input={<OutlinedInput label="Fits" />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {fits.map((fit) => (
                            <MenuItem key={fit} value={fit}>
                              <Checkbox checked={formData?.fits?.indexOf(fit) > -1} />
                              <ListItemText primary={fit} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Sleeve Type */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Sleeve Type</InputLabel>
                        <Select
                          label="Sleeve Type"
                          name="sleeveType"
                          value={formData.sleeveType}
                          onChange={handleOnchange}
                        >
                          {sleeveTypes.map((s, i) => (
                            <MenuItem key={i} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Neck Type */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Neck Type</InputLabel>
                        <Select
                          label="Neck Type"
                          name="neckType"
                          value={formData.neckType}
                          onChange={handleOnchange}
                        >
                          {neckTypes.map((n, i) => (
                            <MenuItem key={i} value={n}>
                              {n}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Fabric */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Fabric</InputLabel>
                        <Select
                          label="Fabric"
                          name="fabric"
                          value={formData.fabric}
                          onChange={handleOnchange}
                        >
                          {fabrics.map((f, i) => (
                            <MenuItem key={i} value={f}>
                              {f}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Material Care */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Material Care</InputLabel>
                        <Select
                          label="Material Care"
                          name="materialCare"
                          value={formData.materialCare}
                          onChange={handleOnchange}
                        >
                          {materialCares.map((m, i) => (
                            <MenuItem key={i} value={m}>
                              {m}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price */}
              <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
                Inventory
              </Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextField required fullWidth label="Stock" name="stock" value={formData.stock} onChange={handleOnchange} type="number" />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextField fullWidth label="Sku" name="sku" value={formData.sku || ""} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextField fullWidth label="imageCode" name="imageCode" value={generateCode || ""} />
                </Grid>
              </Grid>

            </Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Grid container direction="column" spacing={2}>
              {/* Categories */}
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Categories
                  </Typography>
                  <FormControlLabel control={<Switch checked={formData.category === "shirt"} onChange={handleOnchange} name="shirt" />} label="Shirt" />
                  <FormControlLabel control={<Switch checked={formData.category === "kurta"} onChange={handleOnchange} name="kurta" />} label="Kurta" />
                </Box>
              </Grid>
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Tags
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    label="Add Tag"
                    placeholder="Add Tag"
                    margin="normal"
                    name="tag"
                    value={formData.tag || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tag: e.target.value }))
                    }
                    onKeyDown={handleKeyDown}
                  />
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    {Array.isArray(formData.tags) && formData.tags.map((t, i) => (
                      <Chip key={i} label={t} onDelete={() => handleDelete(t)} />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  {/* Images */}
                  <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                    Images
                  </Typography>
                  <Typography variant="subtitle2" mb={1}>
                    {(formData.images.length === 4 && formData.imageCode === "") ? "Please generate image code" : (formData.images.length !== 4 || formData.imageCode === "") ? "Please choose 4 images to upload" : ""}
                  </Typography>
                  <Box display={"flex"}>
                    {(formData.images.length === 4) ? <Button variant="outlined" component="label" onClick={uploadMediaOnAws} endIcon={uploadLoading && <CircularProgress size={10} />}>Upload</Button>
                      : <Button variant="contained" component="label">Choose Images<input type="file" hidden accept="image/*" multiple onChange={handleFiles} /></Button>}
                  </Box>
                  {/* Preview Images */}
                  <Grid container spacing={2} mt={2}>
                    {formData.images.map((file, index) => (
                      <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }} key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`data:${file.type};base64,${file.data}`}
                            alt={file.name}
                            style={{ width: "100%", height: 125, objectFit: "cover" }}
                          />
                          <IconButton
                            size="small"
                            sx={{ position: "absolute", top: 4, right: 4, bgcolor: "white" }}
                            onClick={() => removeImage(index)}
                          >
                            {upload ? <CheckCircleIcon color="green" /> : <DeleteIcon fontSize="small" />}
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddProduct

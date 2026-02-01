"use client"
import { Box, Tab, Tabs, Typography, Grid, Button } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled, Theme } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../redux/store"
import { fetchProducts, getProductByGender } from "../../redux/slices/productSlice"
import ProductCard from "../../Components/ProductCard"
import { Home1, Home2, Home3, Home4 } from "../../Assets"
import { IProduct } from "../../types"
import UserLayout from '../../layout';
import HomeSkeleton from '../../Components/skeletons/HomeSkeleton';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [genderProduct, setGenderProduct] = useState<{ mens: any, women: any }>({ mens: [], women: [] })
  const { loading } = useSelector((state: RootState) => (state.product))
  const [showMore, setShowMore] = useState(3)
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  useEffect(() => {
    fetchAllProducts();
    getProductsByGender()
  }, []);



  const fetchAllProducts = useCallback(async () => {
    try {
      const result = await dispatch(fetchProducts(1)).unwrap();
      setProducts(result?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [dispatch])

  const getProductsByGender = useCallback(async () => {
    try {
      const result = await dispatch(getProductByGender()).unwrap();
      setGenderProduct(result?.data || { mens: [], women: [] });
    } catch (error) {
      console.error("Failed to fetch gender products:", error);
    }
  }, [dispatch])

  const handleChange = (event: any, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleShowMore = () => {
    let size = products.length === showMore ? 3 : products.length
    setShowMore(size)
  };

  /* Redesigned Section 1: New This Week */
  const Section1 = useMemo(() => {
    return (
      <SectionContainer>
        <Box mb={4}>
          <GradientHeading variant="h4" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            New This Week
          </GradientHeading>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', margin: '10px auto' }}>
            Fresh arrivals to elevate your wardrobe. Discover the latest trends today.
          </Typography>
        </Box>
        <Box sx={{ padding: '0 20px' }}>
          <Slider {...settings}>
            {products.map((item: IProduct) => {
              return (
                <Box key={item._id} sx={{ padding: '10px' }}>
                  <ProductCard
                    productImage={item?.images?.[0] || ""}
                    productSubTitle={item.productName}
                    productTitle={item.productName}
                    productPrice={item.price}
                    productColorCount={item.productColorCount}
                    path={"/user/products/tag/latest"}
                  />
                </Box>
              )
            })}
          </Slider>
        </Box>
      </SectionContainer>
    );
  }, [products, settings]);

  const TabPanel = ({ children, value, index, }: { children: any, value: any, index: number, }) => {
    return (
      <div hidden={value !== index} style={{ width: '100%' }}>
        {value === index && (
          <Box p={3}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  };

  const RenderProductGrid = ({ items }: { items: IProduct[] }) => (
    <Grid container spacing={3}>
      {items.slice(0, showMore).map((item: IProduct, index: any) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, }} key={index}>
          <ProductCard
            productImage={item?.images?.[0] || ""}
            productSubTitle={item.productName}
            productTitle={item.productName}
            productPrice={item.price}
            productColorCount={item.productColorCount}
            path={"/user/products"}
          />
        </Grid>
      ))
      }
    </Grid >
  );

  /* Redesigned Section 2: Collections */
  const Section2 = useMemo(() => {
    return (
      <SectionContainer>
        <GradientHeading variant="h4" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 3 }}>
          XIV Collections 24-25
        </GradientHeading>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledTabs value={tabIndex} onChange={handleChange} centered>
            <StyledTab label="All" />
            <StyledTab label="Mens" />
            <StyledTab label="Women" />
          </StyledTabs>

          <Box sx={{ width: '100%', mt: 4 }}>
            <TabPanel value={tabIndex} index={0}><RenderProductGrid items={products} /></TabPanel>
            <TabPanel value={tabIndex} index={1}><RenderProductGrid items={Array.isArray(genderProduct) ? genderProduct.mens : []} /></TabPanel>
            <TabPanel value={tabIndex} index={2}><RenderProductGrid items={Array.isArray(genderProduct) ? genderProduct.women : []} /></TabPanel>
          </Box>

          <Button
            onClick={handleShowMore}
            sx={{
              mt: 4,
              color: '#FE6B8B',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { background: 'rgba(254, 107, 139, 0.04)' }
            }}
          >
            {showMore === 3 ? "Show More Products" : "Show Less"}
          </Button>
        </Box>
      </SectionContainer>
    );
  }, [tabIndex, products, genderProduct, showMore]);

  /* Redesigned Section 3: Our Approach */
  const Section3 = useMemo(() => {
    return (
      <ApproachSection>
        <Box mb={6}>
          <GradientHeading variant="h4" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
            OUR APPROACH TO FASHION
          </GradientHeading>
          <Subheading>
            At Elegant Vogue, we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time.
            Each design is meticulously crafted, ensuring the highest quality and exquisite finish.
          </Subheading>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {[Home1, Home2, Home3, Home4].map((img, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3, }} key={index}>
              <ImageCard>
                <img src={img} alt={`fashion-approach-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* <div className="overlay">
                  <Typography variant="h6" color="white" fontWeight="bold">Explore</Typography>
                </div> */}
              </ImageCard>
            </Grid>
          ))}
        </Grid>
      </ApproachSection>
    );
  }, []);

  /* New Hero Section */
  const HeroSection = useMemo(() => {
    return (
      <Box sx={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginBottom: '40px',
        borderRadius: '16px',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}>
          Discover Your Style
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Explore our latest collection of premium fashion
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/user/products')}
          sx={{
            backgroundColor: 'white',
            color: '#FF8E53',
            fontWeight: 'bold',
            padding: '12px 36px',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          Explore Now
        </Button>
      </Box>
    );
  }, [navigate]);

  if (loading) return (
    <UserLayout>
      <HomeSkeleton />
    </UserLayout>
  )

  return (
    <UserLayout>

      <HomePageContainer>
        {HeroSection}
        {Section1}
        {Section2}
        {Section3}
      </HomePageContainer>
    </UserLayout>
  )
}

export default HomePage

/* Styled Components */
const HomePageContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: "20px 40px",
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 15px",
  },
}));

const SectionContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  margin: "40px 0",
  padding: "40px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px",
  boxShadow: theme.shadows[1],
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 10px",
    margin: "20px 0",
  },
}));

const ApproachSection = styled("section")(({ theme }: { theme: Theme }) => ({
  padding: "80px 20px",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const GradientHeading = styled(Typography)(({ theme }: { theme: Theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const Subheading = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: '1.1rem',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: 1.8,
  color: theme.palette.text.secondary,
  fontWeight: 300,
}));

const StyledTabs = styled(Tabs)(({ theme }: { theme: Theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  margin: '0 10px',
  padding: '10px 20px',
  borderRadius: '30px',
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    color: '#fff',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 4px 10px rgba(254, 107, 139, 0.3)',
  },
}));

const ImageCard = styled(Box)(({ theme }: { theme: Theme }) => ({
  height: '400px',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[6],
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.3)',
    opacity: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.3s ease',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
}));

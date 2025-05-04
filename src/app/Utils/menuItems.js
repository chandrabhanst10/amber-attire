import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import HelpIcon from '@mui/icons-material/Help';

const menuItems = [
  {
    label: 'My Profile',
    icon: <AccountCircleIcon />,
    path: '/Pages/profile',
  },
  {
    label: 'Products',
    icon: <AccountCircleIcon />,
    path: '/Pages/products',
  },
  {
    label: 'My Orders',
    icon: <HistoryIcon />,
    path: '/Pages/orders',
  },
  {
    label: 'Wishlist',
    icon: <FavoriteIcon />,
    path: '/Pages/wishlist',
  },
  {
    label: 'My Cart',
    icon: <ShoppingCartIcon />,
    path: '/Pages/cart',
  },
  {
    label: 'Help & Support',
    icon: <HelpIcon />,
    path: '/Pages/help',
  },
];

export default menuItems;

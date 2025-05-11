import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import HelpIcon from '@mui/icons-material/Help';

const menuItems = [
  {
    label: 'My Profile',
    icon: <AccountCircleIcon />,
    path: '/user/profile',
  },
  {
    label: 'Products',
    icon: <AccountCircleIcon />,
    path: '/user/products',
  },
  {
    label: 'My Orders',
    icon: <HistoryIcon />,
    path: '/user/orders',
  },
  {
    label: 'Wishlist',
    icon: <FavoriteIcon />,
    path: '/user/wishlist',
  },
  {
    label: 'My Cart',
    icon: <ShoppingCartIcon />,
    path: '/user/cart',
  },
  {
    label: 'Help & Support',
    icon: <HelpIcon />,
    path: '/user/help',
  },
];

export default menuItems;

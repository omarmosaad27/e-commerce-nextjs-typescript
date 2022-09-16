import Head from 'next/head';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Badge,
} from '@mui/material';
type props = {
  title: string;
  children: any;
}
import { useGlobalContext } from '../context/context';
function Layout({ title, children }: props): JSX.Element {
  const { cartQuantity } = useGlobalContext();

  return (
    <>
      <Head>
        <title>{title ? title : 'Home'}</title>
        <meta name="description" content="e-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link href={'/'}>e commerce</Link>
            <Link href={'cart'}>
              <Typography
                sx={{
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontSize: '1.5rem',
                }}
              >
                <Badge badgeContent={cartQuantity} color="secondary">
                  <AiOutlineShoppingCart />
                </Badge>
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;

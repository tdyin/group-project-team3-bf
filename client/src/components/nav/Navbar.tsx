import { styled } from '@mui/material/styles'
import { Button, IconButton, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleNavAction } from '../../redux/actions/navActions'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

type Props = {
  isHr: boolean
}

export default function Navbar({ isHr }: Props) {
  const dispatch = useAppDispatch()
  const navState = useAppSelector((state) => state.nav)

  const handleDrawerOpen = () => {
    dispatch(toggleNavAction({ open: true }))
  }

  const handleDrawerClose = () => {
    dispatch(toggleNavAction({ open: false }))
  }

  return (
    <>
      <AppBar position='fixed' open={navState.open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(navState.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              flexGrow: 1,
            }}
          >
            {isHr ? 'HR Management' : 'Empolyee Portal'}
          </Typography>
          <Button variant='contained' color='warning' disableElevation>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      
      <Sidebar
        open={navState.open}
        handleDrawerClose={handleDrawerClose}
        userType={isHr}
      />
      <Outlet /> {/**Output the child routes */}
    </>
  )
}

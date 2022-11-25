import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import {
  AccountBox,
  NightShelter,
  AirplaneTicket,
  ChevronLeft,
  People,
  GroupAdd,
} from '@mui/icons-material/'
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

type Props = {
  open: boolean
  userType: boolean
  handleDrawerClose: () => void
}

export default function Sidebar({ open, userType, handleDrawerClose }: Props) {
  const navigate = useNavigate()
  const HrOptions = ['All Profiles', 'Visa Status', 'Hiring', 'Housing']
  const EmployeeOptions = ['My Profile', 'My Visa Status', 'My Housing']

  const handleNavigate = (text: string) => {
    switch (text) {
      case 'All Profiles':
        navigate('/hr/employees')
        break
      case 'Visa Status':
        navigate('/hr/visa')
        break
      case 'Hiring':
        navigate('/hr/hiring')
        break
      case 'Housing':
        navigate('/hr/housing')
        break
      case 'My Profile':
        navigate('/emp/info')
        break
      case 'My Visa Status':
        navigate('/emp/visa')
        break
      case 'My Housing':
        navigate('/emp/housing')
        break
      default:
        navigate('/')
        break
    }
  }

  return (
    <>
      <Drawer variant='permanent' open={open} style={{marginRight: "2rem"}}>
        <DrawerHeader>
          <IconButton>
            <ChevronLeft onClick={handleDrawerClose} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {userType ? (
          <List>
            {HrOptions.map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => handleNavigate(text)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && <People />}
                    {index === 1 && <AirplaneTicket />}
                    {index === 2 && <GroupAdd />}
                    {index === 3 && <NightShelter />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {EmployeeOptions.map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => handleNavigate(text)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && <AccountBox />}
                    {index === 1 && <AirplaneTicket />}
                    {index === 2 && <NightShelter />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
    </>
  )
}

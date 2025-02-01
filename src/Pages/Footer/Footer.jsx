import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { NavLink } from 'react-router-dom';

import style from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={style.footer}>

            <NavLink to="/" className={({ isActive }) => (isActive ? style.active : '')}>
                <CalendarMonthIcon color='primary' fontSize="large" />
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/stat"><EqualizerIcon color='primary' fontSize="large" /></NavLink>
            <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/semples"><BookmarksIcon color='primary' fontSize="large" /></NavLink>
            <NavLink className={({ isActive }) => (isActive ? style.active : '')} to="/settings"><SettingsApplicationsIcon color='primary' fontSize="large" /></NavLink>
        </div>
    )
}
export default Footer
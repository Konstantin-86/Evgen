import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import style from '../styles/Footer.module.scss'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className={style.footer}>
            <Link to="/"><CalendarMonthIcon fontSize="large" /></Link>
            <Link to="/stat"><EqualizerIcon fontSize="large" /></Link>
            <Link to="/semples"><BookmarksIcon fontSize="large" /></Link>
            <Link to="/settings"><SettingsApplicationsIcon fontSize="large" /></Link>
        </div>
    )
}
export default Footer
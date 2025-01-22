import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import style from '../styles/Footer.module.scss'

const Footer = () => {
    return (
        <div className={style.footer}>
            <CalendarMonthIcon fontSize="large" />
            <EqualizerIcon fontSize="large" />
            <BookmarksIcon fontSize="large" />
            <SettingsApplicationsIcon fontSize="large" />
        </div>
    )
}
export default Footer
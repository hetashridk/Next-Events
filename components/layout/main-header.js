import Link from 'next/link';
import classes from './main-header.module.css';

function MainHeader() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>

            {/* href='/' means as soon se we click the logo it will takes to the first page */}
                <Link href='/'>NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href='/events'>Browse All Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;
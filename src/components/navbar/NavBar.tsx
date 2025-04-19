import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import amazonLogo from '../../assets/amazon-logo.webp'
import { useEffect, useState } from 'react'
import { getUser } from '../../utils/api'
import { User } from '../../utils/types'

export default function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    async function loadUser() {
        const token = localStorage.getItem('TOKEN')
        if (token) {
            const user = await getUser(token)
            setUser(user)
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        loadUser();
    }, []);
    
    window.addEventListener('storage', () => {
        if (localStorage.getItem('TOKEN')) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    });

    function logout() {
        localStorage.removeItem('TOKEN')
        window.dispatchEvent(new Event("storage"));
        setIsLoggedIn(false)
    }

    function createNavItems() {
        if (!isLoggedIn) {
            return (            
                <Link className={styles.login} to="/login">Login</Link>
            )
        }
        else if (isLoggedIn && !user) {
            return (
                <button className={styles.logout} onClick={logout}>Logout</button>
            )
        }
        else {
            return (
                <>
                    <p className={styles.name}>{`${user!.firstName} ${user!.lastName}`}</p>
                    <button className={styles.logout} onClick={logout}>Logout</button>
                </>
            )
        }
    }

    return (
        <div className={styles.navbar}>
            <Link to="/"><img className={styles.logo} src={amazonLogo}/></Link>
            <div className={styles['nav-items-container']}>
                { createNavItems() }
            </div>
        </div>
    )
}
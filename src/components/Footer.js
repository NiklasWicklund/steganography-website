import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";

export default function Footer(props) {
    return (
        <footer className='footer'>
        <div className='row'>
            <a
            href="https://www.linkedin.com/in/niklas-wicklund-018219205/"
            target="_blank"
            rel="noopener noreferrer"
            >
            Created by Niklas Wicklund
            </a>
        </div>
        
        <ul className='socials'>
            <li>
                <a href='https://www.linkedin.com/in/niklas-wicklund-018219205/'>
                    <LinkedInIcon fontSize='large'/>
                </a>
            </li>
            <li>
                <a href='https://github.com/NiklasWicklund'>
                    <GitHubIcon fontSize='large'/>
                </a>
            </li>
            <li>
                <a href='mail:niklaswic@gmail.com'>
                    <EmailIcon fontSize='large'/>
                </a>
            </li>
        </ul>
        <div className='row'>
            <Link to='/'>Steganography</Link>
        </div>

      </footer>
    )
}
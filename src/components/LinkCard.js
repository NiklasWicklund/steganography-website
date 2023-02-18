import { Link } from "react-router-dom";

export default function LinkCard(props) {
    return (
        <Link to={props.href} className='card'>
            <h2>{props.title + ' '}&rarr;</h2>
            <p>{props.description}</p>
        </Link>
    )
}
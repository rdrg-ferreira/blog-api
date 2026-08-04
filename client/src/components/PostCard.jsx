import { Link } from "react-router";
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ id, author, createdAt, title, text, numComments }) {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <Link className="post" to={"/post/" + id}>
            <div className="data">
                <span className="author">{author}</span>
                •
                <time className="time" dateTime={createdAt}>{timeAgo}</time>
            </div>
            
            <span className="title">{title}</span>
            <span className="text">{text}</span>
            <div className="data">
                <span>💬 {numComments}</span>
            </div>
        </Link>
    );
}
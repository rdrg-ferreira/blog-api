import { Link } from "react-router";
import { formatDistanceToNow } from 'date-fns';
import "../styles/PostCard.css";
import "../styles/globalStyle.css";

export default function PostCard({ id, status, author, createdAt, title, text, numComments, handleChangeStatus }) {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    const statusClassName = status === "PUBLIC" ? "status published" : "status draft";
    const actionLabel = status === "PUBLIC" ? "Unpublish" : "Publish";

    return (
        <Link className="post" to={"/post/" + id}>
            <span className={statusClassName}>
                {status}
            </span>
            <div className="data">
                <span className="author">{author}</span>
                •
                <time className="time" dateTime={createdAt}>{timeAgo}</time>
            </div>
            
            <span className="title">{title}</span>
            <span className="text">{text}</span>
            <div className="data card-footer">
                <span>💬 {numComments}</span>
                <button className="change-status" onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleChangeStatus(id);
                }}>
                    {actionLabel}
                </button>
            </div>
        </Link>
    );
}
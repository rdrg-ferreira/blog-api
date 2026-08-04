import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { formatDistanceToNow } from 'date-fns';
import authFetch from "../lib/authFetch";

function Comment({ comment }) {
    const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

    return (
        <div className="comment">
            <div className="data">
                <span className="author">{comment.author.username}</span>
                •
                <span className="time">{timeAgo}</span>
            </div>
            <span className="text">{comment.text}</span>
        </div>
    );
}

export default function PostPage() {
    const { posts, currentUser } = useOutletContext();
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function fetchComments() {
            const response = await fetch(`/api/v1/comments/${id}`);
            const data = await response.json();
            if (!ignore) setComments(data);
        }

        fetchComments();

        return () => {
            ignore = true;
        };
    }, [id]);

    async function handleCommentSubmit(event) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        const response = await authFetch(`/api/v1/comments/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error ?? data.errors?.[0]?.msg ?? "Could not create comment");
            return;
        }

        setComments((currentComments) => [...currentComments, data]);
        event.target.querySelector("#text").value = "";
    }

    const post = posts.find(p => p.id == id);

    if (!post) {
        return (
            <main>
                <h1 className="information">Loading post...</h1>
            </main>
        );
    }

    return (
        <main>
            <span className="title">{post.title}</span>
            <span className="author">by {post.author.username}</span>
            <span className="text">{post.text}</span>
            <div id="create-comment">
                {currentUser && (
                    <form id="comment-form" onSubmit={handleCommentSubmit}>
                        <FormInput type="textarea" id="text" labelName="Comment" errorMsg={error}/>
                        <button type="submit">Submit</button>
                    </form>
                ) || (
                    <p>Login to comment</p>
                )}
            </div>
            <div className="container">
                <h2>Comments</h2>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment}></Comment>
                ))}
            </div>
        </main>
    );
}
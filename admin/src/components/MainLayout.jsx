import PostCard from "./PostCard";
import { Link, useOutletContext } from "react-router";
import { useState } from 'react';
import authFetch from "../lib/authFetch";
import "../styles/MainLayout.css";
import "../styles/globalStyle.css";

export default function MainLayout() {
    const { posts, setPosts } = useOutletContext();
    const [searchValue, setSearchValue] = useState("");

    const filteredPosts = posts.filter(p => {        
        if (searchValue !== "" && !p.title.toLowerCase().includes(searchValue)) {
            return false;
        }

        return true;
    });

    async function handleChangeStatus(id) {
        const response = await authFetch(`/api/v1/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Failed to update post ${id}:`, response.statusText);
            return;
        }

        const updatedPost = await response.json();

        const newPosts = posts.map(p => {
            if (p.id === id) {
                return updatedPost;
            }
            return p;
        });
        setPosts(newPosts);
    }

    return (
        <main>
            <div className="flex items-center" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
                <Link to="/create-post" className="button create-post-link">Create Post</Link>
                <input type="text" className="search-bar" placeholder="Search for a post" onInput={(e) => setSearchValue(e.target.value.toLowerCase())}/>
            </div>
            <div className="container">
                {filteredPosts.map(p => {
                    return (
                        <PostCard key={p.id} id={p.id} status={p.status} author={p.author.username} createdAt={p.createdAt} title={p.title} text={p.text} numComments={p._count.comments} handleChangeStatus={handleChangeStatus}></PostCard>
                    );
                })}
            </div>
        </main>
    );
}
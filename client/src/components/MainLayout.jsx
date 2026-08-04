import PostCard from "./PostCard";
import { useOutletContext } from "react-router";
import { useState } from 'react';

export default function MainLayout() {
    const { posts } = useOutletContext();
    const [searchValue, setSearchValue] = useState("");

    const filteredPosts = posts.filter(p => {
        if (p.status !== "PUBLIC") {
            return false;
        }
        
        if (searchValue !== "" && !p.title.toLowerCase().includes(searchValue)) {
            return false;
        }

        return true;
    })

    return (
        <main>
            <input type="text" className="search-bar" placeholder="Search for a post" onInput={(e) => setSearchValue(e.target.value.toLowerCase())}/>
            <div className="container">
                {filteredPosts.map(p => {
                    return (
                        <PostCard key={p.id} id={p.id} author={p.author.username} createdAt={p.createdAt} title={p.title} text={p.text} numComments={p._count.comments}></PostCard>
                    );
                })}
            </div>
        </main>
    );
}
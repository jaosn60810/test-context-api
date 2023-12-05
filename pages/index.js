import { useEffect, useState } from 'react';
import { PostsContext, usePostsContext } from '../ProductContext';

export default function Home({ posts }) {
  return (
    <PostsContext.Provider value={posts}>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <PostList />
        <br />
        <ClientSideComponent />
      </main>
    </PostsContext.Provider>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return { props: { posts: posts.slice(0, 5) } };
}

function PostList() {
  const posts = usePostsContext();

  return (
    <div className=" divide-y divide-cyan-500">
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

function ClientSideComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data.slice(0, 5));
    };

    fetchData();
  }, []);

  return (
    <div className="divide-y divide-red-500 ">
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Skeleton, Divider, Space } from "antd";
import PostCard from "../Global/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [postperpage, setPostPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  function handlePagination(pagechangedto, pageSize) {
    setPage(pagechangedto);
    setPostPerPage(pageSize);
  }
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  function ShowSkeleton(times) {
    return Array.from({ length: times }).map((_, index) => (
      <div>
        <Skeleton
          active
          avatar
          paragraph={{
            rows: 4,
          }}
        />
        <Divider />
      </div>
    ));
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const shuffledPosts = shuffleArray(data);
        setPosts(shuffledPosts);
        setLoading(false);
      })
      .catch((err) =>
        console.log("Connection cannot be made to jsonplaceholderapi...", err)
      );
  }, []);

  return !loading ? (
    <div style={{ margin: "5vw" }}>
      {" "}
      {/*  Add onChange attribute to the tag to handle the changes when user navigates to another page and `total` value will be changed accordingly*/}
      {posts.slice((page - 1) * postperpage, page * postperpage).map((obj) => {
        return (
          <>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            />
            <PostCard
              userId={obj.userId}
              title={obj.title}
              body={obj.body}
              loading={loading}
            />
          </>
        );
      })}
      <Pagination
        defaultCurrent={1}
        total={posts.length}
        responsive={true}
        onChange={handlePagination}
      />
    </div>
  ) : (
    <></>
  );
}

export default Home;

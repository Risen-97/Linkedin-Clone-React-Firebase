import FlipMove from "react-flip-move";
import { useCollection } from "react-firebase-hooks/firestore";
import Post from "../post/Post";
import SendPost from "../post/SendPost";
import { db } from "../../firebase";
import { collection, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
const Feed = () => {
  const [realtimePosts, loading, error] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  const { user } = useSelector((state) => state.auth);

  const removePostHandler = async (postInfo) => {
    if (user.email === postInfo.data().email) {
      await deleteDoc(doc(db, "posts", postInfo.id));
    }
  };

  return (
    <div className="flex-[4] ">
      <SendPost />

      {loading && (
        <h1 className="text-3xl text-center  h-full flex items-center justify-center">
          Loading...
        </h1>
      )}
      {realtimePosts?.docs.length === 0 && !loading && (
        <h1 className="text-3xl text-center  h-full flex items-center justify-center">
          Sorry There is No Posts...
        </h1>
      )}

      <FlipMove>
        {realtimePosts &&
          realtimePosts.docs.map((doc) => {
            return (
              <Post
                removePost={() => removePostHandler(doc)}
                key={doc.id}
                postInfo={doc.data()}
              />
            );
          })}
      </FlipMove>
    </div>
  );
};

export default Feed;

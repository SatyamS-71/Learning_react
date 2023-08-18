import { Modal, Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import store from "../../Store/Store.js";
import { userplusone, userminusone } from "../../Slices/UserSlice";
import { useSelector, useDispatch } from "react-redux";

function UserStats({ open, onCancel, userId }) {
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);
  const userID = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserStats(data);
        setLoading(false);
      })
      .catch((err) =>
        console.log("Connection cannot be made to jsonplaceholderapi.....")
      );
  }, []);
  function handlein() {
    dispatch(userplusone());
  }
  function handledec() {
    dispatch(userminusone());
  }

  return (
    <Modal
      title="User Stats"
      open={open}
      onCancel={onCancel}
      centered
      mask={true}
      maskClosable={true}
      okText={"Send Request"}
      okButtonProps={{ disabled: true }}
    >
      <Card title={userStats.name}>
        <Skeleton loading={loading} avatar active></Skeleton>
        {userStats.username + ""}
        {`The current user is with the id is = ${userID}`}
        <button onClick={handlein}> increase userID by 1 </button>
        <button onClick={handledec}> decrease userID by 1 </button>
      </Card>
    </Modal>
  );
}
export default UserStats;

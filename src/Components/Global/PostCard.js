import "../../../src/styles.css";
import UserStats from "./UserStats";
import { useState } from "react";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Avatar } from "antd";
const { Meta } = Card;
function PostCard({ userId, title, body, loading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function handleOnClick() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <Card
        style={{
          width: "100%",
        }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <div>
                <Avatar src="" onClick={handleOnClick} />
                <UserStats
                  open={isModalOpen}
                  onCancel={handleCancel}
                  userId={userId}
                />
              </div>
            }
            title={title}
            description={body}
          />
        </Skeleton>
      </Card>
      <br></br>
      <br></br>
    </div>
  );
}

export default PostCard;

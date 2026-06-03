import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import NotificationCard from "./NotificationCard";

const PriorityNotifications = () => {
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    loadPriority();
  }, []);

  const loadPriority = async () => {
    const data = await getNotifications(1, 5);

    const sorted = data.notifications
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5);

    setPriority(sorted);
  };

  return (
    <>
      <h2>Top Priority Notifications</h2>

      {priority.map((item) => (
        <NotificationCard key={item.id} notification={item} />
      ))}
    </>
  );
}

export default PriorityNotifications
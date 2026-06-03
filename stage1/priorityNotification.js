const PRIORITY_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getPriorityScore(notification) {
  return PRIORITY_WEIGHT[notification.Type] || 0;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGl2YXZlcm1hMzIxMS5hQGdtYWlsLmNvbSIsImV4cCI6MTc4MDQ3NjM2MSwiaWF0IjoxNzgwNDc1NDYxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2Q3ZDI3MGEtMmRkNi00OTQwLWIyZTMtYzNlNDJkYTM2MWQ1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2hpdmEgdmVybWEiLCJzdWIiOiJmZWNiMmViYy03N2I4LTRmNDgtYTM3Yi03OGM0ZTVkM2M4NGMifSwiZW1haWwiOiJzaGl2YXZlcm1hMzIxMS5hQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGl2YSB2ZXJtYSIsInJvbGxObyI6IjIzMzg1MzgiLCJhY2Nlc3NDb2RlIjoibnd3c0t4IiwiY2xpZW50SUQiOiJmZWNiMmViYy03N2I4LTRmNDgtYTM3Yi03OGM0ZTVkM2M4NGMiLCJjbGllbnRTZWNyZXQiOiJDdmNxVnp1cWptbVdIZFZYIn0.RZdp1U6u_9tq-xy6utA8EaPsNY6zs7fQncD4LhN7SME";
export async function getTopNotifications() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseData = await response.json();
    const notifications = responseData.notifications || responseData;

    const topNotifications = notifications
    .sort((a, b) => {
      const weightDiff = getPriorityScore(b) - getPriorityScore(a);
      
      if (weightDiff !== 0) return weightDiff;
      
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
    console.log(topNotifications);
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error.response?.data || error.message,
    );
  }
}

getTopNotifications();

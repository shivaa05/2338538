# Stage 1 - Priority Inbox Notification System

## Objective

The objective of this task is to identify and display the Top 10 most important unread notifications from the notification stream. The priority of a notification is determined using a combination of notification type and recency.

---

## Priority Rules

Notifications are assigned weights based on their type:

| Notification Type | Weight |
|------------------|---------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

Higher weight notifications are considered more important.

If two notifications have the same weight, the notification with the more recent timestamp is given higher priority.

---

## Approach

1. Fetch notifications from the provided Notification API.
2. Assign a priority weight to each notification based on its type.
3. Sort notifications using the following criteria:
   - Priority Weight (Descending)
   - Timestamp (Descending)
4. Select the first 10 notifications from the sorted list.
5. Display the Top 10 priority notifications.

---

## Algorithm

```javascript
Sort notifications by:
1. Weight (Placement > Result > Event)
2. Timestamp (Newest First)

Return first 10 notifications.
```

---

## Data Structures Used

- Array for storing notifications fetched from the API.
- Custom sorting function for priority calculation.

---

## Time Complexity

### Current Implementation

- Sorting Notifications: O(n log n)
- Selecting Top 10: O(10)

Overall Complexity:

```
O(n log n)
```

---

## Efficient Maintenance of Top 10 Notifications

Since new notifications may arrive continuously, maintaining the Top 10 notifications using a Min Heap (Priority Queue) is more efficient.

### Heap-Based Approach

1. Maintain a Min Heap of size 10.
2. Insert notifications into the heap.
3. If the heap size exceeds 10:
   - Remove the lowest-priority notification.
4. The heap always contains the Top 10 notifications.

### Complexity

- Insertion: O(log 10)
- Overall: O(n log 10)

Since log(10) is constant, the effective complexity is approximately:

```
O(n)
```

---

## Assumptions

- All notifications received from the API are unread.
- Notification timestamps are valid and follow a consistent format.
- Placement notifications always have higher priority than Result and Event notifications.
- No database storage is required as specified in the problem statement.

---

## Conclusion

The implemented solution successfully identifies the Top 10 priority notifications by combining notification type weight and recency. The approach is simple, scalable, and can be optimized further using a Min Heap for real-time notification streams.
##  Overview
This project demonstrates real-time communication using **WebSockets**, enabling full-duplex communication between client and server over a single TCP connection.

Unlike traditional HTTP, WebSockets allow instant data exchange without repeated requests, making them ideal for live applications like chats, notifications, and multiplayer games.

---


<img width="531" height="686" alt="image" src="https://github.com/user-attachments/assets/ba36913f-ca3d-4f14-bc6d-7ce2325c1804" />

##  Features
- Real-time bidirectional communication
- Low latency data transfer
- Persistent connection (no repeated HTTP requests)
- Scalable for multiple clients
- Lightweight and efficient

---

##  How WebSockets Work
1. Client sends a WebSocket handshake request.
2. Server accepts and upgrades the connection from HTTP → WebSocket.
3. A persistent connection is established.
4. Both client and server can send messages anytime.


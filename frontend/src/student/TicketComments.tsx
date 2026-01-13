import { useEffect, useState } from "react";

type Comment = {
  _id: string;
  role: string;
  message: string;
};

type TicketCommentsProps = {
  ticketId: string;
};

const TicketComments: React.FC<TicketCommentsProps> = ({ ticketId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`http://localhost:4000/api/tickets/${ticketId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Comment[]) => setComments(data));
  }, [ticketId, token]);

  const addComment = async () => {
    if (!message.trim() || !token) return;

    await fetch(
      `http://localhost:4000/api/tickets/${ticketId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      }
    );

    setMessage("");
    window.location.reload();
  };

  return (
    <div>
      <h5>Comments</h5>

      {comments.map((c) => (
        <div key={c._id}>
          <p>
            <b>{c.role}:</b> {c.message}
          </p>
        </div>
      ))}

      <input
        value={message}
        placeholder="Add comment"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={addComment}>Send</button>
    </div>
  );
};

export default TicketComments;

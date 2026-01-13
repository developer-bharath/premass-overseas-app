/*
  =======================================
  EMPLOYEE TICKET CARD
  =======================================
*/

type Ticket = {
  _id: string;
  title: string;
  status: string;
};

type TicketCardProps = {
  ticket: Ticket;
  onUpdate: (ticketId: string, status: string) => void;
};

export default function TicketCard({
  ticket,
  onUpdate,
}: TicketCardProps) {
  const token = localStorage.getItem("token");

  // Safely parse JWT payload
  const payload = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  const updateStatus = async (status: string) => {
    if (!token) return;

    await fetch(
      `http://localhost:4000/api/employee/tickets/${ticket._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    onUpdate(ticket._id, status);
  };

  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="font-semibold mb-2">
        {ticket.title}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Status: {ticket.status}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => updateStatus("in-progress")}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          In Progress
        </button>

        <button
          onClick={() => updateStatus("resolved")}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Resolved
        </button>
      </div>
    </div>
  );
}

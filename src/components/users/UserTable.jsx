import { Table, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu'

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="card-surface p-0 overflow-hidden">
      <Table responsive hover className="data-table mb-0">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.image}
                  alt={user.username}
                  width={32}
                  height={32}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              </td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.gender === 'female' ? 'info' : 'secondary'} className="text-capitalize">
                  {user.gender}
                </Badge>
              </td>
              <td>
                <div className="d-flex justify-content-end gap-2">
                  <Button as={Link} to={`/users/${user.id}`} size="sm" variant="outline-teal" title="View">
                    <LuEye size={14} />
                  </Button>
                  <Button size="sm" variant="outline-teal" onClick={() => onEdit(user)} title="Edit">
                    <LuPencil size={14} />
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onDelete(user)} title="Delete">
                    <LuTrash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

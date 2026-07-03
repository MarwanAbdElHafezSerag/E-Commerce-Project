import { Row, Col, Badge } from 'react-bootstrap'

export default function UserDetails({ user }) {
  return (
    <div className="card-surface p-4">
      <Row className="g-4">
        <Col md="auto">
          <img
            src={user.image}
            alt={user.username}
            width={96}
            height={96}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        </Col>
        <Col>
          <h2 style={{ fontSize: '1.4rem' }}>{user.firstName} {user.lastName}</h2>
          <div className="text-soft mb-2">@{user.username}</div>
          <Badge bg={user.gender === 'female' ? 'info' : 'secondary'} className="text-capitalize mb-3">
            {user.gender}
          </Badge>

          <Row className="g-3 mt-1">
            <Col sm={6}>
              <div className="stat-label">Email</div>
              <div>{user.email}</div>
            </Col>
            <Col sm={6}>
              <div className="stat-label">Phone</div>
              <div>{user.phone}</div>
            </Col>
            <Col sm={6}>
              <div className="stat-label">Age</div>
              <div>{user.age}</div>
            </Col>
            <Col sm={6}>
              <div className="stat-label">Birth date</div>
              <div>{user.birthDate}</div>
            </Col>
            {user.address && (
              <Col sm={12}>
                <div className="stat-label">Address</div>
                <div>
                  {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                </div>
              </Col>
            )}
            {user.company && (
              <Col sm={12}>
                <div className="stat-label">Company</div>
                <div>{user.company.name} — {user.company.title}</div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

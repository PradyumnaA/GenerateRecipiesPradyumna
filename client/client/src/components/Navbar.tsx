
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom mb-3">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <img src="/mortar.png" alt="Mortar" height="30" />
          <img src="/pan.png" alt="Pan" height="30" />
          World Food Forum
        </Navbar.Brand>
        <Nav className="ms-auto d-flex flex-row gap-3 align-items-center">
          <FaSearch />
          <FaUserCircle size={24} />
        </Nav>
      </Container>
    </Navbar>
  );
}
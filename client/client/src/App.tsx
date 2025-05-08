import React, { useState } from 'react';
import Header from './components/Navbar';
import { Container, Row, Col, Button, Form, Spinner, Image } from 'react-bootstrap';

export default function App() {
  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const recipeRes = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: input })
    });
    const recipeData = await recipeRes.json();
    setRecipe(recipeData.recipe);

    const imageRes = await fetch('http://localhost:3001/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: input.split(',')[0] })
    });
    const imageData = await imageRes.json();
    setImageUrl(imageData.imageUrl);

    setLoading(false);
  };

  return (
    <div>
      <Header />
      <Container>
        <Row className="text-center">
          <Col>
            <p className="fst-italic">
              Type your ingredients below (e.g. Bread, Avocado, Cheddar, Onions, Garlic)
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              value={input}
              placeholder="Enter ingredients..."
              onChange={(e) => setInput(e.target.value)}
              className="mb-2"
            />
          </Col>
          <Col xs="auto">
            <Button onClick={handleGenerate} variant="success">
              {loading ? <Spinner animation="border" size="sm" /> : 'Generate'}
            </Button>
          </Col>
        </Row>
        {imageUrl && (
          <Row className="mb-3 text-center">
            <Col>
              <Image src={imageUrl} fluid alt="Generated dish" className="rounded border" />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <pre className="bg-light p-3 rounded border">
              {recipe}
            </pre>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

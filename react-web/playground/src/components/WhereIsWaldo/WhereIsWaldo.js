import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

// Function to check if two elements overlap
const checkOverlap = (pos1, pos2, size = 60) => {
  return !(
    pos1.left + size < pos2.left ||
    pos1.left > pos2.left + size ||
    pos1.top + size < pos2.top ||
    pos1.top > pos2.top + size
  );
};

// List of generic item names (ensure this list has enough items for all buttons)
const itemNames = [
  'Apple', 'Banana', 'Carrot', 'Dog Toy', 'Elephant', 'Flower', 'Guitar',
  'Hat', 'Ice Cream', 'Jacket', 'Kite', 'Lamp', 'Mug', 'Notebook', 'Orange',
  'Pencil', 'Quilt', 'Robot', 'Sunglasses', 'Teddy Bear', 'Umbrella', 'Vase',
  'Watch', 'Xylophone', 'Yoyo', 'Zebra', 'Backpack', 'Candle', 'Desk', 'Earphones',
  'Fan', 'Glasses', 'Headphones', 'Ink Pen', 'Juice', 'Key', 'Laptop', 'Mouse', 'Necklace',
  'Oven Mitt', 'Pillow', 'Quilt', 'Ring', 'Shoes', 'Tablet', 'USB Cable', 'Vegetable Peeler',
  'Wallet', 'Xylophone', 'Yoga Mat', 'Zipper', 'Clock', 'Doll', 'Earrings', 'Fork', 'Gumball',
  'Harmonica', 'Ipad', 'Jigsaw', 'Keychain', 'Lighter', 'Map', 'Notebook', 'Ornament', 'Jacket', 'Kite', 'Lamp', 'Mug', 'Notebook', 'Orange',
  'Pencil', 'Quilt', 'Robot', 'Sunglasses', 'Teddy Bear', 'Umbrella', 'Vase',
  'Watch', 'Xylophone', 'Yoyo', 'Zebra', 'Backpack', 'Candle', 'Desk', 'Earphones',
  'Fan', 'Glasses', 'Headphones', 'Ink Pen', 'Juice', 'Key', 'Laptop', 'Mouse', 'Necklace',
  'Oven Mitt', 'Pillow', 'Quilt', 'Ring', 'Shoes', 'Tablet', 'USB Cable', 'Vegetable Peeler',
  'Wallet', 'Xylophone', 'Yoga Mat', 'Zipper', 'Clock', 'Doll', 'Earrings', 'Fork', 'Gumball',
  'Harmonica', 'Ipad', 'Jigsaw', 'Keychain', 'Lighter', 'Map', 'Notebook', 'Ornament'
];

function WhereIsWaldo() {
  const [buttonPositions, setButtonPositions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Generate a random position
  const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 85) + 5; // Random position between 5% and 90%
    const y = Math.floor(Math.random() * 85) + 5;
    return { top: y, left: x };
  };

  // Check if a position overlaps with existing ones
  const isOverlapping = (newPosition) => {
    return buttonPositions.some((position) =>
      checkOverlap(position, newPosition)
    );
  };

  // Generate button positions ensuring no overlap
  const generateButtonPositions = () => {
    const positions = [];
    for (let i = 0; i < 120; i++) {
      let newPosition;
      do {
        newPosition = generateRandomPosition();
      } while (isOverlapping(newPosition));
      positions.push(newPosition);
    }
    setButtonPositions(positions);
  };

  useEffect(() => {
    generateButtonPositions();
  }, []);

  // Handle the "Where's Waldo?" button click
  const handleWaldoClick = () => {
    setShowPopup(true);
  };

  // Randomly assign "Where's Waldo?" to one button
  const waldoIndex = Math.floor(Math.random() * 120);

  // Shuffle and select item names, then add "Where's Waldo?"
  const shuffledItems = [...itemNames].sort(() => 0.5 - Math.random());
  const buttonLabels = [...shuffledItems.slice(0, 119)];
  buttonLabels.splice(waldoIndex, 0, "Where's Waldo?");

  return (
    <div className="position-relative" style={{ height: '90vh', width: '98vw' }}>
      {buttonPositions.map((pos, index) => (
        <button
          key={index}
          onClick={index === waldoIndex ? handleWaldoClick : null}
          style={{
            position: 'absolute',
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            backgroundColor: getRandomColor(),
          }}
          className="btn fw-bold"
        >
          {buttonLabels[index]}
        </button>
      ))}

      {/* Celebration Popup */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Congratulations! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>You found Waldo! 🎉</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const getRandomColor = () => {
  const colors = [
    '#ADD8E6', // Light Blue
    '#F08080', // Light Coral
    '#90EE90', // Light Green
    '#FFB6C1', // Light Pink
    '#FFFFE0', // Light Yellow
    '#FAFAD2', // Light Goldenrod Yellow
    '#FFA07A', // Light Salmon
    '#87CEFA', // Light Sky Blue
    '#B0C4DE', // Light Steel Blue
    '#E6E6FA'  // Lavender
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};


export default WhereIsWaldo;

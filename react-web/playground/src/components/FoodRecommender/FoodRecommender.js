import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodRecommender.css';

const FoodRecommender = () => {
  const [cuisines, setCuisines] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [tasteProfiles, setTasteProfiles] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [selectedTasteProfiles, setSelectedTasteProfiles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/initial-data/');
        setCuisines(response.data.cuisines);
        setVegetables(response.data.vegetables);
        setTasteProfiles(response.data.taste_profiles);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSelection = (category, item) => {
    if (category === 'cuisines') {
      setSelectedCuisines(prevItems =>
        prevItems.includes(item.id) ? prevItems.filter(id => id !== item.id) : [...prevItems, item.id]
      );
    } else if (category === 'vegetables') {
      setSelectedVegetables(prevItems =>
        prevItems.includes(item.id) ? prevItems.filter(id => id !== item.id) : [...prevItems, item.id]
      );
    } else if (category === 'tasteProfiles') {
      setSelectedTasteProfiles(prevItems =>
        prevItems.includes(item.id) ? prevItems.filter(id => id !== item.id) : [...prevItems, item.id]
      );
    }
  };

  const handleRecommendation = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/recommendation/', {
        cuisines: selectedCuisines,
        vegetables: selectedVegetables,
        taste_profiles: selectedTasteProfiles,
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="food-recommender">
      <h2>Select Your Preferences</h2>
      <div className="selection-container">
        <div className="selection-list">
          <h3>Cuisines</h3>
          {cuisines.map(item => (
            <button
              key={item.id}
              className={`selection-item ${selectedCuisines.includes(item.id) ? 'selected' : ''}`}
              onClick={() => handleSelection('cuisines', item)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="selection-list">
          <h3>Vegetables</h3>
          {vegetables.map(item => (
            <button
              key={item.id}
              className={`selection-item ${selectedVegetables.includes(item.id) ? 'selected' : ''}`}
              onClick={() => handleSelection('vegetables', item)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="selection-list">
          <h3>Taste Profiles</h3>
          {tasteProfiles.map(item => (
            <button
              key={item.id}
              className={`selection-item ${selectedTasteProfiles.includes(item.id) ? 'selected' : ''}`}
              onClick={() => handleSelection('tasteProfiles', item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleRecommendation} className="recommendation-button">Get Recommendation</button>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Recommended Dishes</h2>
          <ul>
            {recommendations.map(dish => (
              <li key={dish.id}>{dish.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FoodRecommender;

import { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch gallery items from the backend
    const fetchGallery = async () => {
      try {
        // In a real scenario, this would be your API endpoint
        // const response = await fetch("http://localhost:5000/api/gallery/public");
        // const data = await response.json();
        
        // For demonstration (until db is migrated and populated), we'll use placeholder data
        const dummyData = [
          { id: 1, title: "League Kickoff", image_url: "https://images.unsplash.com/photo-1574629810360-7efbb1925828?auto=format&fit=crop&q=80&w=1000", description: "The opening ceremony of the UMPL." },
          { id: 2, title: "Team Strategy", image_url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1000", description: "Coaches discussing strategy." },
          { id: 3, title: "Championship Trophy", image_url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000", description: "The ultimate prize." },
          { id: 4, title: "Stadium View", image_url: "https://images.unsplash.com/photo-1518605368461-1ee7c5320c23?auto=format&fit=crop&q=80&w=1000", description: "A packed stadium." },
          { id: 5, title: "Player Action", image_url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1000", description: "In the heat of the game." },
          { id: 6, title: "Celebration", image_url: "https://images.unsplash.com/photo-1530549387720-410a5146c6eb?auto=format&fit=crop&q=80&w=1000", description: "Celebrating a victory." }
        ];

        setImages(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Our Gallery</h1>
        <p>Explore the moments that define UMPL.</p>
      </div>

      {loading ? (
        <div className="gallery-loading">Loading...</div>
      ) : (
        <div className="gallery-grid">
          {images.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => openModal(item)}
            >
              <img src={item.image_url} alt={item.title} />
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeModal}>&times;</button>
            <img src={selectedImage.image_url} alt={selectedImage.title} />
            <div className="gallery-modal-info">
              <h2>{selectedImage.title}</h2>
              {selectedImage.description && <p>{selectedImage.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

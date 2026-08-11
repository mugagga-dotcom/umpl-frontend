import { useState, useEffect } from "react";
import "./Gallery.css";
import galleryService from "../../Services/galleryService";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const galleryItems = await galleryService.getGalleryItems();
        
        // If no items from API, use default executive photos
        if (!galleryItems || galleryItems.length === 0) {
          const defaultData = [
            { 
              id: 1, 
              title: "Chairman - Mbabaali Maliseeri", 
              image_url: "/chairman.jpeg", 
              description: "Chairperson of Uganda Media Presenters League, committed to fostering professionalism and unity." 
            },
            { 
              id: 2, 
              title: "Vice Chairman - Ndawula Peter Simon", 
              image_url: "/vice chairman.jpeg", 
              description: "Vice Chairman promoting professionalism and capacity building in media industry." 
            },
            { 
              id: 3, 
              title: "Secretary - Nabukenya Lilian", 
              image_url: "/Secretary.jpeg", 
              description: "Secretary maintaining effective communication and organizational efficiency." 
            },
            { 
              id: 4, 
              title: "Treasurer - Nalugwa Connie", 
              image_url: "/treasurer.jpeg", 
              description: "Treasurer managing financial resources with transparency and accountability." 
            },
            { 
              id: 5, 
              title: "Publicity - Ssegawa Ismael Sureman", 
              image_url: "/publicity.jpeg", 
              description: "Publicity officer promoting UMPL activities and ensuring clear communication." 
            },
            { 
              id: 6, 
              title: "UMPL Logo", 
              image_url: "/logo.jpeg", 
              description: "Official logo of Uganda Media Presenters League representing unity and professionalism." 
            }
          ];
          setImages(defaultData);
        } else {
          setImages(galleryItems);
        }
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError("Failed to load gallery images");
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
        <p>Meet our leadership and discover the faces behind UMPL's vision.</p>
      </div>

      {loading ? (
        <div className="gallery-loading">Loading gallery...</div>
      ) : error ? (
        <div className="gallery-error">{error}</div>
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

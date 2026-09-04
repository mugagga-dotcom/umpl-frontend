import { useState, useEffect } from "react";
import "./Gallery.css";
import galleryService from "../../Services/galleryService";
import { resolveMediaUrl } from "../../Services/uploadService";



const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        // Fetch gallery items
        let finalItems = [];
        try {
          const gItems = await galleryService.getGalleryItems();
          if (gItems && gItems.length > 0) {
            finalItems = [...gItems];
          }
        } catch (e) {
          console.error("Failed to fetch gallery:", e);
        }

        // Fetch team members and merge them
        try {
          const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
          const res = await fetch(`${API_URL}/team`);
          if (res.ok) {
            const data = await res.json();
            const teamList = data.team_members || data;
            if (teamList && teamList.length > 0) {
              const teamAsGallery = teamList.map(member => ({
                id: `team-${member.id}`,
                title: member.full_name,
                subtitle: member.position,
                image_url: member.photo_url,
                description: member.bio
              }));
              
              // Filter out duplicates (if user added same person to both Team and Gallery)
              const uniqueTeamMembers = teamAsGallery.filter(
                teamMember => !finalItems.some(
                  galleryItem => galleryItem.title && galleryItem.title.toLowerCase().trim() === teamMember.title.toLowerCase().trim()
                )
              );
              
              finalItems = [...finalItems, ...uniqueTeamMembers];
            }
          }
        } catch (e) {
          console.error("Failed to fetch team for gallery:", e);
        }

        if (finalItems.length === 0) {
          setImages([]);
        } else {
          setImages(finalItems);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
  };

  const goNext = (e) => {
    e.stopPropagation();
    const next = (selectedIndex + 1) % images.length;
    setSelectedImage(images[next]);
    setSelectedIndex(next);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    const prev = (selectedIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prev]);
    setSelectedIndex(prev);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight" && selectedImage) goNext(e);
      if (e.key === "ArrowLeft" && selectedImage) goPrev(e);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, selectedIndex, images]);

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <h1>Our Gallery</h1>
        <p>
          Meet our leadership and discover the faces behind UMPL's vision.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="gallery-loading">
          <div className="spinner"></div>
          <p>Loading gallery…</p>
        </div>
      ) : error ? (
        <div className="gallery-error">
          <i className="fi fi-rr-exclamation"></i>
          <p>{error}</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((item, index) => {
            let displayTitle = item.title;
            let displaySubtitle = item.subtitle;

            // Handle API data where title contains "Position - Name"
            if (item.title && item.title.includes(" - ")) {
              const parts = item.title.split(" - ");
              displaySubtitle = parts[0];
              displayTitle = parts[1];
            }

            return (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => openModal(item, index)}
              >
                <img src={resolveMediaUrl(item.image_url)} alt={displayTitle} loading="lazy" />
                <div className="gallery-info">
                  <h3>{displayTitle}</h3>
                  {displaySubtitle && <h4>{displaySubtitle}</h4>}
                  {item.description && <h4 style={{ color: '#4b5563', fontSize: '0.85rem' }}>{item.description}</h4>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <button className="gallery-modal-close" onClick={closeModal}>
            <i className="fi fi-rr-cross"></i>
          </button>

          {/* Prev button */}
          <button
            className="gallery-nav gallery-nav-prev"
            onClick={goPrev}
          >
            <i className="fi fi-rr-angle-left"></i>
          </button>

          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={resolveMediaUrl(selectedImage.image_url)} alt={selectedImage.title} />
            <div className="gallery-modal-info">
              <h2>{selectedImage.title}</h2>
              {selectedImage.subtitle && (
                <span className="modal-subtitle">{selectedImage.subtitle}</span>
              )}
              {selectedImage.description && (
                <p>{selectedImage.description}</p>
              )}
            </div>
          </div>

          {/* Next button */}
          <button
            className="gallery-nav gallery-nav-next"
            onClick={goNext}
          >
            <i className="fi fi-rr-angle-right"></i>
          </button>

          {/* Counter */}
          <div className="gallery-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

import { useState, useEffect } from "react";
import "./Gallery.css";
import galleryService from "../../Services/galleryService";

// Default executive photos shown when API has no items
const defaultGalleryItems = [
  {
    id: 1,
    title: "Mbabaali Maliseeri",
    subtitle: "Chairperson",
    image_url: "/chairman.jpeg",
    description:
      "Committed to fostering a culture of professionalism, unity, and excellence among media presenters in Uganda.",
  },
  {
    id: 2,
    title: "Ndawula Peter Simon",
    subtitle: "Vice Chairman",
    image_url: "/vice chairman.jpeg",
    description:
      "Supporting the Chairperson in promoting professionalism and ethical conduct, creating opportunities for capacity building.",
  },
  {
    id: 3,
    title: "Nabukenya Lilian",
    subtitle: "Secretary",
    image_url: "/Secretary.jpeg",
    description:
      "Maintaining effective communication and organization within the association to keep members informed and engaged.",
  },
  {
    id: 4,
    title: "Nalugwa Connie",
    subtitle: "Treasurer",
    image_url: "/treasurer.jpeg",
    description:
      "Managing the association's financial resources with transparency and accountability.",
  },
  {
    id: 5,
    title: "Ssegawa Ismael Sureman",
    subtitle: "Publicity Officer",
    image_url: "/publicity.jpeg",
    description:
      "Promoting the association and its activities to the public and media community.",
  },
  {
    id: 6,
    title: "UMPL",
    subtitle: "Uganda Media Presenters League",
    image_url: "/logo.jpeg",
    description:
      "Official logo of the Uganda Media Presenters League — representing unity, professionalism and excellence.",
  },
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const galleryItems = await galleryService.getGalleryItems();

        if (!galleryItems || galleryItems.length === 0) {
          setImages(defaultGalleryItems);
        } else {
          setImages(galleryItems);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        // On error still show default photos
        setImages(defaultGalleryItems);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
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
                <img src={item.image_url} alt={displayTitle} loading="lazy" />
                <div className="gallery-info">
                  <h3 style={{ textTransform: 'uppercase' }}>{displayTitle}</h3>
                  {displaySubtitle && <h4>{displaySubtitle}</h4>}
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
            <img src={selectedImage.image_url} alt={selectedImage.title} />
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

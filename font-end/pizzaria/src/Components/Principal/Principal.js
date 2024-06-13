import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Principal.css";

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {})
        .catch((error) => {
          console.error("Erro ao iniciar a reprodução automática:", error);
        });
    }
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} className="fullscreen-video" loop>
        <source
          src={process.env.PUBLIC_URL + "/Util/Pizza.mp4"}
          type="video/mp4"
        />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
};

const TextOverlay = ({ activeLink, handleSetActive }) => {
  return (
    <div className="text-overlay">
      <p className="welcome">Welcome</p>
      <h2>Bem-vindo à nossa pizzaria!</h2>
      <p>Não perca essa chance de ter um belo jantar! Realize seu carrinho abaixo</p>
      <Link
        to="/montar-pizza"
        className={`montar-pizza-button ${activeLink === "montar-pizza" ? "active" : ""}`}
        onClick={() => handleSetActive("montar-pizza")}
      >
        Fazer pedido
      </Link>
    </div>
  );
};

const Principal = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <VideoBackground />
      <TextOverlay activeLink={activeLink} handleSetActive={handleSetActive} />
    </>
  );
};

export default Principal;

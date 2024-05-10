import React, { useRef, useEffect } from "react";
import "./Principal.css";

const Principal = () => {
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
      <div className="text-overlay">
        <p className="welcome">Welcome</p>
        <h2>Bem-vindo à nossa pizzaria!</h2>
        <p>
          Não perca essa chance de ter um belo jantar! Realize seu pedido abaixo
        </p>
      </div>
    </div>
  );
};

export default Principal;

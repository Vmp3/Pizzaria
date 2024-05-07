import React from 'react';
import "./Sobre.css";

const Sobre = () => {
    const imageUrl = '/Util/SobreImage.webp'; // URL da imagem

    return (
        <div className="about-container">
            <div className="image-container">
                <img src={imageUrl} alt="Water" className="water-image" />
            </div>
            <div className="text-container">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut neque ac odio tincidunt vestibulum. Nam faucibus justo a orci faucibus consectetur. Quisque eget justo at dui scelerisque porta a nec arcu. Duis sit amet lorem nec lectus vehicula venenatis vel id tortor. Nullam in ex vitae odio fermentum interdum. Ut auctor ipsum a nisi finibus, in eleifend nisl aliquam. Vestibulum laoreet ligula quis nisi suscipit, nec fermentum quam vehicula. Phasellus vel tempor elit. Cras ac magna id ligula facilisis tincidunt vel in ligula.
                </p>
            </div>
        </div>
    );
}

export default Sobre;

import React, { useRef } from 'react';

const ImageAnimated = ({ imageUrl }) => {
    const imageRef = useRef(null);
    let animateModeOn = useRef(false);
    let animationTimer = useRef(null);

    const handleMouseEnter = () => {

        clearTimeout(animationTimer.current);

        if (!animateModeOn.current)
        {
            animateModeOn.current = true;
        }
    };

    const handleMouseMove = (e) => {
        if (animateModeOn.current)
        {
            const { clientX, clientY } = e;

            const x = (clientX - (window.innerWidth / 2)) / (window.innerWidth / 2);
            const y = (clientY - (window.innerHeight / 2)) / (window.innerHeight / 2);

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const distance = Math.sqrt((clientX - centerX)**2 + (clientY - centerY)**2);

            const maxDistance = Math.sqrt(centerX**2 + centerY**2);

            const normalizedDistance = distance / maxDistance;

            const perspectiveValue = 1000 - normalizedDistance * 500; // уменьшается от 1000px до 500px

            imageRef.current.style.transform = `perspective(${perspectiveValue}px) rotateY(${-x * 20}deg) rotateX(${-y * 20}deg)`;
        }
    };

    const handleMouseLeave = () => {

        clearTimeout(animationTimer.current);

        animationTimer.current = setTimeout
        (
            function ()
            {
                imageRef.current.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg)';

                animateModeOn.current = false;
            },
            3000
        )
    };

    return (
        <div
            className={"wrapperImage"}
            onMouseMove={handleMouseMove}
        >
            <img
                src={imageUrl}
                alt="centralImage"
                ref={imageRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
};

export default ImageAnimated;
import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const mouseOver = (e) => {
            if (e.target.closest('button, a, input, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', mouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', mouseOver);
        };
    }, []);

    return (
        <div 
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
            style={{ 
                left: `${position.x}px`, 
                top: `${position.y}px` 
            }}
        >
            {isHovering && <span className="cursor-text">VIEW</span>}
        </div>
    );
};

export default CustomCursor;

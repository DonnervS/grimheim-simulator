import React, { useState, ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div<{ 
  $visible: boolean; 
  $position: 'top' | 'bottom';
  $xOffset: number;
}>`
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  position: absolute;
  z-index: 1000;
  ${props => props.$position === 'top' ? 'bottom: 135%;' : 'top: 135%;'}
  left: 50%;
  transform: translateX(calc(-50% + ${props => props.$xOffset}px));
  background: var(--card);
  color: var(--primary-light);
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  padding: var(--space-3) var(--space-4);
  border-radius: 2px;
  border: 1px solid var(--primary-red);
  width: max-content;
  max-width: 350px;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
  text-align: left;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  &::after {
    content: "";
    position: absolute;
    ${props => props.$position === 'top' ? 'top: 100%;' : 'bottom: 100%;'}
    left: calc(50% - ${props => props.$xOffset}px);
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.$position === 'top' 
      ? 'var(--primary-red) transparent transparent transparent' 
      : 'transparent transparent var(--primary-red) transparent'};
  }
`;

interface TooltipProps {
  text: string;
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'auto';
}

const Tooltip: React.FC<TooltipProps> = ({ 
  text, 
  children, 
  className,
  position = 'auto'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const [xOffset, setXOffset] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Vertikale Positionierung
      if (position !== 'auto') {
        setTooltipPosition(position);
      } else {
        // Berechnen, wie viel Platz oberhalb und unterhalb des Elements ist
        const spaceAbove = containerRect.top;
        const spaceBelow = viewportHeight - containerRect.bottom;
        
        if (spaceAbove < tooltipRect.height + 30) {
          setTooltipPosition('bottom');
        } else if (spaceBelow < tooltipRect.height + 30) {
          setTooltipPosition('top');
        } else {
          setTooltipPosition('top');
        }
      }
      
      // Horizontale Positionierung - Verhindern, dass der Tooltip über den Rand hinausragt
      const tooltipLeft = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2);
      const tooltipRight = tooltipLeft + tooltipRect.width;
      
      let offsetX = 0;
      
      // Wenn der Tooltip links abgeschnitten wäre
      if (tooltipLeft < 20) {
        offsetX = 20 - tooltipLeft;
      }
      // Wenn der Tooltip rechts abgeschnitten wäre
      else if (tooltipRight > viewportWidth - 20) {
        offsetX = viewportWidth - 20 - tooltipRight;
      }
      
      setXOffset(offsetX);
    }
  }, [isVisible, position]);

  return (
    <TooltipContainer 
      className={className}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchStart={() => setIsVisible(true)}
      onTouchEnd={() => setIsVisible(false)}
      ref={containerRef}
    >
      {children}
      <TooltipText 
        $visible={isVisible} 
        $position={tooltipPosition}
        $xOffset={xOffset}
        ref={tooltipRef}
      >
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip; 
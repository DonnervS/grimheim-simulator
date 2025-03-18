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
  background: rgba(26, 26, 46, 0.95);
  color: #e6e6fa;
  font-size: 0.85em;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #4a4a8a;
  width: max-content;
  max-width: 350px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  text-align: left;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  
  &::after {
    content: "";
    position: absolute;
    ${props => props.$position === 'top' ? 'top: 100%;' : 'bottom: 100%;'}
    left: calc(50% - ${props => props.$xOffset}px);
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.$position === 'top' 
      ? '#4a4a8a transparent transparent transparent' 
      : 'transparent transparent #4a4a8a transparent'};
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
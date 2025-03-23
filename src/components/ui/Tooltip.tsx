import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
  position?: TooltipPosition;
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  max-width: 100%;
`;

const TooltipTrigger = styled.div`
  display: inline-flex;
`;

const TooltipContent = styled.div<{
  position: TooltipPosition;
  isVisible: boolean;
  finalPosition: TooltipPosition;
}>`
  position: absolute;
  z-index: 50;
  ${({ position, finalPosition }) => {
    switch (finalPosition) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        `;
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
        `;
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 0.5rem;
        `;
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        `;
      default:
        return '';
    }
  }}
  
  background: var(--card);
  color: var(--primary-light);
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 2px;
  border: 1px solid var(--primary-red);
  width: max-content;
  max-width: 20rem;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
  
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  
  &::before {
    content: '';
    position: absolute;
    ${({ finalPosition }) => {
      switch (finalPosition) {
        case 'top':
          return `
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid var(--primary-red);
          `;
        case 'bottom':
          return `
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid var(--primary-red);
          `;
        case 'left':
          return `
            right: -5px;
            top: 50%;
            transform: translateY(-50%);
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 5px solid var(--primary-red);
          `;
        case 'right':
          return `
            left: -5px;
            top: 50%;
            transform: translateY(-50%);
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 5px solid var(--primary-red);
          `;
        default:
          return '';
      }
    }}
  }
`;

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  className = '',
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [finalPosition, setFinalPosition] = useState<TooltipPosition>(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && contentRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      
      let newPosition: TooltipPosition = position;
      
      // Check if tooltip is overflowing viewport and adjust position if needed
      if (position === 'top' && contentRect.top < 0) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && contentRect.bottom > window.innerHeight) {
        newPosition = 'top';
      } else if (position === 'left' && contentRect.left < 0) {
        newPosition = 'right';
      } else if (position === 'right' && contentRect.right > window.innerWidth) {
        newPosition = 'left';
      }
      
      setFinalPosition(newPosition);
    }
  }, [isVisible, position]);

  return (
    <TooltipWrapper
      className={className}
      ref={tooltipRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        ref={contentRef}
        position={position}
        finalPosition={finalPosition}
        isVisible={isVisible}
      >
        {text}
      </TooltipContent>
    </TooltipWrapper>
  );
};

export default Tooltip; 
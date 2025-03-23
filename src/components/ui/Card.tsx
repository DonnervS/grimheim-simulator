import React from 'react';
import styled, { css } from 'styled-components';

// Gemeinsame Stile für alle Card-Varianten
const baseCardStyles = css`
  background: var(--card);
  border: 1px solid var(--primary-red);
  border-radius: 2px;
  padding: 1.25rem;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
  transition: all 0.3s ease;
  color: var(--primary-light);
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    box-shadow: 0 0 25px rgba(220, 38, 38, 0.2);
  }
`;

// Styled Components für Card und seine Unterkomponenten
const CardStyled = styled.div<{ $variant?: 'default' | 'elevated' | 'interactive' | 'gold' }>`
  ${baseCardStyles}
  
  ${props => props.$variant === 'elevated' && css`
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    
    &:hover {
      box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -6px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${props => props.$variant === 'interactive' && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.$variant === 'gold' && css`
    border-color: var(--gold-accent);
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
    
    &:hover {
      box-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
    }
  `}
`;

const CardHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const CardTitleStyled = styled.h3`
  font-family: 'IM Fell English', serif;
  color: var(--primary-red);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: normal;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
`;

const CardDescriptionStyled = styled.p`
  color: var(--primary-light);
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const CardContentStyled = styled.div`
  flex: 1;
`;

const CardFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(220, 38, 38, 0.1);
`;

// Props Typdefinitionen
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'gold';
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Card-Komponente, die dem Grimheim-Style-Guide entspricht
 */
export const Card = ({
  variant = 'default',
  children,
  ...props
}: CardProps) => {
  return (
    <CardStyled $variant={variant} {...props}>
      {children}
    </CardStyled>
  );
};

export const CardHeader = ({ children, ...props }: CardHeaderProps) => {
  return <CardHeaderStyled {...props}>{children}</CardHeaderStyled>;
};

export const CardTitle = ({ children, ...props }: CardTitleProps) => {
  return <CardTitleStyled {...props}>{children}</CardTitleStyled>;
};

export const CardDescription = ({ children, ...props }: CardDescriptionProps) => {
  return <CardDescriptionStyled {...props}>{children}</CardDescriptionStyled>;
};

export const CardContent = ({ children, ...props }: CardContentProps) => {
  return <CardContentStyled {...props}>{children}</CardContentStyled>;
};

export const CardFooter = ({ children, ...props }: CardFooterProps) => {
  return <CardFooterStyled {...props}>{children}</CardFooterStyled>;
};

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
}); 
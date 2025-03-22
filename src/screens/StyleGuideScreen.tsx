import React from 'react';
import styled from 'styled-components';

const StyleGuideContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  overflow-y: auto;
  height: calc(100vh - 100px);
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ColorBox = styled.div<{ $bgColor: string }>`
  background-color: var(${props => props.$bgColor});
  height: 100px;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
`;

const ColorName = styled.span`
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const ColorValue = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  opacity: 0.8;
`;

const ComponentPreview = styled.div`
  background: var(--secondary-bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const CodeBlock = styled.pre`
  background: var(--primary-bg);
  border-radius: 4px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  margin: 10px 0;
`;

export const StyleGuideScreen: React.FC = () => {
  return (
    <StyleGuideContainer>
      <Section>
        <Title>Colors</Title>
        <ColorGrid>
          <ColorBox $bgColor="--primary-bg">
            <ColorName>Primary Background</ColorName>
            <ColorValue>var(--primary-bg)</ColorValue>
          </ColorBox>
          <ColorBox $bgColor="--secondary-bg">
            <ColorName>Secondary Background</ColorName>
            <ColorValue>var(--secondary-bg)</ColorValue>
          </ColorBox>
          <ColorBox $bgColor="--accent-color">
            <ColorName>Accent Color</ColorName>
            <ColorValue>var(--accent-color)</ColorValue>
          </ColorBox>
          <ColorBox $bgColor="--text-primary">
            <ColorName>Primary Text</ColorName>
            <ColorValue>var(--text-primary)</ColorValue>
          </ColorBox>
          <ColorBox $bgColor="--text-secondary">
            <ColorName>Secondary Text</ColorName>
            <ColorValue>var(--text-secondary)</ColorValue>
          </ColorBox>
        </ColorGrid>
      </Section>

      <Section>
        <Title>Typography</Title>
        <ComponentPreview>
          <div style={{ fontFamily: 'var(--primary-font)', marginBottom: '20px' }}>
            <div style={{ fontSize: 'var(--text-2xl)' }}>Primary Font (2XL)</div>
            <div style={{ fontSize: 'var(--text-xl)' }}>Primary Font (XL)</div>
            <div style={{ fontSize: 'var(--text-lg)' }}>Primary Font (LG)</div>
            <div style={{ fontSize: 'var(--text-base)' }}>Primary Font (Base)</div>
          </div>
          <div style={{ fontFamily: 'var(--secondary-font)' }}>
            <div style={{ fontSize: 'var(--text-2xl)' }}>Secondary Font (2XL)</div>
            <div style={{ fontSize: 'var(--text-xl)' }}>Secondary Font (XL)</div>
            <div style={{ fontSize: 'var(--text-lg)' }}>Secondary Font (LG)</div>
            <div style={{ fontSize: 'var(--text-base)' }}>Secondary Font (Base)</div>
          </div>
        </ComponentPreview>
      </Section>

      <Section>
        <Title>Components</Title>
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button className="button">Primary Button</button>
            <button className="button" disabled>Disabled Button</button>
          </div>
          <div className="card" style={{ maxWidth: '300px' }}>
            <h3>Sample Card</h3>
            <p>This is an example of a card component with some content.</p>
          </div>
        </ComponentPreview>
      </Section>

      <Section>
        <Title>Combat Elements</Title>
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="dice hit">6</div>
            <div className="dice crit">5</div>
            <div className="dice save">4</div>
            <div className="dice block">3</div>
          </div>
        </ComponentPreview>
      </Section>
    </StyleGuideContainer>
  );
};

export default StyleGuideScreen; 
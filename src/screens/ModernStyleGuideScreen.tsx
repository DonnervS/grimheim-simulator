import React, { useState } from "react";
import styled from "styled-components";

// Icons as SVG components
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  background: ${props => props.theme.dark ? "#0f0f0f" : "#fafafa"};
  color: ${props => props.theme.dark ? "#fafafa" : "#0f0f0f"};
`;

const Header = styled.header`
  margin-bottom: 2.5rem;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-family: "IMFell", serif;
  font-size: 2.5rem;
  color: #dc2626;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Switch = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 3rem;
  height: 1.5rem;
  background: ${props => props.$checked ? "#dc2626" : "#374151"};
  border-radius: 9999px;
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: white;
    border-radius: 50%;
    transform: translateX(${props => props.$checked ? "1.5rem" : "0"});
    transition: transform 0.2s;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.dark ? "#9ca3af" : "#4b5563"};
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? "#dc2626" : "transparent"};
  color: ${props => props.active ? "white" : props.theme.dark ? "#9ca3af" : "#4b5563"};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? "#dc2626" : props.theme.dark ? "#374151" : "#e5e7eb"};
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ColorCard = styled.div`
  padding: 1.5rem;
  background: ${props => props.theme.dark ? "#1c1c1c" : "#ffffff"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 100%;
  height: 100px;
  background: ${props => props.color};
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const ColorInfo = styled.div`
  h3 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.dark ? "#9ca3af" : "#4b5563"};
    font-family: monospace;
  }
`;

export const ModernStyleGuideScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("colors");

  const theme = {
    dark: isDarkMode
  };

  const tabs = [
    "colors",
    "typography",
    "components",
    "status",
    "dice",
    "layout",
    "icons",
    "effects",
    "content"
  ];

  const colors = [
    { name: "Primary (Red)", value: "#dc2626" },
    { name: "Background (Dark)", value: "#0f0f0f" },
    { name: "Foreground (Light)", value: "#fafafa" },
    { name: "Secondary", value: "#27272a" },
    { name: "Accent", value: "#18181b" },
    { name: "Muted", value: "#171717" }
  ];

  return (
    <Container theme={theme}>
      <Header>
        <HeaderTop>
          <Title>Grimheim</Title>
          <ThemeToggle>
            <IconWrapper>🌞</IconWrapper>
            <Switch $checked={isDarkMode} onClick={() => setIsDarkMode(!isDarkMode)} />
            <IconWrapper>🌙</IconWrapper>
          </ThemeToggle>
        </HeaderTop>
        <Subtitle>Modern Style Guide & Design System</Subtitle>
      </Header>

      <TabList>
        {tabs.map(tab => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            theme={theme}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tab>
        ))}
      </TabList>

      {activeTab === "colors" && (
        <Section>
          <ColorGrid>
            {colors.map(color => (
              <ColorCard key={color.name} theme={theme}>
                <ColorSwatch color={color.value} />
                <ColorInfo theme={theme}>
                  <h3>{color.name}</h3>
                  <p>{color.value}</p>
                </ColorInfo>
              </ColorCard>
            ))}
          </ColorGrid>
        </Section>
      )}

      {/* Additional tab content will be added here */}
    </Container>
  );
};

export default ModernStyleGuideScreen; 
import React from 'react';
import styled from 'styled-components';

const LogContainer = styled.div`
  background: rgba(26, 26, 46, 0.9);
  border-radius: 8px;
  border: 2px solid #4a4a8a;
  padding: 20px;
  height: 200px;
  overflow-y: auto;
  color: #e6e6fa;
  font-family: 'Courier New', monospace;
`;

const LogEntry = styled.div`
  margin-bottom: 5px;
  line-height: 1.4;
  &:last-child {
    margin-bottom: 0;
  }
`;

interface CombatLogProps {
  messages: string[];
}

const CombatLog: React.FC<CombatLogProps> = ({ messages }) => {
  return (
    <LogContainer>
      {messages.map((message, index) => (
        <LogEntry key={index}>{message}</LogEntry>
      ))}
    </LogContainer>
  );
};

export default CombatLog;
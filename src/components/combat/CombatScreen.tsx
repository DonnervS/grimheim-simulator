import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Model, WeaponStats } from '../../types/gameTypes'
import ModelCard from './ModelCard'
import DiceDisplay, { DieResult } from './DiceDisplay'
import ActionButtons from './ActionButtons'
import CombatLog from './CombatLog'

const CombatContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a4a 100%);
  display: grid;
  grid-template-rows: auto 200px;
  gap: 10px;
  padding: 20px;
  position: relative;
  overflow: hidden;
`

// ... rest of the file ...
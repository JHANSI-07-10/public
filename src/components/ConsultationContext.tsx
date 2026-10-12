'use client';

import React, { createContext, useContext } from 'react';
import { Service } from '../data/content';

export interface ConsultationApi {
  openConsultation: (service?: Service) => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationApi>({
  openConsultation: () => {},
  closeConsultation: () => {},
});

export const useConsultation = () => useContext(ConsultationContext);
export const ConsultationProvider = ConsultationContext.Provider;

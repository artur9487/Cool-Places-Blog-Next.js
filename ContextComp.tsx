/** @format */

import { createContext } from 'react';
import { context_schema } from './components/globalComponents/globalTypes';

export const Context = createContext<context_schema | null>(null);

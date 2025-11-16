/*
 * PandaOS
 * Copyright (C) 2025  Cyberpandino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

import { createRoot } from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/free-mode';
import './App.scss'

import App from './App';



window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

if (window.navigator.userAgent.toLowerCase().includes('electron') || 
    (window as any).process?.versions?.electron) {
  document.body.classList.add('electron-app');
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <SkeletonTheme baseColor="#E7E9F3" highlightColor="#fff">
      <App />
    </SkeletonTheme>
  );
}

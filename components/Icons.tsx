
import React from 'react';

type IconProps = {
  className?: string;
  size?: number;
  fill?: string;
  stroke?: string;
};

// --- Planets ---

export const IconSun = ({ className, size = 24, fill = "currentColor", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="2" />
    <circle cx="12" cy="12" r="1.5" fill={fill} />
  </svg>
);

export const IconMoon = ({ className, size = 24, fill = "currentColor", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C10.5 3 9.1 3.4 8 4.1C9.5 5.2 10.5 7 10.5 9C10.5 12.3 7.8 15 4.5 15C4.2 15 3.9 15 3.6 14.9C4.8 17.4 7.3 19.5 10.5 20.2C15.5 21.3 20.3 18 21.4 13C22.5 8 19.2 3.2 14.2 2.1C13.5 2 12.7 1.9 12 1.9V3Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconMercury = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="10" r="4" stroke={stroke} strokeWidth="2"/>
    <path d="M12 14V22M8 18H16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconVenus = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="6" stroke={stroke} strokeWidth="2"/>
    <path d="M12 15V23M8 19H16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconMars = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="14" r="6" stroke={stroke} strokeWidth="2"/>
    <path d="M15 9L21 3M21 3V8M21 3H16" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconJupiter = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L12 17M12 17V3M12 17C14.5 17 18 16 18 11C18 7.5 16 6.5 15 6.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 11H14" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconSaturn = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2V15C11 17.5 12.5 18 13.5 18C15.5 18 16.5 15.5 16.5 15.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 6H15" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 19C5 19 8 21 12 21" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconUranus = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="15" r="4" stroke={stroke} strokeWidth="2"/>
    <circle cx="12" cy="15" r="1" fill={stroke} />
    <path d="M12 11V4" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 8H16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 4L10 6M12 4L14 6" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconNeptune = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10C4 10 5 14 8 14C11 14 12 10 12 10" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 10C20 10 19 14 16 14C13 14 12 10 12 10" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 3V21" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 21H15" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 8L3 10M19 8L21 10" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconPluto = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="3" stroke={stroke} strokeWidth="2"/>
    <path d="M12 9V21" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 12C8 12 8 16 12 16C16 16 16 12 16 12" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 19H16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconLilith = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9C10 9 8.5 10.5 8.5 12.5C8.5 14.5 10 16 12 16C14 16 15.5 14.5 15.5 12.5" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 16V21M9 19H15" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconChiron = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke={stroke} strokeWidth="2"/>
    <path d="M12 12V20" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 20L9 16M12 20L15 16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// --- Zodiac / Signs / Points ---

export const IconAscendant = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V21M3 12H21" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 17L12 12L17 17" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="18" y="10" fontSize="8" fill={stroke} fontWeight="bold" textAnchor="middle">AC</text>
  </svg>
);

export const IconMC = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21V3" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 7L12 2L17 7" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="19" y="12" fontSize="8" fill={stroke} fontWeight="bold" textAnchor="middle">MC</text>
  </svg>
);

export const IconNode = ({ className, size = 24, fill = "none", stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="16" r="3" stroke={stroke} strokeWidth="2"/>
    <circle cx="16" cy="16" r="3" stroke={stroke} strokeWidth="2"/>
    <path d="M8 13C8 8 16 8 16 13" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconZodiacGeneric = ({ className, size = 24, stroke = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2"/>
    <path d="M12 3V21M3 12H21" stroke={stroke} strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
);

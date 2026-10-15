import React from 'react';

export interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Authentic WhatsApp brand icon with official vibrant green speech bubble
 * and crisp white telephone handset.
 */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  size = 20,
  className = 'w-5 h-5 shrink-0',
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Official WhatsApp Green Speech Bubble */}
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"
      />
      {/* White Telephone Handset */}
      <path
        fill="#FFFFFF"
        d="M8.53 7.33c-.2-.43-.43-.44-.63-.45-.16-.01-.35-.01-.54-.01-.19 0-.51.07-.77.37-.27.29-1.02 1-1.02 2.43 0 1.44 1.05 2.82 1.2 3.01.15.2 2.06 3.14 4.99 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.85.11.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34-.3-.15-1.73-.85-2-.95-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.91-2.18z"
      />
    </svg>
  );
};

export default WhatsAppIcon;


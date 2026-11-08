import StyledComponentsRegistry from "@/lib/registry";
import './globals.css';
import localFont from 'next/font/local';
import { seo } from '@/content/site';

const apfel = localFont({
  src: [
    { path: './fonts/apfel-grotezk/ApfelGrotezk-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/apfel-grotezk/ApfelGrotezk-Mittel.woff2', weight: '500', style: 'normal' },
    { path: './fonts/apfel-grotezk/ApfelGrotezk-Fett.woff2', weight: '700', style: 'normal' },
    { path: './fonts/apfel-grotezk/ApfelGrotezk-Satt.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-apfel',
  display: 'swap',
});

export const metadata = {
  title: seo.title,
  description: seo.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={apfel.variable}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

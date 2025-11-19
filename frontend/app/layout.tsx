import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: "SkillHub-Pro",
  description: "Master new skills with expert-led courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

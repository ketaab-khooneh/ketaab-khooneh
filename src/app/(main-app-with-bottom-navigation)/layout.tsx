"use client";
import AppLayout from "@/layouts/AppLayout";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import "@tapsioss/theme/css-variables";

// export const metadata: Metadata = {
//     title: "Ketaab Khooneh",
//     description: "Generated by create next app",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}

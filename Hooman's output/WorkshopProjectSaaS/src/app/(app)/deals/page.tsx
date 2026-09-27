import type { Metadata } from "next";
import { DealsBoard } from "./DealsBoard";

export const metadata: Metadata = {
  title: "Deals · My SaaS Project",
};

export default function DealsPage() {
  return <DealsBoard />;
}

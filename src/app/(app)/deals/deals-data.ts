// Sample data from the Figma design. Replace with real data when the backend exists.

export type DealStatus = "verified" | "viewing-booked" | "property";

export type Deal = {
  id: string;
  title: string;
  owner: string;
  phone: string;
  email: string;
  /** Someone currently working on the deal, e.g. on a call. */
  activity?: { person: string; avatar: string; label: string };
  /** The small progress icons on qualified deals. */
  progress?: boolean;
};

export const COLUMNS = [
  { id: "new", title: "New deal" },
  { id: "contacted", title: "Contacted" },
  { id: "qualified", title: "Qualified" },
  { id: "viewing", title: "Viewing" },
  { id: "negotiation", title: "Negotiation" },
  { id: "contract", title: "Contract" },
] as const;

export type ColumnId = (typeof COLUMNS)[number]["id"];

export const DEALS: Record<string, Deal> = {
  "deal-1": {
    id: "deal-1",
    title: "Musterstr. 5, Berlin",
    owner: "John Smith",
    phone: "0177 23445678",
    email: "john.s@gmail.com",
    activity: { person: "Anna Schmidt", avatar: "/figma/deals/avatar-anna.png", label: "(Calling)" },
  },
  "deal-2": {
    id: "deal-2",
    title: "Schillerstr. 3",
    owner: "John Smith",
    phone: "0177 23445678",
    email: "john.s@gmail.com",
  },
  "deal-3": {
    id: "deal-3",
    title: "Berliner Str. 12",
    owner: "John Smith",
    phone: "0177 23445678",
    email: "john.s@gmail.com",
    progress: true,
  },
};

export const INITIAL_BOARD: Record<ColumnId, string[]> = {
  new: ["deal-1"],
  contacted: ["deal-2"],
  qualified: ["deal-3"],
  viewing: [],
  negotiation: [],
  contract: [],
};

export const PIPELINES = [
  { value: "sourcing", label: "Sourcing", count: 3 },
  { value: "marketing", label: "Marketing", count: 4, comingSoon: true },
  { value: "offer", label: "Offer", count: 2, comingSoon: true },
];

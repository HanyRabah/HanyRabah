"use client";

import React, { createContext, useContext, useState } from "react";

interface ContactDrawerContextType {
  isOpen: boolean;
  defaultReason?: string;
  openDrawer: (reason?: string) => void;
  closeDrawer: () => void;
}

const ContactDrawerContext = createContext<ContactDrawerContextType | undefined>(
  undefined
);

export function ContactDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultReason, setDefaultReason] = useState<string | undefined>(
    undefined
  );

  const openDrawer = (reason?: string) => {
    setDefaultReason(reason);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    // Clear reason after a delay to avoid visual glitch
    setTimeout(() => setDefaultReason(undefined), 300);
  };

  return (
    <ContactDrawerContext.Provider
      value={{ isOpen, defaultReason, openDrawer, closeDrawer }}
    >
      {children}
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext);
  if (context === undefined) {
    throw new Error(
      "useContactDrawer must be used within a ContactDrawerProvider"
    );
  }
  return context;
}

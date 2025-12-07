"use client";

import { useContactDrawer } from "@/contexts/ContactDrawerContext";
import { ContactDrawer } from "@/components/ContactDrawer";

export function ContactDrawerWrapper() {
  const { isOpen, defaultReason, closeDrawer } = useContactDrawer();

  return (
    <ContactDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      defaultReason={defaultReason}
    />
  );
}

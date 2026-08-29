import { createContext, useContext, useState, type ReactNode } from "react";
import { ContactModal } from "../components/ContactModal";

type ContactModalContextType = {
  openContactModal: (context?: ContactContext) => void;
  closeContactModal: () => void;
};

export type ContactContext = { programId?: string; campusId?: string };

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contactContext, setContactContext] = useState<ContactContext>({});

  const openContactModal = (context: ContactContext = {}) => { setContactContext(context); setIsOpen(true); };
  const closeContactModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ openContactModal, closeContactModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContactModal} context={contactContext} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}

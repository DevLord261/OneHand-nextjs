// context/CreateCampaignContext.tsx

import { createContext, useContext, useState } from "react";

type FormData = {
  title: string;
  donationGoal: string;
  country: string;
  city: string;
  shortDescription: string;
  endDate: Date | null;
  category: string;
  description: string;
  mainImage: File | null;
  enableVolunteers: boolean;
};

type CampaignContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  imageError: string;
  setImageError: React.Dispatch<React.SetStateAction<string>>;
};

const CreateCampaignContext = createContext<CampaignContextType | null>(null);

export function useCreateCampaign() {
  const ctx = useContext(CreateCampaignContext);
  if (!ctx) throw new Error("useCreateCampaign must be used inside Provider");
  return ctx;
}

export function CreateCampaignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    donationGoal: "",
    country: "",
    city: "",
    shortDescription: "",
    endDate: null,
    category: "",
    description: "",
    mainImage: null,
    enableVolunteers: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState("");

  return (
    <CreateCampaignContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        setErrors,
        imagePreview,
        setImagePreview,
        imageError,
        setImageError,
      }}
    >
      {children}
    </CreateCampaignContext.Provider>
  );
}

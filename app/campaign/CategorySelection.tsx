import { Tag } from "lucide-react";
import { categoriesWithDetails } from "./create/utils";
import { useCreateCampaign } from "../context/CreateCampaignContext";

export default function RenderCategorySelection() {
  const { formData, setFormData } = useCreateCampaign();
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Tag className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Choose Your Campaign Category
          </h2>
          <p className="text-slate-600 mt-2">
            Select the category that best describes your campaign to help people
            find it
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesWithDetails.map((category) => (
          <button
            type="button"
            key={category.id}
            className={`
            relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${
              formData.category === category.id
                ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-500/20"
                : category.color
            }
          `}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                category: category.id,
              }));
            }}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${category.iconBg}`}
              >
                {category.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {category.description}
                </p>
              </div>
            </div>
            {formData.category === category.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {formData.category && (
        <div className="bg-indigo-50 rounded-lg !p-4 !mt-4  border border-indigo-200">
          <div className="flex items-start gap-3 ">
            <div className="p-1 bg-indigo-100 rounded">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-indigo-900">Great choice!</h4>
              <p className="text-sm text-indigo-700 mt-1">
                You`&apos`ve selected
                <strong>
                  {
                    categoriesWithDetails.find(
                      (c) => c.id === formData.category,
                    )?.name
                  }
                </strong>
                . This will help people interested in this type of campaign find
                your project more easily.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

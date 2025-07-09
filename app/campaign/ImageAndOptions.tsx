import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Eye, ImageIcon, Upload, Users, X } from "lucide-react";
import Image from "next/image";
import { useCreateCampaign } from "../context/CreateCampaignContext";
import { Switch } from "@radix-ui/react-switch";

export default function ImageAndOptions() {
  const {
    formData,
    setFormData,
    setImagePreview,
    setImageError,
    imagePreview,
    imageError,
  } = useCreateCampaign();

  const removeImage = () => {
    formData.mainImage = null;
    setImagePreview("");
    setImageError("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size should be less than 5MB");
      return;
    }

    setImageError("");
    setFormData((prev) => ({ ...prev, mainImage: file }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <ImageIcon className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Media & Campaign Options
          </h2>
          <p className="text-sm text-slate-500">
            Upload your main campaign image and configure additional options
          </p>
        </div>
      </div>

      {/* Main Image Upload */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Main Campaign Image
          <span className="text-slate-400 font-normal ml-2">(Required)</span>
        </Label>

        {!imagePreview ? (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-full">
                <Upload className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <p className="text-slate-600 font-medium">
                  Upload campaign image
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  PNG, JPG, GIF up to 5MB. Recommended size: 1200x600px
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Choose Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Campaign preview"
                className="w-full h-64 object-cover"
                width={100}
                height={100}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Change Image
                </Button>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeImage}
              className="absolute top-2 right-2 gap-1 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {imageError && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            {imageError}
          </div>
        )}
      </div>

      {/* Volunteer Option */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Volunteer Support
        </Label>

        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium text-slate-900">
                  Enable Volunteer Support
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Allow people to volunteer their time and skills to help your
                campaign succeed. Volunteers can offer services like marketing,
                design, technical support, or physical assistance.
              </p>

              <div className="flex items-center gap-3">
                <Switch
                  id="enable-volunteers"
                  checked={formData.enableVolunteers}
                  onCheckedChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      enableVolunteers: e,
                    }));
                  }}
                  className="bg-gray-800"
                />
                <Label
                  htmlFor="enable-volunteers"
                  className="text-sm font-medium"
                >
                  {formData.enableVolunteers
                    ? "Disable volunteers"
                    : "Enable Volunteers"}
                </Label>
              </div>
            </div>
          </div>

          {formData.enableVolunteers && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded">
                  <svg
                    className="w-4 h-4 text-green-600"
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
                <div>
                  <h4 className="font-medium text-green-900">
                    Volunteer support enabled!
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your campaign will show a Volunteer button alongside the
                    donation button. People can sign up to help with various
                    tasks and you&apos;ll receive their contact information.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Campaign Preview
        </h3>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          {imagePreview && (
            <div className="aspect-video bg-slate-100">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Campaign preview"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="p-4">
            <h4 className="font-semibold text-slate-900 mb-2">
              {formData.title || "Your Campaign Title"}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              {formData.shortDescription ||
                "Your campaign description will appear here..."}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Donate Now
              </Button>
              {formData.enableVolunteers && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <Users className="w-4 h-4" />
                  Volunteer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

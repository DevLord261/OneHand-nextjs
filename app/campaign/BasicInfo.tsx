import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import {
  AlertCircle,
  CalendarIcon,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Target,
} from "lucide-react";
import { useCreateCampaign } from "../context/CreateCampaignContext";

export default function RenderBasic() {
  const { formData, setFormData, errors } = useCreateCampaign();

  const completedFieldsCount = Object.values(formData).filter((v) => {
    if (typeof v === "string" && formData.category != v)
      return v.trim().length > 0;
    if (v instanceof Date) return formData.endDate != null ? true : false;
    if (typeof v === "boolean") return false;

    return false; // for null, undefined, or other types
  }).length;

  const totalFields = 6; // your total number of fields

  const completionPercent = Math.round(
    (completedFieldsCount / totalFields) * 100,
  );
  return (
    <div className="space-y-8">
      {/* Campaign Overview */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Campaign Overview
            </h2>
            <p className="text-sm text-slate-500">
              Tell us about your campaign goals and basic information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Title */}
          <div className="lg:col-span-2 space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-slate-700 flex items-center gap-2"
            >
              Campaign Title
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </Label>
            <Input
              id="title"
              placeholder="Enter a compelling campaign title..."
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={cn(
                "h-12 text-base",
                errors.title && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Donation Goal */}
          <div className="space-y-2">
            <Label
              htmlFor="goal"
              className="text-sm font-medium text-slate-700 flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Donation Goal
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </Label>
            <Input
              id="goal"
              type="number"
              placeholder="10000"
              value={formData.donationGoal}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  donationGoal: e.target.value,
                }))
              }
              className={cn(
                "h-12 text-base",
                errors.goal && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            {errors.goal && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.goal}
              </div>
            )}
          </div>

          {/* Campaign End Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Campaign End Date
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-full justify-start text-left font-normal text-base",
                    !formData.endDate && "text-muted-foreground",
                    errors.date && "border-red-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate
                    ? format(formData.endDate, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate ?? undefined}
                  onSelect={(selectedDate) => {
                    setFormData((prev) => ({
                      ...prev,
                      endDate: selectedDate ?? null,
                    }));
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.date}
              </div>
            )}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Country
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </Label>
            <Input
              id="country"
              placeholder="Enter country name..."
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              className={cn(
                "h-12 text-base",
                errors.country && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            {errors.country && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.country}
              </div>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-sm font-medium text-slate-700 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              City
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            </Label>
            <Input
              id="city"
              placeholder="Enter city name..."
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              className={cn(
                "h-12 text-base",
                errors.city && "border-red-500 focus-visible:ring-red-500",
              )}
            />
            {errors.city && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.city}
              </div>
            )}
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label
            htmlFor="shortDescription"
            className="text-sm font-medium text-slate-700"
          >
            Short Description
            <span className="text-slate-400 font-normal ml-2">(Optional)</span>
          </Label>
          <Textarea
            id="shortDescription"
            placeholder="Provide a brief summary of your campaign (max 200 characters)..."
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                shortDescription: e.target.value,
              }))
            }
            className="min-h-[100px] text-base resize-none"
            maxLength={200}
          />
          <div className="text-xs text-slate-400 text-right">
            {formData.shortDescription.length}/200 characters
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Form Completion</span>
          <span className="font-medium text-slate-900">
            {completionPercent}%
          </span>
        </div>
        <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${completionPercent}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

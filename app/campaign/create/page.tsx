"use client";

import { Editor } from "@/components/createcampaign/TextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeft, ArrowRight, Eye, Link, Save } from "lucide-react";

import { FormEvent, useState } from "react";
import { steps } from "./utils";
import { Separator } from "@radix-ui/react-separator";
import RenderCategorySelection from "../CategorySelection";
import RenderBasic from "../BasicInfo";
import ImageAndOptions from "../ImageAndOptions";
import {
  CreateCampaignProvider,
  useCreateCampaign,
} from "@/app/context/CreateCampaignContext";
import { NextResponse } from "next/server";
import { redirect, useRouter } from "next/navigation";

export default function Index() {
  return (
    <CreateCampaignProvider>
      <CreateCampaign />
    </CreateCampaignProvider>
  );
}

function CreateCampaign() {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, setErrors, setImageError } = useCreateCampaign();
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYXNzb24iLCJ1c2VySWQiOiIyOGI4NGE5Mi04Y2MzLTQ5Y2MtYTFkMS02NmNiMDExOGJlODUiLCJmdWxsbmFtZSI6Im1obWQgYmF5b3VtaSIsInJvbGVzIjoiUEFSVElDSVBBTlQiLCJlbWFpbCI6Imh1c3NlaW5iYXlvdW1lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaGFzc29uIiwiaWF0IjoxNzUyMDcxNTI4LCJleHAiOjE3NTIxNTc5Mjh9.cAvb06JhCQ0ZEOJMhKXSFB0HN_fQkLVBa3O8HlvaPfY";
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Campaign title is required";
    if (!formData.donationGoal.trim())
      newErrors.goal = "Donation goal is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.endDate) newErrors.date = "Campaign end date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMediaStep = () => {
    if (!formData.mainImage) {
      setImageError("Campaign image is required");
      return false;
    }
    setImageError("");
    return true;
  };

  const handleNext = async () => {
    if (currentStep == 2) {
      if (!validateForm()) return;
    }
    if (currentStep == 3) {
      if (!validateMediaStep()) return;
    }
    setCurrentStep(currentStep + 1);
  };

  async function Handlesubmition(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === undefined) return; // skip nulls

      if (value instanceof File) {
        data.append(key, value); // file field
      } else if (value instanceof Date) {
        data.append(key, value.toISOString()); // date as ISO string
      } else if (typeof value === "boolean") {
        data.append(key, value.toString()); // booleans to string
      } else if (key == "city" || key == "country") {
        return;
      } else {
        data.append(key, value); // strings
      }
    });

    data.append("location", formData.country + formData.city);

    try {
      const res = await fetch("http://localhost:8080/api/campaigns/create", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) router.push("/404");
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={"/"}
                className="gap-2 flex flex-row justify-center items-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Campaigns
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-slate-900">
                Create Campaign
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* step navigation */}
      <div className="stepnav">
        <div className="contentcontainer">
          {/* Step Navigation */}
          <div className="stepcontainer">
            <div className="flex items-center justify-between max-w-2xl mx-auto ">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                              ${
                                currentStep >= step.id
                                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                                  : "bg-slate-100 text-slate-400"
                              }
                            `}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div className="mt-3 text-center">
                        <div
                          className={`text-sm font-medium ${
                            currentStep >= step.id
                              ? "text-slate-900"
                              : "text-slate-500"
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {step.description}
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`
                              w-24 h-0.5 mx-6 transition-all duration-300
                              ${
                                currentStep > step.id
                                  ? "bg-indigo-600"
                                  : "bg-slate-200"
                              }
                            `}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <form onSubmit={Handlesubmition}>
            <Card
              className={currentStep < 3 ? "cardcontainer" : "descpcontainer"}
            >
              <CardContent className="!p-8">
                {currentStep === 1 && <RenderCategorySelection />}
                {currentStep === 2 && <RenderBasic />}
                {currentStep === 3 && <ImageAndOptions />}
                {currentStep === 4 && (
                  <div className="h-full">
                    <Editor token={token} />
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between !mt-8 !pt-6 border-t">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    {currentStep === 2 && (
                      <>
                        <span>
                          Step {currentStep} of {steps.length}
                        </span>
                        <span>•</span>
                        <span>Auto-saved 30 seconds ago</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(currentStep - 1)}
                      >
                        Previous Step
                      </Button>
                    )}
                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        size="sm"
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                        onClick={handleNext}
                        disabled={Boolean(
                          currentStep === 1 && !formData.category,
                        )}
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                        type="submit"
                      >
                        Create Campaign
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

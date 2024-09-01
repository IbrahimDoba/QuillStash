"use client";
import { User as UserProfileData } from "@/db/schema";
import { UserProfileFormData, userProfileSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";

function ProfileForm({
  profileData,
  username,
}: {
  profileData: UserProfileData;
  username: string;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(profileData.image);
  const { edgestore } = useEdgeStore();

  const defaultProfileValues = {
    name: profileData.name,
    username: profileData.username,
    bio: profileData.bio,
    location: profileData.location,
    pronouns: profileData.pronouns,
    work: profileData.work,
    github: profileData.github,
    image: profileData.image,
  };

  const updateProfile = async (details: UserProfileFormData) => {
    try {
      const formData = new FormData();
      Object.entries(details).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`/api/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: defaultProfileValues,
  });

  const startUpload = async () => {
    if (!file) return;

    await edgestore.myPublicImages
      .upload({
        file,
        input: { type: "profile" },
        onProgressChange: setProgress,
      })
      .then((res) => {
        setImageUrl(res.url);
        setValue("image", res.url);
        setProgress(0);
        toast.success("Image uploaded successfully", { position: "top-right" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to upload image");
      });
  };

  useEffect(() => {
    if (file) {
      startUpload();
    }
  }, [file]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const selectedFile = (e.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
    input.click();
  };

  async function onSubmit(data: UserProfileFormData) {
    console.log("Submitting form data:", data);
    try {
      const updatedUser = await updateProfile(data);
      console.log("Updated user:", updatedUser);
      toast.success("Profile updated successfully");
      router.push(`/${username}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-sm mx-auto py-14 space-y-8"
    >
      <div
        onClick={handleImageUpload}
        className="relative overflow-hidden w-fit rounded-full border z-10 mb-2 cursor-pointer"
      >
        <Avatar
          src={profileData.image}
          className="w-24 h-24 text-large"
        />
        <span className="absolute inset-0 bg-black/80 grid place-content-center text-white/80">
          <Camera />
        </span>
      </div>

      <div className="flex flex-col mb-4">
        <Input
          type="text"
          id="name"
          label="Name"
          variant="faded"
          radius="sm"
          description="Your full name"
          {...register("name")}
        />
        {errors.name && (
          <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <Input
          type="text"
          id="username"
          label="Username"
          variant="faded"
          radius="sm"
          description="Your full Username"
          disabled
          {...register("username")}
          className="opacity-50"
        />
        {errors.name && (
          <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <Textarea
          id="bio"
          label="Bio"
          variant="faded"
          radius="sm"
          description="Tell us about yourself"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="px-1 text-xs text-red-600">{errors.bio.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <Input
          type="text"
          id="location"
          variant="faded"
          label="Location"
          description="Where are you based?"
          radius="sm"
          {...register("location")}
        />
        {errors.location && (
          <p className="px-1 text-xs text-red-600">{errors.location.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <Input
          type="text"
          id="pronouns"
          label="Pronouns"
          radius="sm"
          variant="faded"
          description="How do you identify"
          {...register("pronouns")}
        />
        {errors.pronouns && (
          <p className="px-1 text-xs text-red-600">{errors.pronouns.message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <Input
          type="text"
          id="work"
          label="Work"
          variant="faded"
          description="Where do you work?"
          radius="sm"
          {...register("work")}
        />
      </div>
      <div className="flex flex-col mb-4">
        <Input
          type="text"
          id="website"
          variant="faded"
          label="Website"
          description="Your personal website"
          radius="sm"
          {...register("github")}
        />
        {errors.github && (
          <p className="px-1 text-xs text-red-600">{errors.github.message}</p>
        )}
      </div>
      <Button
        type="submit"
        color="primary"
        radius="sm"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}

export default ProfileForm;

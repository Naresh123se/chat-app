"use client";

import { GroupOutlined } from "@mui/icons-material";
import { Loader2 } from "lucide-react";
// import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const GroupInfo = () => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const { chatId } = useParams();
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`);
      if (!res.ok) throw new Error("Failed to fetch chat details.");
      const data = await res.json();
      setChat(data);
      reset({
        name: data?.name,
        groupPhoto: data?.groupPhoto,
      });
    } catch (error) {
      console.error(error);
      // Display an error message to the user (e.g., set an error state or notification)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatId) getChatDetails();
  }, [chatId]);

  // const uploadPhoto = (result) => {
  //   setValue("groupPhoto", result?.info?.secure_url);
  // };

  const updateGroupChat = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chats/${chatId}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.replace(`/chats/${chatId}`); // replace instead of push
      } else {
        throw new Error("Failed to update group chat.");
      }
    } catch (error) {
      console.error(error);
      // Display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader2 />
  ) : (
    <div className="profile-page">
      <h1 className="text-heading3-bold">Edit Group Info</h1>

      <form className="edit-profile" onSubmit={handleSubmit(updateGroupChat)}>
        <div className="input">
          <input
            {...register("name", { required: "Group chat name is required" })}
            type="text"
            placeholder="Group chat name"
            className="input-field"
            aria-invalid={errors?.name ? "true" : "false"}
          />
          <GroupOutlined sx={{ color: "#737373" }} />
        </div>
        {errors?.name && (
          <p className="text-red-500" role="alert">
            {errors.name.message}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Image
            src={watch("groupPhoto") || "/assets/group.png"}
            alt="Group photo"
            width={160}
            height={160}
            className="w-40 h-40 rounded-full"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={uploadPhoto}
            uploadPreset="upecg01j"
          >
            <p className="text-body-bold">Upload new photo</p>
          </CldUploadButton>
        </div>

        <div className="flex flex-wrap gap-3">
          {chat?.members?.length ? (
            chat.members.map((member, index) => (
              <p className="selected-contact" key={index}>
                {member.username}
              </p>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default GroupInfo;

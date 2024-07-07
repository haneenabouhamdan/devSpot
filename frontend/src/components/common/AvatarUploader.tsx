import React, { useState, useRef } from "react";
import { Avatar, Box } from "@chakra-ui/react";

export const AvatarUploader: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Avatar
        size="xl"
        src={avatarUrl || "https://bit.ly/broken-link"}
        cursor="pointer"
        onClick={handleClick}
      >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleUpload}
      />
      </Avatar>
    </Box>
  );
};


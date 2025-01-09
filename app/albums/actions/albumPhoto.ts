"use server";

import { AlbumPhotoResponse } from "@/app/interfaces/albumPhotoResponse";
import { ApiResponse } from "@/app/interfaces/apiResponse";
import { apiPhotoCall } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { formatString } from "@/app/lib/stringHelper";
import { ALBUM_UPDATE_PHOTO } from "@/app/lib/urls";

export async function saveAlbumPhoto(file: File | null | undefined, id: number) : Promise<ApiResponse<AlbumPhotoResponse>> { 
  return await apiPhotoCall<AlbumPhotoResponse>(formatString(ALBUM_UPDATE_PHOTO, id), API_METHOD.POST, file);
}
"use server";

import { AddPhotoResponse } from "@/app/interfaces/addPhotoResponse";
import { ApiResponse } from "@/app/interfaces/apiResponse";
import { apiPhotoCall } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { formatString } from "@/app/lib/stringHelper";
import { MEMBER_UPDATE_PHOTO } from "@/app/lib/urls";

export async function saveMemberPhoto(file: File | null | undefined, id: number) : Promise<ApiResponse<AddPhotoResponse>> { 
  return await apiPhotoCall<AddPhotoResponse>(formatString(MEMBER_UPDATE_PHOTO, id), API_METHOD.POST, file);
}
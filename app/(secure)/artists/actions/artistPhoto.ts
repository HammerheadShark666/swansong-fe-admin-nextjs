"use server";

import { AddPhotoResponse } from "@/app/interfaces/addPhotoResponse";
import { ErrorResponse } from "@/app/interfaces/apiResponse";
import { apiPhotoCallAuthenticated } from "@/app/lib/apiHelper";
import { API_METHOD } from "@/app/lib/enums";
import { formatString } from "@/app/lib/stringHelper";
import { API_ARTIST_UPDATE_PHOTO } from "@/app/lib/urls";

export async function saveArtistPhoto(file: File | null | undefined, id: number) : Promise<AddPhotoResponse | ErrorResponse> { 
  return await apiPhotoCallAuthenticated<AddPhotoResponse>(formatString(API_ARTIST_UPDATE_PHOTO, id), API_METHOD.POST, file);
}
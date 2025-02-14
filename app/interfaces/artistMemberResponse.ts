export interface ArtistMemberResponse {id: number, memberId: number}

export interface ArtistMemberUpdateResponse {message: string}

export function isArtistMemberUpdateResponse(obj: any): obj is ArtistMemberUpdateResponse {  
    return obj && typeof obj.message === "string";  
}

export interface ArtistMemberResponse {id: number, memberId: number}

export interface MemberArtistUpdateResponse {artistId: number}

export function isMemberArtistUpdateResponse(obj: any): obj is MemberArtistUpdateResponse[] {  
    return obj && typeof obj.artistId === "number";  
}

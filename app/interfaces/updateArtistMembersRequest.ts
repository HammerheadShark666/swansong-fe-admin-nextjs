export interface UpdateArtistMembersRequest 
{
  artistId: number;
  membersToAdd: number[];  
  membersToRemove: number[];  
}